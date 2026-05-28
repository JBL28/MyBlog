# syntax=docker/dockerfile:1.7
FROM node:20.19.0-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

FROM node:20.19.0-alpine AS prisma-generator
WORKDIR /app

ARG DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public"
ARG NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=secret,id=database_url \
  export DATABASE_URL="$(if [ -f /run/secrets/database_url ]; then cat /run/secrets/database_url; else printf '%s' "$DATABASE_URL"; fi)" \
  && npm run prisma:generate

FROM node:20.19.0-alpine AS builder
WORKDIR /app

ARG DATABASE_URL="postgresql://build:build@localhost:5432/build?schema=public"
ARG NEXT_PUBLIC_SITE_URL="http://localhost:3000"
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=prisma-generator /app ./
RUN --mount=type=secret,id=database_url \
  export DATABASE_URL="$(if [ -f /run/secrets/database_url ]; then cat /run/secrets/database_url; else printf '%s' "$DATABASE_URL"; fi)" \
  && npm run build

FROM node:20.19.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/docker-entrypoint.mjs ./docker-entrypoint.mjs

USER nextjs

EXPOSE 3000

CMD ["node", "docker-entrypoint.mjs"]

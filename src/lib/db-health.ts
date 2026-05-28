import type { PrismaClient } from "@prisma/client";

const globalForDbHealth = globalThis as unknown as {
  dbHealthCheckStarted?: boolean;
};

function formatErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown database connection error";
  return message.replaceAll(/\s+/g, " ").trim();
}

async function logDatabaseConnectionStatus(prisma: PrismaClient) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.info("[db] connection succeeded");
  } catch (error) {
    console.error(`[db] connection failed: ${formatErrorMessage(error)}`);
  }
}

export function startDatabaseConnectionLog(prisma: PrismaClient) {
  if (globalForDbHealth.dbHealthCheckStarted) {
    return;
  }

  globalForDbHealth.dbHealthCheckStarted = true;

  logDatabaseConnectionStatus(prisma);
}

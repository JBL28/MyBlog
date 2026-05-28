import type { PrismaClient } from "@prisma/client";

const globalForDbHealth = globalThis as unknown as {
  dbHealthCheckStarted?: boolean;
};

function formatErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown database connection error";
  return message.replaceAll(/\s+/g, " ").trim();
}

export function startDatabaseConnectionLog(prisma: PrismaClient) {
  if (globalForDbHealth.dbHealthCheckStarted) {
    return;
  }

  globalForDbHealth.dbHealthCheckStarted = true;

  void prisma.$queryRaw`SELECT 1`
    .then(() => {
      console.info("[db] connection succeeded");
    })
    .catch((error: unknown) => {
      console.error(`[db] connection failed: ${formatErrorMessage(error)}`);
    });
}

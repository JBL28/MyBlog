import { PrismaClient } from "@prisma/client";

function formatErrorMessage(error) {
  const message = error instanceof Error ? error.message : "Unknown database connection error";
  return message.replaceAll(/\s+/g, " ").trim();
}

async function logDatabaseConnectionStatus() {
  const prisma = new PrismaClient();

  try {
    await prisma.$queryRaw`SELECT 1`;
    console.info("[db] connection succeeded");
  } catch (error) {
    console.error(`[db] connection failed: ${formatErrorMessage(error)}`);
  } finally {
    await prisma.$disconnect();
  }
}

globalThis.dbHealthCheckStarted = true;
void logDatabaseConnectionStatus();

await import("./server.js");

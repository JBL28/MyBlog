import { prisma } from "@/lib/prisma";

const globalForDbHealth = globalThis as unknown as {
  dbHealthLog?: {
    lastStatus?: "success" | "failure";
  };
};

const dbHealthLog = globalForDbHealth.dbHealthLog ?? { lastStatus: undefined };
globalForDbHealth.dbHealthLog = dbHealthLog;

export async function logDatabaseConnectionStatus() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    if (dbHealthLog.lastStatus !== "success") {
      console.info("[db] connection succeeded");
      dbHealthLog.lastStatus = "success";
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database connection error";
    const oneLineMessage = message.replaceAll(/\s+/g, " ").trim();

    if (dbHealthLog.lastStatus !== "failure") {
      console.error(`[db] connection failed: ${oneLineMessage}`);
      dbHealthLog.lastStatus = "failure";
    }
  }
}

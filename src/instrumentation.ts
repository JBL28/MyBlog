export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const [{ prisma }, { startDatabaseConnectionLog }] = await Promise.all([
    import("@/lib/prisma"),
    import("@/lib/db-health"),
  ]);

  startDatabaseConnectionLog(prisma);
}

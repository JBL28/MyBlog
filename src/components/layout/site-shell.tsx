import { SiteHeader } from "@/components/layout/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1 py-[var(--section-gap)]">{children}</main>
    </div>
  );
}

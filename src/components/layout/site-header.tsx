import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { href: "/posts", label: "글" },
  { href: "/categories/all", label: "카테고리" },
  { href: "/tags/nextjs", label: "태그" },
  { href: "/design-system", label: "디자인" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="page-container flex min-h-16 flex-wrap items-center justify-between gap-4 py-3">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-text">
          MyBlog
        </Link>
        <nav aria-label="주요 메뉴" className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="px-3 py-2 transition-colors hover:bg-card hover:text-text">
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

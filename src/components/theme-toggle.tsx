"use client";

import { useAppStore } from "@/store/app-store";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Button variant="secondary" onClick={() => setTheme(nextTheme)} type="button">
      {theme === "dark" ? "라이트 모드" : "다크 모드"}
    </Button>
  );
}

"use client";

import { useEffect } from "react";
import { useAppStore, type Theme } from "@/store/app-store";

const storageKey = "myblog-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function getInitialTheme(): Theme {
  const saved = window.localStorage.getItem(storageKey);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, [setTheme]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, theme);
    applyTheme(theme);
  }, [theme]);

  return children;
}

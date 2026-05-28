"use client";

import { create } from "zustand";
import { defaultPortfolioVisible, type PortfolioVisibleState } from "@/lib/portfolio";

export type Theme = "light" | "dark";

type AppState = {
  theme: Theme;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isPortfolioMode: boolean;
  portfolioVisible: PortfolioVisibleState;
  setTheme: (theme: Theme) => void;
  setAuthState: (state: { isLoggedIn: boolean; isAdmin: boolean }) => void;
  setPortfolioState: (state: {
    isPortfolioMode: boolean;
    portfolioVisible: PortfolioVisibleState;
  }) => void;
};

export const useAppStore = create<AppState>((set) => ({
  theme: "light",
  isLoggedIn: false,
  isAdmin: false,
  isPortfolioMode: false,
  portfolioVisible: defaultPortfolioVisible,
  setTheme: (theme) => set({ theme }),
  setAuthState: ({ isLoggedIn, isAdmin }) => set({ isLoggedIn, isAdmin }),
  setPortfolioState: ({ isPortfolioMode, portfolioVisible }) =>
    set({ isPortfolioMode, portfolioVisible }),
}));

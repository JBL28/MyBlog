"use client";

import { useEffect } from "react";
import type { PortfolioVisibleState } from "@/lib/portfolio";
import { useAppStore } from "@/store/app-store";

export function PortfolioStateHydrator({
  isPortfolioMode,
  portfolioVisible,
}: {
  isPortfolioMode: boolean;
  portfolioVisible: PortfolioVisibleState;
}) {
  const setPortfolioState = useAppStore((state) => state.setPortfolioState);

  useEffect(() => {
    setPortfolioState({ isPortfolioMode, portfolioVisible });
  }, [isPortfolioMode, portfolioVisible, setPortfolioState]);

  return null;
}

export type PortfolioVisibleState = {
  name: boolean;
  email: boolean;
  phone: boolean;
  links: boolean;
  career: boolean;
  projects: boolean;
  education: boolean;
};

export const allPortfolioVisible: PortfolioVisibleState = {
  name: true,
  email: true,
  phone: true,
  links: true,
  career: true,
  projects: true,
  education: true,
};

export const defaultPortfolioVisible: PortfolioVisibleState = {
  name: true,
  email: true,
  phone: false,
  links: true,
  career: true,
  projects: true,
  education: false,
};

const visibleAliases: Record<string, Array<keyof PortfolioVisibleState>> = {
  profile: ["name", "email", "phone", "links"],
  history: ["career", "projects", "education"],
};

const visibleKeys = new Set<keyof PortfolioVisibleState>([
  "name",
  "email",
  "phone",
  "links",
  "career",
  "projects",
  "education",
]);

export function emptyPortfolioVisible(): PortfolioVisibleState {
  return {
    name: false,
    email: false,
    phone: false,
    links: false,
    career: false,
    projects: false,
    education: false,
  };
}

export function parsePortfolioVisible(rawVisible: string | string[] | undefined): PortfolioVisibleState {
  if (!rawVisible) {
    return { ...defaultPortfolioVisible };
  }

  const values = Array.isArray(rawVisible) ? rawVisible : [rawVisible];
  const next = emptyPortfolioVisible();

  for (const value of values) {
    for (const token of value.split(",")) {
      const normalized = token.trim().toLowerCase();
      if (!normalized) continue;

      if (normalized in visibleAliases) {
        for (const key of visibleAliases[normalized]) {
          next[key] = true;
        }
        continue;
      }

      if (visibleKeys.has(normalized as keyof PortfolioVisibleState)) {
        next[normalized as keyof PortfolioVisibleState] = true;
      }
    }
  }

  return next;
}

export function isPortfolioMode(rawPortfolio: string | string[] | undefined): boolean {
  const value = Array.isArray(rawPortfolio) ? rawPortfolio[0] : rawPortfolio;
  return value === "true";
}

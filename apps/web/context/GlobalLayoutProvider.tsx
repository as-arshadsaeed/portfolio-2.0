"use client";

import { createContext, useContext } from "react";
import type { SiteSettings, Navigation } from "@portfolio/sanity";

type GlobalLayoutData = {
  siteSettings: SiteSettings;
  navigation: Navigation;
};

const GlobalLayoutContext = createContext<GlobalLayoutData | null>(null);

export function GlobalLayoutProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: GlobalLayoutData;
}) {
  return (
    <GlobalLayoutContext.Provider value={value}>
      {children}
    </GlobalLayoutContext.Provider>
  );
}

export function useGlobalLayout() {
  const ctx = useContext(GlobalLayoutContext);
  if (!ctx) throw new Error("Missing GlobalLayoutProvider");
  return ctx;
}

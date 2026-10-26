"use client";

import GsapProvider from "@/context/GsapProvider";
import { LenisProvider } from "@/context/LenisProvider";
import { NavigationProvider } from "./NavigationProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GsapProvider>
      <LenisProvider>
        <NavigationProvider>{children}</NavigationProvider>
      </LenisProvider>
    </GsapProvider>
  );
}

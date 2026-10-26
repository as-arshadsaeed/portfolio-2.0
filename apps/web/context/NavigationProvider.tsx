"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { gsap } from "@/lib/gsap";

type NavigationContextValue = {
  open: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openMenu = useCallback(() => {
    setOpen(true);

    document.body.classList.add("nav-active");

    gsap.fromTo(
      ".fixed-nav-panel",
      { x: "100%" },
      { x: "0%", duration: 0.6, ease: "power3.out" },
    );
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);

    document.body.classList.remove("nav-active");

    gsap.to(".fixed-nav-panel", {
      x: "100%",
      duration: 0.5,
      ease: "power3.inOut",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => {
      const next = !prev;

      if (next) {
        document.body.classList.add("nav-active");

        gsap.fromTo(
          ".fixed-nav-panel",
          { x: "100%" },
          { x: "0%", duration: 0.6, ease: "power3.out" },
        );
      } else {
        document.body.classList.remove("nav-active");

        gsap.to(".fixed-nav-panel", {
          x: "100%",
          duration: 0.5,
          ease: "power3.inOut",
        });
      }

      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      open,
      openMenu,
      closeMenu,
      toggleMenu,
    }),
    [open, openMenu, closeMenu, toggleMenu],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error("useNavigation must be used inside NavigationProvider");
  }
  return ctx;
}

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Lenis from "@studio-freight/lenis";

import { usePathname } from "next/navigation";

import { ScrollTrigger } from "@/lib/gsap";

/* -------------------------------- */
/* TYPES */
/* -------------------------------- */

type LenisContextType = {
  scrollY: number;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: Parameters<Lenis["scrollTo"]>[1],
  ) => void;
  start: () => void;
  stop: () => void;
};

/* -------------------------------- */
/* CONTEXT */
/* -------------------------------- */

const LenisContext = createContext<LenisContextType | null>(null);

/* -------------------------------- */
/* PROVIDER */
/* -------------------------------- */

export function LenisProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const lenisRef = useRef<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);

  /* -------------------------------- */
  /* INIT LENIS */
  /* -------------------------------- */

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);

      ScrollTrigger.update();

      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      setScrollY(scroll);
      ScrollTrigger.update();
    });

    ScrollTrigger.refresh();

    return () => {
      cancelAnimationFrame(rafId);

      lenis.destroy();

      lenisRef.current = null;
    };
  }, []);

  /* -------------------------------- */
  /* ROUTE CHANGE RESET */
  /* -------------------------------- */

  useEffect(() => {
    requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, {
        immediate: true,
      });

      ScrollTrigger.refresh(true);
    });
  }, [pathname]);

  /* -------------------------------- */
  /* CONTEXT VALUE */
  /* -------------------------------- */

  const value = useMemo<LenisContextType>(
    () => ({
      scrollY,
      scrollTo: (target, options = {}) => {
        lenisRef.current?.scrollTo(target, options);
      },

      start: () => {
        lenisRef.current?.start();
      },

      stop: () => {
        lenisRef.current?.stop();
      },
    }),
    [scrollY],
  );

  return (
    <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
  );
}

/* -------------------------------- */
/* HOOK */
/* -------------------------------- */

export function useLenis() {
  const context = useContext(LenisContext);

  if (!context) {
    throw new Error("useLenis must be used inside LenisProvider");
  }

  return context;
}

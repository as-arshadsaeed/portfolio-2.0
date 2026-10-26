"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface UseScrollBgColorOptions {
  selector?: string;
  defaultStart?: string;
  defaultEnd?: string;
  targetSelector?: string;
}

export const useSectionBlend = ({
  selector = "[data-bgcolor]",
  defaultStart = "var(--background)",
  defaultEnd = "var(--blend)",
  targetSelector,
}: UseScrollBgColorOptions = {}) => {
  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(selector);

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const startColor = section.dataset.bgcolorStart || defaultStart;
        const endColor = section.dataset.bgcolorEnd || defaultEnd;
        const target = targetSelector || section;
        gsap.fromTo(
          target,
          {
            backgroundColor: startColor,
          },
          {
            backgroundColor: endColor,
            ease: "none",

            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [selector, defaultStart, defaultEnd, targetSelector]);
};

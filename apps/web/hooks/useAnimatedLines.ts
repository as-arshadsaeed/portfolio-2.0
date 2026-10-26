"use client";

import { useRef } from "react";

import SplitType from "split-type";

import { gsap } from "@/lib/gsap";

import useGSAP from "./useGSAP";

const useAnimatedLines = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const targets = containerRef.current.querySelectorAll(".animate");

      const splits: SplitType[] = [];

      targets.forEach((target) => {
        const split = new SplitType(target as HTMLElement, {
          types: "lines",
          lineClass: "line",
        });

        splits.push(split);

        gsap.from(split.lines || [], {
          yPercent: 100,
          opacity: 0,

          duration: 1.2,
          stagger: 0.08,

          ease: "power4.out",

          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
        });
      });

      return () => {
        splits.forEach((split) => split.revert());
      };
    },

    {
      scope: containerRef,
    },
  );

  return containerRef;
};

export default useAnimatedLines;

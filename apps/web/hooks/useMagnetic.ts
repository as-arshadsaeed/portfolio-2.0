"use client";

import { RefObject, useEffect } from "react";

import gsap from "gsap";

type MagneticOptions = {
  strength?: number;
  textStrength?: number;
};

const useMagnetic = (
  ref: RefObject<HTMLElement | null>,
  { strength = 20, textStrength = 1 }: MagneticOptions = {},
) => {
  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const text = element.querySelector<HTMLElement>("[data-magnetic-text]");

    const xTo = gsap.quickTo(element, "x", {
      duration: 0.6,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(element, "y", {
      duration: 0.6,
      ease: "power3.out",
    });

    const textXTo = text
      ? gsap.quickTo(text, "x", {
          duration: 0.6,
          ease: "power3.out",
        })
      : null;

    const textYTo = text
      ? gsap.quickTo(text, "y", {
          duration: 0.6,
          ease: "power3.out",
        })
      : null;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      const x = e.clientX - (rect.left + rect.width / 2);

      const y = e.clientY - (rect.top + rect.height / 2);

      xTo((x / rect.width) * strength);

      yTo((y / rect.height) * strength);

      textXTo?.((x / rect.width) * textStrength);
      textYTo?.((y / rect.height) * textStrength);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      textXTo?.(0);
      textYTo?.(0);
    };

    element.addEventListener("mousemove", handleMouseMove);

    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);

      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength, textStrength]);
};

export default useMagnetic;

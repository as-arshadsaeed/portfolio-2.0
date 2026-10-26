// components/sections/hero/hero.animations.ts

import { gsap } from "@/lib/gsap";

export const heroParallax = (trigger: HTMLElement, target: HTMLElement) => {
  return gsap.to(target, {
    yPercent: 50,
    ease: "none",

    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
};

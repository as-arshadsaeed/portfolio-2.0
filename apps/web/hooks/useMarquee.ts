"use client";

import { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import useGSAP from "./useGSAP";

type UseMarqueeOptions = {
  containerRef: RefObject<HTMLElement | null>;
  marqueeRef: RefObject<HTMLElement | null>;
  speed?: number;
};

export default function useMarquee({
  containerRef,
  marqueeRef,
  speed = 2,
}: UseMarqueeOptions) {
  useGSAP(
    () => {
      const container = containerRef.current;
      const marquee = marqueeRef.current;

      if (!container || !marquee) return;

      let x = 0;
      let direction = -1;

      const getLoopWidth = () => marquee.scrollWidth / 2;

      const update = () => {
        x += speed * direction;

        const loopWidth = getLoopWidth();

        if (x <= -loopWidth) {
          x += loopWidth;
        }

        if (x >= 0) {
          x -= loopWidth;
        }

        gsap.set(marquee, {
          x,
        });
      };

      gsap.ticker.add(update);

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",

        onUpdate: (self) => {
          direction = self.direction === 1 ? -1 : 1;
        },
      });

      return () => {
        gsap.ticker.remove(update);
        trigger.kill();
      };
    },
    {
      scope: containerRef,
    },
  );
}

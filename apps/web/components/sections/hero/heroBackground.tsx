"use client";

import { useEffect, useRef } from "react";

import { heroParallax } from "./hero.animations";
import { HeroSection } from "@portfolio/sanity";

type Props = {
  triggerRef: React.RefObject<HTMLElement | null>;
  section: HeroSection;
};

const HeroBackground = ({ triggerRef, section }: Props) => {
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const video = videoWrapperRef.current;

    if (!trigger || !video) return;
    heroParallax(trigger, video);
  }, [triggerRef]);

  return (
    <div className="absolute inset-0 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-surface" />

      <div
        ref={videoWrapperRef}
        className="absolute inset-0 will-change-transform"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full scale-110 object-cover"
        >
          <source src={section.video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default HeroBackground;

"use client";

import { useRef } from "react";
import type { HeroSection as HeroSectionType } from "@portfolio/sanity";
import HeroBackground from "./heroBackground";
import HeroContent from "./heroContent";
import MarqueeText from "./marqueeText";

interface Props {
  section: HeroSectionType;
}

const HeroSectionHome = ({ section }: Props) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="
        relative flex min-h-[calc(100vh-80px)] items-end overflow-hidden
        md:pt-56 -translate-y-20
        md:min-h-[110vh] md:items-center
      "
    >
      {section?.video && (
        <HeroBackground triggerRef={sectionRef} section={section} />
      )}

      <HeroContent section={section} />
      <MarqueeText
        text={section.title}
        className="absolute z-20 bottom-[40vh] left-0 md:pb-10 text-white md:bottom-[5vh]"
      />
    </section>
  );
};

export default HeroSectionHome;

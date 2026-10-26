"use client";

import LocationBadge from "@/components/ui/locationBadge";
import RichText from "@/components/ui/richText";
import { HeroSection } from "@portfolio/sanity";
import { ArrowDownRight } from "lucide-react";

interface Props {
  section: HeroSection;
}

const HeroContent = ({ section }: Props) => {
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-full md:justify-end px-6 md:px-12 md:-translate-y-20">
      <div className="relative pr-[5vw] text-black">
        {/* Arrow */}
        <div
          className="
            absolute -top-20 left-0
            origin-left scale-75
            lg:scale-100
          "
        >
          <div className="flex items-center gap-2">
            <ArrowDownRight size={40} />
          </div>
        </div>

        {/* Text */}
        <div className="cursor-text">
          <RichText value={section.content} />
        </div>
      </div>
      <LocationBadge location={section.subtitle} />
    </div>
  );
};

export default HeroContent;

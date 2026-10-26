"use client";

import useAnimatedLines from "@/hooks/useAnimatedLines";

import RichText from "@/components/ui/richText";

import type { TextSection } from "@portfolio/sanity";

import TextSectionCTA from "./textSectionCTA";

interface Props {
  section: TextSection;
}

export default function TextSectionHome({ section }: Props) {
  const introRef = useAnimatedLines();

  return (
    <section ref={introRef}>
      <div className="row-wide section">
        <div className="relative md:flex md:gap-10 lg:gap-28">
          <div className="md:basis-[70%]">
            <div className="animate span-lines text-xl leading-snug lg:text-4xl lg:leading-tight">
              {section.heading}
            </div>
          </div>

          <div className="w-[calc(100%-150px)] pt-8 md:w-[30%] md:pt-2 text-foreground/70">
            <RichText value={section.content} />
            <div
              className={
                section.pageStyle === "home"
                  ? "absolute right-0 bottom-0 md:static"
                  : ""
              }
            >
              <TextSectionCTA cta={section.cta} pageStyle={section.pageStyle} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

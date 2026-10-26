"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSectionBlend } from "@/components/useScrollBgColor";
import { Props } from "@portfolio/sanity";
import { image } from "@/lib/sanity/image";

gsap.registerPlugin(ScrollTrigger);

export default function WorkDetailGallery({ work }: Props) {
  useSectionBlend({ selector: "[data-bgcolor]" });

  const images = work.images ?? [];
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        sectionRefs.current.forEach((section, index) => {
          const imageWrapper = imageRefs.current[index];

          if (!section || !imageWrapper) return;

          gsap.fromTo(
            imageWrapper,
            {
              yPercent: 8,
              scale: 1.08,
            },
            {
              yPercent: -8,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
      });

      return () => mm.revert();
    });

    return () => ctx.revert();
  }, []);

  if (!images.length) return null;

  return (
    <>
      {images.map((img, index) => {
        if (!img.image) return null;

        const isEven = index % 2 === 0;
        const isFirst = index === 0;
        const isFullWidth = index === 1;

        return (
          <section
            key={img._key ?? index}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className={isEven ? "blend-section relative" : "relative"}
            {...(isEven
              ? {
                  "data-bgcolor": true,
                  "data-bgcolor-start": "#ffffff",
                  "data-bgcolor-end": work.backgroundColor || "#ebebeb",
                }
              : {})}
          >
            <div className={isFullWidth ? "w-full" : "row section"}>
              {/* Desktop */}
              <div className="relative hidden aspect-video overflow-hidden md:block">
                <div
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={image.preset(img.image, {
                      width: 1600,
                      quality: 80,
                    })}
                    alt={work.title || "Project image"}
                    fill
                    priority={isFirst}
                    className="object-cover"
                    sizes="(max-width: 1536px) 100vw, 1600px"
                  />
                </div>
              </div>

              {/* Mobile */}
              <div className="relative block min-h-[50vh] w-full overflow-hidden md:hidden">
                <Image
                  src={image.preset(img.image, {
                    width: 768,
                    quality: 80,
                  })}
                  alt={work.title || "Project image"}
                  fill
                  priority={isFirst}
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}

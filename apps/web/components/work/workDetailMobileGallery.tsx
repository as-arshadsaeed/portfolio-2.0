"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Props } from "@portfolio/sanity";
import { image } from "@/lib/sanity/image";

gsap.registerPlugin(ScrollTrigger);

const PARALLAX_SPEEDS = [80, 0, -80, 50, -50, 0];

export default function WorkDetailMobileGallery({ work }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        itemsRef.current.forEach((item, index) => {
          if (!item) return;

          gsap.to(item, {
            y: PARALLAX_SPEEDS[index % PARALLAX_SPEEDS.length],
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  const images = work.mobileImages ?? [];

  if (!images.length) return null;

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-background text-foreground"
    >
      <div className="row-wide section">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-10">
          {images.map((img, index) => {
            if (!img.image) return null;

            return (
              <div
                key={img._key ?? index}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className="
                  mx-auto w-full max-w-[450px]
                  lg:mx-0 lg:max-w-none
                  will-change-transform
                "
              >
                <div className="relative overflow-hidden bg-surface">
                  <Image
                    src={image.preset(img.image, {
                      width: 800,
                      quality: 80,
                    })}
                    alt={work.title || "Project image"}
                    width={500}
                    height={700}
                    className="block h-auto w-full object-cover"
                    sizes="(max-width: 1023px) 320px, 30vw"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

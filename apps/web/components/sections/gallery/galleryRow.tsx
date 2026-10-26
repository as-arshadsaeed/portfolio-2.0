"use client";

import { useRef } from "react";
import gsap from "gsap";
import useGSAP from "@/hooks/useGSAP";
import { GalleryImage } from "@portfolio/sanity";
import GalleryItem from "./galleryItem";

export type GalleryRowProps = {
  items: GalleryImage[];
  speed?: number;
};

const GalleryRow = ({ items, speed = 10 }: GalleryRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  // console.log(items);
  useGSAP(
    () => {
      if (!rowRef.current) return;

      gsap.to(rowRef.current, {
        xPercent: speed,
        ease: "none",

        scrollTrigger: {
          trigger: rowRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    {
      scope: rowRef,
    },
  );

  return (
    <div ref={rowRef} className="relative flex w-[120vw] -translate-x-[10vw]">
      {Array.isArray(items) &&
        items.map((item, index) => (
          <GalleryItem key={item._key} item={item} hiddenDesktop={index > 1} />
        ))}
    </div>
  );
};

export default GalleryRow;

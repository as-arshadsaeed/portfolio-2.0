"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";

import { gsap } from "@/lib/gsap";

type Props = {
  src: string;
  alt: string;
  className?: string;

  yPercent?: number;
  scale?: number;

  start?: string;
  end?: string;
};

export default function ParallaxImage({
  src,
  alt,
  className = "",
  yPercent = 15,
  scale = 1.2,
  start = "top bottom",
  end = "bottom top",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        yPercent,
        ease: "none",

        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [yPercent, start, end]);

  return (
    <div
      className={`
        relative
        overflow-hidden
        ${className}
      `}
    >
      <div
        ref={ref}
        className="
          absolute
          inset-0
          will-change-transform
        "
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 25vw"
          loading="lazy"
        />
      </div>
    </div>
  );
}

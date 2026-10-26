"use client";

import { useRef } from "react";
import useMarquee from "@/hooks/useMarquee";

type Props = {
  text: string;
  className?: string;
};

export default function MarqueeText({ text, className = "" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useMarquee({
    containerRef,
    marqueeRef,
  });

  const items = Array.from({ length: 6 });

  return (
    <div
      ref={containerRef}
      className={`absolute left-0 w-full overflow-hidden ${className}`}
    >
      <div ref={marqueeRef} className="flex w-max will-change-transform">
        {/* ORIGINAL */}
        <div className="flex shrink-0">
          {items.map((_, i) => (
            <span
              key={`a-${i}`}
              className="shrink-0 whitespace-nowrap text-[5rem] md:text-[16rem]"
            >
              {text}
              <span className="px-10">—</span>
            </span>
          ))}
        </div>

        {/* DUPLICATE */}
        <div className="flex shrink-0">
          {items.map((_, i) => (
            <span
              key={`b-${i}`}
              className="shrink-0 whitespace-nowrap text-[5rem] md:text-[16rem]"
            >
              {text}
              <span className="px-10">—</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { SiteSettings } from "@portfolio/sanity";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { image } from "@/lib/sanity/image";
import { PageTheme } from "@/lib/page/getPageTheme";
import { selectHeader } from "@/lib/shared/settings/selectors";
type Props = {
  settings: SiteSettings;
  styles: PageTheme;
};
export function HeaderLogo({ settings, styles }: Props) {
  const header = selectHeader(settings);
  const logoText = header?.logoTitle.split(" ") ?? [];

  const firstName = logoText[0] ?? "";
  const lastName = logoText.slice(1).join(" ");

  const firstRef = useRef<HTMLSpanElement>(null);

  const [hovered, setHovered] = useState(false);
  const [firstWidth, setFirstWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!firstRef.current) return;
      setFirstWidth(firstRef.current.offsetWidth);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [header?.logoTitle]);
  return (
    <Link
      href="/"
      className="group text-base lg:text-xl lg:font-medium flex magnetic h-10 items-center"
      prefetch={false}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={clsx(
          "flex items-center font-medium transition-colors duration-300",
          styles.text,
        )}
      >
        {header?.logo && (
          <span className="pr-2 transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:rotate-[360deg]">
            <Image
              src={image.preset(header.logo, { width: 40, height: 40 })}
              alt={header.logoTitle || "Logo"}
              width={32}
              height={32}
              className="transition-[filter] duration-300 dark:invert"
            />
          </span>
        )}

        <span
          className="relative overflow-hidden inline-flex transition-[width] duration-500 delay-100 ease-[cubic-bezier(0.7,0,0.3,1)]"
          style={{
            width: hovered ? firstWidth * 2 : firstWidth,
          }}
        >
          {/* FIRST */}
          <span
            ref={firstRef}
            className="block whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] px-1"
            style={{
              transform: hovered
                ? `translateX(-${firstWidth}px)`
                : "translateX(0)",
            }}
          >
            {firstName}
          </span>

          {/* SECOND */}
          <span
            className="absolute left-0 top-0 whitespace-nowrap transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]"
            style={{
              transform: hovered
                ? "translateX(0)"
                : `translateX(${firstWidth}px)`,
            }}
          >
            {lastName}
          </span>
        </span>
      </span>
    </Link>
  );
}

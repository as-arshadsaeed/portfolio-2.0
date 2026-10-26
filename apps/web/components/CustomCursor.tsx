"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const isTouchDevice = () => {
  if (typeof window === "undefined") return false;

  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(max-width: 767px)").matches
  );
};

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice()) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    cursor.style.opacity = "0";

    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      scale: 1,
    });

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    let mouseX = 0;
    let mouseY = 0;
    let posX = 0;
    let posY = 0;

    const move = (e: MouseEvent) => {
      cursor.style.opacity = "1";
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const update = () => {
      posX += (mouseX - posX) * 0.18;
      posY += (mouseY - posY) * 0.18;

      xSet(posX);
      ySet(posY);
    };

    const handleEnter = () => {
      gsap.to(cursor, {
        scale: 5,
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const handleLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
        overwrite: true,
      });
    };

    window.addEventListener("mousemove", move);
    gsap.ticker.add(update);

    const hoverEls = document.querySelectorAll(
      "a:not(.work-grid-item), button, .magnetic-text, .cursor-text",
    );

    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      gsap.ticker.remove(update);

      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });

      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        fixed
        top-0
        left-0
        hidden
        md:block
        w-3
        h-3
        rounded-full
        bg-white
        pointer-events-none
        z-[99999]
        mix-blend-difference
      "
    />
  );
}

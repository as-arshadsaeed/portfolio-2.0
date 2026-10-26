"use client";

export default function WorkGridCursor() {
  return (
    <div
      className="
        view-cursor
        pointer-events-none
        fixed
        left-0
        top-0
        z-[9999]
        hidden
        h-24
        w-24
        items-center
        justify-center
        rounded-full
        border
        border-white/50
        text-white
        backdrop-blur-sm
        mix-blend-difference
        md:flex
        will-change-transform
      "
    >
      <span className="text-sm uppercase tracking-wide">&nbsp;</span>
    </div>
  );
}

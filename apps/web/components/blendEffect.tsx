"use client";

import { useSectionBlend } from "@/components/useScrollBgColor";

export default function BlendEffect() {
  useSectionBlend({
    selector: "[data-bgcolor]",
    targetSelector: ".blend-section",
  });

  return null;
}

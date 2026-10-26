"use client";

import { useRef } from "react";
import useMagnetic from "@/hooks/useMagnetic";

type MagneticOptions = {
  strength?: number | undefined;
  textStrength?: number;
};

export default function useMagneticElement<T extends HTMLElement>(
  options?: MagneticOptions,
) {
  const ref = useRef<T | null>(null);

  useMagnetic(ref, options);

  return ref;
}

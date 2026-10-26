"use client";

import { DependencyList, RefObject, useLayoutEffect } from "react";

import { gsap } from "@/lib/gsap";

type UseGSAPOptions = {
  scope?: RefObject<HTMLElement | null>;
  dependencies?: DependencyList;
};

const useGSAP = (
  callback: () => void | (() => void),
  options?: UseGSAPOptions,
) => {
  const { scope, dependencies = [] } = options || {};

  useLayoutEffect(() => {
    let cleanup: void | (() => void);

    const ctx = gsap.context(() => {
      cleanup = callback();
    }, scope);

    return () => {
      cleanup?.();
      ctx.revert();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default useGSAP;

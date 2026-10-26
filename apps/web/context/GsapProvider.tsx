"use client";

import { useEffect } from "react";
// import { usePathname } from "next/navigation";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GsapProvider = ({ children }: { children: React.ReactNode }) => {
  // const pathname = usePathname();

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     ScrollTrigger.refresh(true);
  //   }, 100);

  //   return () => clearTimeout(timeout);
  // }, [pathname]);
  useEffect(() => {
    const handler = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
      });
    };

    window.addEventListener("route-change", handler);

    return () => window.removeEventListener("route-change", handler);
  }, []);

  return <>{children}</>;
};

export default GsapProvider;

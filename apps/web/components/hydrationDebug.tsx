"use client";

import { useEffect } from "react";

export default function HydrationDebug() {
  useEffect(() => {
    const originalError = console.error;

    console.error = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].toLowerCase().includes("hydration")
      ) {
        console.group("🚨 HYDRATION ERROR");
        console.error(...args);
        console.trace();
        console.groupEnd();
      }

      originalError(...args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}

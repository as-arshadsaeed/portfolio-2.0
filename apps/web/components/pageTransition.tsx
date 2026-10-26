"use client";

import { getPageTheme } from "@/lib/page/getPageTheme";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const theme = getPageTheme(pathname);

  return (
    <motion.div
      key={pathname}
      className={`${theme.background} ${theme.text} min-h-screen`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

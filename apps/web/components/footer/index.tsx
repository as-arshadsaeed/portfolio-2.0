"use client";

import { useGlobalLayout } from "@/context/GlobalLayoutProvider";
import FooterClient from "./footer-client";

export default function Footer() {
  const { siteSettings } = useGlobalLayout();
  return <FooterClient settings={siteSettings} />;
}

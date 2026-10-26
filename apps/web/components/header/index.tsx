"use client";
import HeaderClient from "./header-client";
import { FixedNav } from "./fixedNav";
import { useGlobalLayout } from "@/context/GlobalLayoutProvider";

export default function Header() {
  const { navigation, siteSettings } = useGlobalLayout();
  return (
    <>
      <FixedNav items={navigation?.menuItems} settings={siteSettings} />
      <HeaderClient items={navigation?.menuItems} settings={siteSettings} />
    </>
  );
}

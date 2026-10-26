"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLenis } from "@/context/LenisProvider";
import Magnetic from "../ui/magnetic";
import { TextAlignJustify, X } from "lucide-react";
import { NavItem, SiteSettings } from "@portfolio/sanity";
import { resolveNavLink } from "@/lib/resolveNavLink";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import SocialLinks from "../socialLinks";
import { useNavigation } from "@/context/NavigationProvider";
import { selectSocialLinks } from "@/lib/shared/settings/selectors";

const ThemeToggle = dynamic(() => import("./theme-toggle"), {
  ssr: false,
});

interface Props {
  items: NavItem[];
  settings: SiteSettings;
}

export const FixedNav = ({ items, settings }: Props) => {
  const socialLinks = selectSocialLinks(settings);
  const pathname = usePathname();
  const { scrollY } = useLenis();
  const buttonRef = useRef<HTMLDivElement>(null);

  const { open, closeMenu, toggleMenu } = useNavigation();

  const handleOverlayClick = () => {
    closeMenu();
  };

  useEffect(() => {
    gsap.to(buttonRef.current, {
      scale: scrollY > 100 ? 1 : 0,
      y: scrollY > 100 ? 0 : 16,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [scrollY]);
  return (
    <>
      <div
        ref={buttonRef}
        className="fixed top-4 right-4 md:top-10 md:right-10 z-50"
      >
        <Magnetic
          variant="blank"
          onClick={toggleMenu}
          className="cursor-pointer  text-white/80 bg-gray-700 inline-block w-16 h-16 md:w-24 md:h-24 border border-gray-700"
          strength={100}
          textStrength={40}
        >
          <TextAlignJustify />
        </Magnetic>
      </div>

      <div
        onClick={handleOverlayClick}
        className={`fixed inset-0 z-100 bg-black/60 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div className="fixed-nav top-0 right-0 z-110 fixed h-screen">
        <div className="fixed-nav-rounded-div">
          <div className="rounded-div-wrap">
            <div className="rounded-div"></div>
          </div>
        </div>
        <div className="fixed-nav-inner flex flex-col  h-screen bg-page-dark  text-page-dark-foreground px-5 py-10 md:px-30 md:pt-30 md:pb-10">
          <Magnetic
            variant="blank"
            onClick={handleOverlayClick}
            className="cursor-pointer absolute top-4 right-4 md:top-10 md:right-10 z-120 text-white/70 md:border md:border-gray-700 md:bg-gray-700 inline-block w-16 h-16 md:w-24 md:h-24"
            strength={100}
            textStrength={40}
          >
            <X />
          </Magnetic>
          <div className="nav-row md:min-w-[400px] flex-1 ">
            <h5 className="uppercase text-page-dark-foreground/60 text-xs lg:font-medium pb-5 border-b border-page-dark-foreground/20">
              Navigation
            </h5>
            <nav className="py-10 md:py-15">
              <ul className="links-wrap gap-5 md:gap-10 ">
                <li>
                  <ThemeToggle className="text-page-dark-foreground" />
                </li>
                {items.map((item) => {
                  const href = resolveNavLink(item);
                  const isActive = pathname === href;

                  return (
                    <li key={item._key}>
                      <Magnetic
                        as="link"
                        href={href}
                        variant="blank"
                        className={clsx(
                          "group relative md:flex items-center max-md:block",
                        )}
                        innerClassName={clsx("h-full w-full")}
                        onClick={closeMenu}
                      >
                        <span className="magnetic-text flex items-center h-full text-2xl lg:text-5xl">
                          {item.label}
                        </span>

                        {/* ACTIVE / HOVER DOT */}
                        <span
                          className={clsx(
                            "absolute top-[50%] right-0 md:-left-10 h-2 w-2 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.7,0,0.3,1)]",
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                          )}
                        />
                      </Magnetic>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="">
            <div className="block h-[1px]w-full my-4 lg:my-6"></div>
            <h5 className="uppercase text-gray-400 text-xs lg:font-medium mb-2">
              Follow Me
            </h5>
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>
    </>
  );
};

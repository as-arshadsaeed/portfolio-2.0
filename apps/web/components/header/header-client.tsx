"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import Magnetic from "../ui/magnetic";
import { getPageTheme } from "@/lib/page/getPageTheme";
import { NavItem, SiteSettings } from "@portfolio/sanity";
import { resolveNavLink } from "@/lib/resolveNavLink";
import { HeaderLogo } from "./header-logo";
import { useNavigation } from "@/context/NavigationProvider";

const ThemeToggle = dynamic(() => import("./theme-toggle"), {
  ssr: false,
});

interface Props {
  items: NavItem[];
  settings: SiteSettings;
}

export default function HeaderClient({ items, settings }: Props) {
  const pathname = usePathname();
  const { toggleMenu } = useNavigation();
  const themeStyle = getPageTheme(pathname);

  return (
    <header
      className={clsx(
        "relative z-20 flex h-20 flex-col justify-center",
        themeStyle.background,
      )}
    >
      <div className="row flex items-center justify-between">
        <HeaderLogo styles={themeStyle} settings={settings} />

        <nav>
          <ul className="flex items-center">
            <li className="max-md:hidden">
              <ThemeToggle className={themeStyle.text} />
            </li>

            {items.map((item) => {
              const href = resolveNavLink(item);
              const isActive = pathname === href;

              return (
                <li key={item._key} className="hidden md:block">
                  <Magnetic
                    as="link"
                    href={href}
                    variant="blank"
                    className={clsx(
                      "group relative flex h-10 items-center",
                      themeStyle.text,
                    )}
                    innerClassName="h-full"
                  >
                    <span className="magnetic-text flex h-full items-center px-4 text-base lg:text-xl lg:font-medium">
                      {item.label}
                    </span>

                    <span
                      className={clsx(
                        "absolute bottom-0 left-1/2 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.7,0,0.3,1)]",
                        isActive
                          ? "scale-100 opacity-100"
                          : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                      )}
                    />
                  </Magnetic>
                </li>
              );
            })}

            <li className="md:hidden">
              <Magnetic
                onClick={toggleMenu}
                variant="blank"
                className={clsx(
                  "group relative flex h-10 items-center",
                  themeStyle.text,
                )}
                innerClassName="h-full"
              >
                <span className="magnetic-text flex h-full items-center px-4 text-base lg:text-xl lg:font-medium">
                  Menu
                </span>

                <span className="absolute left-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-current" />
              </Magnetic>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

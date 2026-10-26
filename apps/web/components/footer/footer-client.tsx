"use client";

import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { useEffect, useRef, useState } from "react";
import useGSAP from "@/hooks/useGSAP";
import Magnetic from "../ui/magnetic";
import { ArrowDownLeft } from "lucide-react";
import { matchRoute } from "@/lib/routing/route-matcher";
import { SiteSettings } from "@portfolio/sanity";
import SocialLinks from "../socialLinks";
import {
  selectFooter,
  selectSocialLinks,
} from "@/lib/shared/settings/selectors";

type Props = {
  settings: SiteSettings;
};

export default function FooterClient({ settings }: Props) {
  const footer = selectFooter(settings);
  const socialLinks = selectSocialLinks(settings);

  const pathname = usePathname();

  const roundedRef = useRef<HTMLDivElement>(null);

  const footerRef = useRef<HTMLElement>(null);

  const route = matchRoute(pathname);

  const footerYear = new Date().getFullYear();

  useGSAP(
    () => {
      if (!roundedRef.current || !footerRef.current) return;

      gsap.to(roundedRef.current, {
        height: 0,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    {
      scope: footerRef,
      dependencies: [pathname],
    },
  );

  return (
    <footer ref={footerRef} className="bg-page-dark text-page-dark-foreground">
      {/* TOP CURVE */}
      {!route.isProjectDetail && !route.isHideFooterCTA && (
        <>
          <div className="relative z-2 h-0 w-full">
            <div
              ref={roundedRef}
              className="relative h-[10vh] overflow-hidden w-full -translate-y-[1px]"
            >
              <div className="absolute bg-page-dark-foreground w-[150%] h-[750%] left-1/2 rounded-[50%] z-1 -translate-x-1/2 -translate-y-[86.66%]" />
            </div>
          </div>
          <div className="row-wide section">
            <div className="">
              <div className="relative pb-30 mb-20 border-b border-b-page-dark-foreground/20">
                <h2 className="text-[clamp(2.84375em,6.125vw,7em)] font-medium leading-tight max-w-[75%] md:max-w-lg">
                  <span className="flex items-center gap-5">
                    {footer?.footerTitle ?? ""}
                  </span>
                </h2>

                {footer?.footerCta?.label && footer?.footerCta?.href && (
                  <div className=" h-0 text-right relative">
                    <div className="flex items-center gap-2 top-0 right-0 absolute">
                      <ArrowDownLeft size={40} />
                    </div>
                    <Magnetic
                      variant="circle"
                      as="link"
                      href={footer.footerCta.href}
                      className="cursor-pointer bg-gray-700 text-white md:text-xl mr-10 md:mr-20"
                      strength={100}
                      textStrength={40}
                    >
                      {footer.footerCta.label}
                    </Magnetic>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                {footer?.contact.email && (
                  <Magnetic
                    as="link"
                    href={`mailto:${footer?.contact.email}`}
                    variant="outline"
                    textStrength={20}
                    innerClassName="lowercase"
                  >
                    {footer?.contact.email}
                  </Magnetic>
                )}

                {footer?.contact.phone && (
                  <Magnetic
                    as="link"
                    href={`tel:${footer?.contact.phone}`}
                    variant="outline"
                    textStrength={20}
                  >
                    {footer?.contact.phone}
                  </Magnetic>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* BOTTOM */}
      <div className="py-10">
        <div className="row flex flex-col-reverse md:flex-row md:items-end md:justify-between">
          {/* LEFT */}
          <div className="flex justify-between md:gap-10">
            <div>
              <h5 className="pb-2 text-xs uppercase text-page-dark-foreground/60">
                Version
              </h5>

              <p className="text-sm">{footerYear} Edition</p>
            </div>

            <div>
              <h5 className="pb-2 text-xs uppercase text-page-dark-foreground/60">
                Local Time
              </h5>

              <Clock />
            </div>
          </div>

          {/* RIGHT */}
          <div className="pb-5 mb-6 border-b border-page-dark-foreground/20 md:mb-auto md:pb-0 md:border-0">
            <h5 className="pb-2 text-xs uppercase text-page-dark-foreground/60">
              Socials
            </h5>
            <SocialLinks links={socialLinks} />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------- */
/* CLOCK */
/* -------------------------------- */
const Clock = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const updateTime = () => {
      setTime(formatter.format(new Date()));
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p className="text-sm">{time}</p>;
};

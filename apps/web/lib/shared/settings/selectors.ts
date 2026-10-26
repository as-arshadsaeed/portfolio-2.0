import type { SiteSettings } from "@portfolio/sanity";

export type HeaderData = {
  logo?: SiteSettings["logo"];
  logoTitle: string;
};

export type FooterData = {
  footerTitle: string;
  footerCta?: SiteSettings["footerCta"];
  contact: SiteSettings["contact"];
};

export type SocialLinkItem = NonNullable<SiteSettings["socialLinks"]>[number];

export const selectHeader = (s?: SiteSettings): HeaderData | null => {
  if (!s) return null;

  return {
    logo: s.logo,
    logoTitle: s.logoTitle,
  };
};

export const selectFooter = (s?: SiteSettings): FooterData | null => {
  if (!s) return null;

  return {
    footerTitle: s.footerTitle,
    footerCta: s.footerCta,
    contact: s.contact,
  };
};

export const selectSocialLinks = (s?: SiteSettings) =>
  (s?.socialLinks ?? []).filter((link) => link?.enabled);

import { SEO } from "./common";
import { PageSection } from "./sections";

export type Page = {
  _id: string;
  title: string;
  heading?: string;
  slug: {
    current: string;
  };
  pageType: "page" | "work" | "blog";
  description?: string;
  seo?: SEO;
  layout?: "default" | "landing" | "full";
  sections: PageSection[];
  _updatedAt: string;
};

export type WorkPageSlug = {
  slug: string;
};

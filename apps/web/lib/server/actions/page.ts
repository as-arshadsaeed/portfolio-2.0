// import "server-only";

import { cache } from "react";
import { sanityClient } from "../../sanity/client";
import {
  ALL_PAGES_QUERY,
  fetchSanity,
  HOME_PAGE_QUERY,
  PAGE_BY_SLUG_QUERY,
  WORK_PAGE_SLUG_QUERY,
} from "@portfolio/sanity";
import type { Page, WorkPageSlug } from "@portfolio/sanity";

export const getAllPages = cache(async () => {
  return fetchSanity<Page[]>(sanityClient, ALL_PAGES_QUERY);
});

export const getPageBySlug = cache(async (slug: string) => {
  console.log("🔥 PAGE FETCH:", slug);

  return fetchSanity<Page>(sanityClient, PAGE_BY_SLUG_QUERY, { slug });
});

export const getHomepage = cache(async () => {
  return fetchSanity<Page>(sanityClient, HOME_PAGE_QUERY);
});

export const getWorkPageSlug = cache(async () => {
  return fetchSanity<WorkPageSlug>(sanityClient, WORK_PAGE_SLUG_QUERY);
});

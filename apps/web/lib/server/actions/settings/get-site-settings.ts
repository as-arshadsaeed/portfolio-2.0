import "server-only";

import { cache } from "react";
import { sanityClient } from "@/lib/sanity/client";
import { fetchSanity, SITE_SETTINGS_QUERY } from "@portfolio/sanity";
import type { SiteSettings } from "@portfolio/sanity";

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  return fetchSanity<SiteSettings>(sanityClient, SITE_SETTINGS_QUERY);
});

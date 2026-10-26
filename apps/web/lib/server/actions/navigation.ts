import "server-only";

import { cache } from "react";
import { sanityClient } from "../../sanity/client";
import { fetchSanity, NAVIGATION_QUERY } from "@portfolio/sanity";
import type { Navigation } from "@portfolio/sanity";

export const getNavigation = cache(async () => {
  console.log("🔥 NAVIGATION FETCH");
  return fetchSanity<Navigation>(sanityClient, NAVIGATION_QUERY);
});

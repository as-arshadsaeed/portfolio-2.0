// import "server-only";

import { cache } from "react";
import { sanityClient } from "../../sanity/client";
import {
  fetchSanity,
  PROJECT_BY_SLUG_QUERY,
  PROJECTS_BY_FEATURED_QUERY,
  PROJECTS_BY_QUERY,
  PROJECTS_MIN_QUERY,
} from "@portfolio/sanity";
import type { Project } from "@portfolio/sanity";

export const getProject = cache(async (projectSlug: string) => {
  console.log("SANITY PROJECT FETCH", projectSlug);

  return fetchSanity<Project>(sanityClient, PROJECT_BY_SLUG_QUERY, {
    projectSlug,
  });
});

export const getAllProjects = cache(async () => {
  return fetchSanity<Project[]>(sanityClient, PROJECTS_BY_QUERY);
});

export const getFeaturedProjects = cache(async () => {
  return fetchSanity<Project[]>(sanityClient, PROJECTS_BY_FEATURED_QUERY);
});

export const getProjectsMin = cache(async () => {
  return fetchSanity<Project[]>(sanityClient, PROJECTS_MIN_QUERY);
});

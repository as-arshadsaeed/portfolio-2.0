export const routes = {
  home: () => "/",

  work: (workSlug: string) => `/${workSlug}`,

  project: (workSlug: string, projectSlug: string) =>
    `/${workSlug}/${projectSlug}`,
} as const;

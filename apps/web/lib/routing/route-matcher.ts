export const ROUTE_UI_RULES = {
  darkHeader: ["contact"],
  hideFooterCTA: ["contact"],
};
const matchesRoute = (root: string | undefined, routes: readonly string[]) => {
  return !!root && routes.includes(root);
};
export function matchRoute(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  const root = segments[0];
  const slug = segments[1] ?? null;

  const isProjectDetail = segments.length === 2;

  return {
    root,
    slug,

    isHome: pathname === "/",

    isProjectDetail,

    isDarkHeader: matchesRoute(root, ROUTE_UI_RULES.darkHeader),

    isHideFooterCTA:
      matchesRoute(root, ROUTE_UI_RULES.hideFooterCTA) || isProjectDetail,
  };
}

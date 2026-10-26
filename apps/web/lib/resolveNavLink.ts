import type { NavItem } from "@portfolio/sanity";

export function resolveNavLink(item: NavItem): string {
  if (item.linkType === "page") {
    return `/${item.page?.slug?.current ?? ""}`;
  }

  if (item.linkType === "custom") {
    return item.url ?? "#";
  }

  return "#";
}

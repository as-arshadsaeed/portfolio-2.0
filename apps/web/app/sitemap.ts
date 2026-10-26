import { getAllPages } from "@/lib/server/actions/page";
import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL!;

if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_APP_URL is not defined");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();

  return pages
    .filter((page) => !page.seo?.noIndex)
    .map((page) => ({
      url:
        page.slug.current === "home"
          ? siteUrl
          : `${siteUrl}/${page.slug.current}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: "weekly" as const,
      priority: page.slug.current === "home" ? 1 : 0.8,
    }));
}

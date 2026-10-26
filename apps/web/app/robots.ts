import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL!;

if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_APP_URL is not defined");
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

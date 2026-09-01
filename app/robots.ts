import type { MetadataRoute } from "next";

// TODO: set SITE_URL to the real production domain once it's confirmed.
const BASE_URL = process.env["SITE_URL"] || "https://example.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

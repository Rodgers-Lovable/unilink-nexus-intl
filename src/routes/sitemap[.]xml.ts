import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { destinations } from "@/data/destinations";
import { services } from "@/data/services";
import { resources } from "@/data/resources";
import { legalDocuments } from "@/data/legal";
import { isPlaceholder } from "@/data/company";

const BASE_URL = "https://global-guidance-flow.lovable.app";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const staticRoutes: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/explore", changefreq: "weekly", priority: "0.8" },
  { path: "/explore/career-subject-guidance", changefreq: "monthly", priority: "0.6" },
  { path: "/explore/destinations", changefreq: "monthly", priority: "0.6" },
  { path: "/explore/how-it-works", changefreq: "monthly", priority: "0.6" },
  { path: "/explore/pathway-advisor", changefreq: "monthly", priority: "0.7" },
  { path: "/study-abroad", changefreq: "weekly", priority: "0.8" },
  { path: "/study-abroad/application-process", changefreq: "monthly", priority: "0.6" },
  { path: "/study-abroad/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/study-abroad/how-it-works", changefreq: "monthly", priority: "0.6" },
  { path: "/study-abroad/preparation", changefreq: "monthly", priority: "0.6" },
  { path: "/destinations", changefreq: "weekly", priority: "0.8" },
  { path: "/services", changefreq: "weekly", priority: "0.8" },
  { path: "/resources", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/about/approach", changefreq: "monthly", priority: "0.6" },
  { path: "/parents", changefreq: "monthly", priority: "0.7" },
  { path: "/schools", changefreq: "monthly", priority: "0.7" },
  { path: "/success-stories", changefreq: "monthly", priority: "0.6" },
  { path: "/apply", changefreq: "monthly", priority: "0.6" },
  { path: "/book-consultation", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [...staticRoutes];

        for (const destination of destinations) {
          entries.push({
            path: `/destinations/${encodeURIComponent(destination.slug)}`,
            changefreq: "monthly",
            priority: "0.7",
          });
        }

        for (const service of services) {
          entries.push({
            path: `/services/${encodeURIComponent(service.slug)}`,
            changefreq: "monthly",
            priority: "0.7",
          });
        }

        for (const resource of resources) {
          entries.push({
            path: `/resources/${encodeURIComponent(resource.slug)}`,
            lastmod: resource.date,
            changefreq: "monthly",
            priority: "0.6",
          });
        }

        for (const legal of Object.values(legalDocuments)) {
          entries.push({
            path: `/legal/${encodeURIComponent(legal.slug)}`,
            lastmod: legal.updated,
            changefreq: "yearly",
            priority: "0.3",
          });
        }

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

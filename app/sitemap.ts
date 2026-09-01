import type { MetadataRoute } from "next";
import { destinations } from "@/data/destinations";
import { services } from "@/data/services";
import { resources } from "@/data/resources";
import { legalDocuments } from "@/data/legal";
import { isPlaceholder } from "@/data/company";

// TODO: set SITE_URL to the real production domain once it's confirmed.
const BASE_URL = process.env["SITE_URL"] || "https://example.com";

const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
  { url: `${BASE_URL}/explore`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/explore/career-subject-guidance`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/explore/destinations`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/explore/how-it-works`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/explore/pathway-advisor`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/study-abroad`, changeFrequency: "weekly", priority: 0.8 },
  {
    url: `${BASE_URL}/study-abroad/application-process`,
    changeFrequency: "monthly",
    priority: 0.6,
  },
  { url: `${BASE_URL}/study-abroad/faq`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/study-abroad/how-it-works`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/study-abroad/preparation`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/destinations`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/services`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/resources`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/about/approach`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/parents`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/schools`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/success-stories`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/apply`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/book-consultation`, changeFrequency: "monthly", priority: 0.6 },
  { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [...staticRoutes];

  for (const destination of destinations) {
    entries.push({
      url: `${BASE_URL}/destinations/${encodeURIComponent(destination.slug)}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const service of services) {
    entries.push({
      url: `${BASE_URL}/services/${encodeURIComponent(service.slug)}`,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const resource of resources) {
    entries.push({
      url: `${BASE_URL}/resources/${encodeURIComponent(resource.slug)}`,
      lastModified: resource.date,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const legal of Object.values(legalDocuments)) {
    entries.push({
      url: `${BASE_URL}/legal/${encodeURIComponent(legal.slug)}`,
      ...(isPlaceholder(legal.updated) ? {} : { lastModified: legal.updated }),
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  return entries;
}

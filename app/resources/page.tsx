import type { Metadata } from "next";
import { PageHero, CTABanner } from "@/components/site/primitives";
import { ResourceList } from "@/components/resources/ResourceList";
import { activeCategories, getFeaturedResource, resources } from "@/data/resources";

export const metadata: Metadata = {
  title: "Study Abroad Resources & Guides | Unilink Nexus",
  description:
    "Guides on planning, applications, visas, financial planning and student life for international students.",
  openGraph: {
    title: "Study Abroad Resources & Guides",
    description: "Practical guides for every stage of studying abroad.",
    url: "/resources",
  },
  alternates: {
    canonical: "/resources",
  },
};

export default function ResourcesPage() {
  const featured = getFeaturedResource();

  return (
    <>
      <PageHero
        image="resources"
        eyebrow="Resources"
        title="Guides for every stage of studying abroad"
        description="Practical guides to help you make informed decisions — from your first questions about studying abroad to preparing for life at your destination."
      />

      <section className="section-y">
        <div className="container-page">
          <ResourceList resources={resources} categories={activeCategories} featured={featured} />
        </div>
      </section>

      <CTABanner
        title="Have a question the guides haven't answered?"
        description="Talk it through with a UniLink advisor."
        primary={{ label: "Talk to an Advisor", href: "/book-consultation", cta: "advisor" }}
        secondary={{
          label: "Discover My Pathway",
          href: "/explore/pathway-advisor",
          cta: "pathway-advisor",
        }}
      />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero, CTABanner, Placeholder } from "@/components/site/primitives";
import { ResourceList } from "@/components/resources/ResourceList";
import { resourceCategories, resources } from "@/data/resources";

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
  return (
    <>
      <PageHero
        image="resources"
        eyebrow="Resources"
        title="Guides for every stage of studying abroad"
        description="Practical, plainly written guides on planning, applications, visas and student life."
      />

      <section className="section-y">
        <div className="container-page">
          <ResourceList resources={resources} categories={resourceCategories} />

          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Articles are sample editorial content and should be reviewed and verified before
              publication. [Content to be confirmed]
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

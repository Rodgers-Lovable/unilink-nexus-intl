import type { Metadata } from "next";
import {
  Breadcrumbs,
  PageHero,
  SectionHeading,
  CheckList,
  Placeholder,
  CTABanner,
} from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { preparationTopics, documentChecklist } from "@/data/site";

export const metadata: Metadata = {
  title: "Preparation & Requirements | UniLink Nexus International",
  description:
    "What to prepare before studying abroad: documents, language requirements, finances, timelines and practical arrangements for life in a new country.",
  openGraph: {
    title: "Preparation & Requirements",
    description: "Documents, language, finances and practical preparation for international study.",
    type: "website",
    url: "/study-abroad/preparation",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/study-abroad/preparation",
  },
};

export default function PreparationPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Study Abroad", to: "/study-abroad" }, { label: "Preparation" }]} />
      <PageHero
        image="destinations"
        eyebrow="Preparation"
        title="Preparation removes most of the stress"
        description="Most difficulties in international study come from late preparation rather than difficult requirements. These are the areas worth starting early."
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Areas to prepare" title="What to work on, and when" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {preparationTopics.map((topic) => (
              <Card key={topic.title} className="h-full">
                <h3 className="text-base font-bold">{topic.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {topic.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Documents" title="A typical document checklist" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Exact requirements depend on the destination, institution and programme. Use this as a
              preparation list, not a submission list.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <CheckList items={documentChecklist} />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page max-w-2xl">
          <Placeholder>
            Visa, financial and language requirements must be verified with official sources for
            each destination. UniLink provides guidance only and does not guarantee visa approval.
            [Content to be confirmed]
          </Placeholder>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

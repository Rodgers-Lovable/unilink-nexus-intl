import type { Metadata } from "next";
import { PageHero, Breadcrumbs, SectionHeading, CTABanner, CheckList, Placeholder } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { applicationStages, documentChecklist } from "@/data/site";

export const metadata: Metadata = {
  title: "Application Process — Studying Abroad | Unilink Nexus",
  description:
    "How an international application typically progresses, from initial consultation and document preparation to offer review and pre-departure.",
  openGraph: {
    title: "Application Process — Studying Abroad",
    description: "The general shape of an international application, stage by stage.",
    url: "/study-abroad/application-process",
  },
  alternates: {
    canonical: "/study-abroad/application-process",
  },
};

export default function ApplicationProcess() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Study Abroad", to: "/study-abroad" }, { label: "Application Process" }]}
      />
      <PageHero
        image="apply"
        eyebrow="Application Process"
        title="How an application usually progresses."
        description="Requirements are not identical everywhere. This is the general shape of the process, which your advisor adapts to your destination and institutions."
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Stages" title="Eight stages, in order" />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {applicationStages.map((stage, i) => (
              <Card key={stage.title}>
                <span className="text-sm font-extrabold text-blue-bright">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-bold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stage.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Documents"
              title="A general document checklist"
              description="Exact requirements depend on the institution and destination."
            />
            <div className="mt-8">
              <CheckList items={documentChecklist} />
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Timeline" title="An indicative timeline" />
            <ol className="mt-8 space-y-4">
              {[
                ["9–12 months before intake", "Planning, counselling and shortlisting"],
                ["6–9 months before", "Testing, documents and applications"],
                ["3–6 months before", "Offer review and acceptance"],
                ["1–3 months before", "Visa preparation and pre-departure"],
              ].map(([when, what]) => (
                <li key={when} className="rounded-lg border border-border bg-card px-5 py-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue">{when}</p>
                  <p className="mt-1 text-sm text-foreground">{what}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6">
              <Placeholder>
                Indicative only — actual timelines vary by destination and intake. [Content to be
                confirmed]
              </Placeholder>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Not sure where to begin?"
        description="Book a consultation and we will map the process to your own timeline."
      />
    </>
  );
}

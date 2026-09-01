import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/primitives";
import { EligibilityWizard } from "@/components/eligibility/EligibilityWizard";
import { ASSESSMENT_DISCLAIMER } from "@/lib/eligibility/eligibilityService";

export const Route = createFileRoute("/study-abroad/eligibility")({
  head: () => ({
    meta: [
      { title: "Study Abroad Eligibility Check | Unilink Nexus International" },
      {
        name: "description",
        content:
          "Answer a few questions about your education, goals and preferred destination to receive a preliminary study-abroad assessment in about three minutes.",
      },
      { property: "og:title", content: "Study Abroad Eligibility Check" },
      {
        property: "og:description",
        content: "A preliminary, personalised study-abroad assessment based on your academic profile.",
      },
      { property: "og:url", content: "/study-abroad/eligibility" },
    ],
    links: [{ rel: "canonical", href: "/study-abroad/eligibility" }],
  }),
  component: EligibilityPage,
});

function EligibilityPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Study Abroad", to: "/study-abroad" }, { label: "Check Your Eligibility" }]}
      />
      <section className="border-b border-border bg-surface">
        <div className="container-page py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="eyebrow">Preliminary assessment</p>
            <h1 className="text-h1 mt-3">Study Abroad Eligibility Check</h1>
            <p className="lead mt-4">
              Tell us about your academic background and study goals to receive a preliminary
              assessment.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <EligibilityWizard />
          <p className="mx-auto mt-12 max-w-3xl rounded-lg border border-dashed border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
            {ASSESSMENT_DISCLAIMER}
          </p>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Clock, Compass, Sparkles } from "lucide-react";
import { Breadcrumbs } from "@/components/site/primitives";
import { PathwayWizard } from "@/components/pathway/PathwayWizard";
import { PATHWAY_DISCLAIMER } from "@/lib/pathway/pathwayService";

export const metadata: Metadata = {
  title: "UniLink Pathway Advisor: Discover Your Future",
  description:
    "Explore your interests, strengths, subjects, career areas, degree pathways and study destinations with the UniLink Pathway Advisor. Takes about 3–5 minutes.",
  openGraph: {
    title: "UniLink Pathway Advisor: Discover your future",
    description:
      "Tell us what you enjoy and where you are in your studies, and explore pathways worth investigating.",
    type: "website",
    url: "/explore/pathway-advisor",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/explore/pathway-advisor",
  },
};

export default function PathwayAdvisorPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Explore", to: "/explore" }, { label: "Pathway Advisor" }]} />

      <section className="border-b border-border bg-linear-to-b from-surface to-background">
        <div className="container-page py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="eyebrow">UniLink Pathway Advisor</p>
            <h1 className="text-h1 mt-3">Discover your future.</h1>
            <p className="lead mt-4">
              Tell us about what you enjoy, what you&apos;re good at, where you are in your studies
              and what kind of future you&apos;re considering. We&apos;ll help you explore possible
              pathways.
            </p>
            <p className="mt-4 text-sm font-semibold text-navy">
              You don&apos;t need to know exactly what you want to become yet.
            </p>
            <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              {[
                { icon: Clock, text: "Takes approximately 3–5 minutes" },
                { icon: Compass, text: "Exploration, not eligibility scoring" },
                { icon: Sparkles, text: "Reviewed by a human adviser when you're ready" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-sm font-medium text-navy">
                  <Icon className="size-4 text-green" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <PathwayWizard />
          <p className="mx-auto mt-12 max-w-3xl rounded-lg border border-dashed border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
            {PATHWAY_DISCLAIMER}
          </p>
        </div>
      </section>
    </>
  );
}

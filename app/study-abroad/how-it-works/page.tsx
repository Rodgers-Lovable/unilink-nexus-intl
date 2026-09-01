import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  PageHero,
  SectionHeading,
  Placeholder,
  CTABanner,
} from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { howItWorksStages } from "@/data/site";

export const metadata: Metadata = {
  title: "How Studying Abroad Works | UniLink Nexus International",
  description:
    "A step-by-step view of the international study process (from first conversation to arrival) so you know what happens, when, and what is expected of you.",
  openGraph: {
    title: "How Studying Abroad Works",
    description: "The international study process, stage by stage.",
    type: "website",
    url: "/study-abroad/how-it-works",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/study-abroad/how-it-works",
  },
};

export default function StudyAbroadHowItWorksPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ label: "Study Abroad", to: "/study-abroad" }, { label: "How It Works" }]}
      />
      <PageHero
        image="study-abroad"
        eyebrow="Study Abroad"
        title="What the process actually looks like"
        description="Studying abroad is a sequence of manageable steps, not one large decision. Here is the order in which they usually happen."
      >
        <Button asChild variant="cta" size="lg">
          <Link href="/explore/pathway-advisor">Discover My Pathway</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/study-abroad/application-process">Application Process</Link>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Step by step" title="From first question to first week" />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {howItWorksStages.map((stage, i) => (
              <li key={stage.title}>
                <Card className="h-full">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-extrabold text-blue-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-bold">{stage.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {stage.description}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Timelines and requirements differ by destination, institution and intake. UniLink
              provides advisory guidance only and does not guarantee admission or visa outcomes.
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

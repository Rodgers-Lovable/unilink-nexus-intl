import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageHero, SectionHeading, CTABanner } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { JourneyStages } from "@/components/site/JourneyStages";

const principles = [
  {
    title: "We start where you are",
    body: "There is no assumption that you already know your course, career or country. Uncertainty is a normal starting point.",
  },
  {
    title: "Guidance before decisions",
    body: "Understanding options comes first. Applications, destinations and deadlines follow once the direction makes sense.",
  },
  {
    title: "No pressure, no promises",
    body: "UniLink offers advisory guidance. We do not guarantee admission, scholarships or visa outcomes.",
  },
  {
    title: "Families and schools included",
    body: "Decisions rarely happen alone. Parents and schools are part of the same conversation.",
  },
];

export const metadata: Metadata = {
  title: "How UniLink Works | UniLink Nexus International",
  description:
    "Discover, Explore, Plan, Prepare, Connect: how UniLink Nexus guides students from early uncertainty to a clear, realistic education pathway.",
  openGraph: {
    title: "How UniLink Works",
    description: "The five stages behind UniLink's student pathway advisory approach.",
    type: "website",
    url: "/explore/how-it-works",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/explore/how-it-works",
  },
};

export default function ExploreHowItWorksPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Explore", to: "/explore" }, { label: "How It Works" }]} />
      <PageHero
        image="explore"
        eyebrow="How It Works"
        title="Where you are, where you could go, how to get there."
        description="UniLink Nexus is a student pathway and international education advisory service. Guidance follows five stages, and you can join at whichever one fits you today."
      >
        <Button asChild variant="cta" size="lg">
          <Link href="/explore/pathway-advisor">Discover My Pathway</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/book-consultation">Talk to an Advisor</Link>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="The UniLink framework"
            title="Five stages, one direction"
            align="center"
          />
          <div className="mt-12">
            <JourneyStages />
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="How we work" title="Principles behind the guidance" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {principles.map((p) => (
              <Card key={p.title} className="h-full">
                <h3 className="text-base font-bold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

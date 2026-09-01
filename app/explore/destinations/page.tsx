import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageHero, SectionHeading, Placeholder, CTABanner } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { DestinationCard } from "@/components/site/cards";
import { destinations } from "@/data/destinations";

const lenses = [
  {
    title: "Language",
    description:
      "Teaching language shapes daily life as much as study. English, French and bilingual options all exist.",
  },
  {
    title: "Budget considerations",
    description:
      "Total cost varies widely between and within countries. Plan in ranges rather than exact figures.",
  },
  {
    title: "Distance",
    description:
      "Some students prefer to stay closer to East Africa; others are open to a long-distance move.",
  },
  {
    title: "Study environment",
    description: "Class sizes, teaching style and degree structure differ noticeably by country.",
  },
  {
    title: "International orientation",
    description: "Some destinations are built around international students; others less so.",
  },
];

export const metadata: Metadata = {
  title: "Destination Explorer | UniLink Nexus International",
  description:
    "Explore study destinations through language, budget, distance, study environment and international orientation — high-level guidance, not a university database.",
  openGraph: {
    title: "Destination Explorer",
    description: "Compare study destinations on the criteria that actually affect your experience.",
    type: "website",
    url: "/explore/destinations",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/explore/destinations",
  },
};

export default function DestinationExplorerPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Explore", to: "/explore" }, { label: "Destination Explorer" }]} />
      <PageHero
        image="destinations"
        eyebrow="Destination Explorer"
        title="Compare places, not reputations."
        description="A destination is a study environment, a language, a cost and a distance. Explore each of those before narrowing your list."
      >
        <Button asChild variant="cta" size="lg">
          <Link href="/explore/pathway-advisor">Discover My Pathway</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/destinations">View all destinations</Link>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Five lenses"
            title="How to compare a destination"
            description="Score each option against your own priorities rather than a general ranking."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lenses.map((lens) => (
              <Card key={lens.title} className="h-full">
                <h3 className="text-base font-bold">{lens.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {lens.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="Destinations" title="Start with these" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(0, 3).map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Destination content is high-level guidance until verified. Costs, requirements and
              visa details must be confirmed from official sources. UniLink does not claim to
              represent institutions in these destinations. [Content to be confirmed]
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Compass, GraduationCap, Map, Route as RouteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading, CTABanner } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { JourneyStages } from "@/components/site/JourneyStages";

const exploreCards = [
  {
    title: "Discover Your Pathway",
    description:
      "Answer a few questions about your interests, strengths and studies, and see directions worth exploring.",
    to: "/explore/pathway-advisor" as const,
    cta: "Discover My Pathway",
    icon: Compass,
  },
  {
    title: "Career & Subject Guidance",
    description:
      "Understand how the subjects you enjoy connect to careers and to the degrees that lead there.",
    to: "/explore/career-subject-guidance" as const,
    cta: "Explore Careers & Subjects",
    icon: GraduationCap,
  },
  {
    title: "Destination Explorer",
    description: "Compare study destinations on language, budget, distance and study environment.",
    to: "/explore/destinations" as const,
    cta: "Explore Destinations",
    icon: Map,
  },
  {
    title: "How It Works",
    description: "See how the UniLink journey moves from discovery to a practical education plan.",
    to: "/explore/how-it-works" as const,
    cta: "See How It Works",
    icon: RouteIcon,
  },
];

export const metadata: Metadata = {
  title: "Explore Your Options | UniLink Nexus International",
  description:
    "Explore interests, subjects, careers, degree pathways and study destinations. Start where you are — you don't need a decided plan.",
  openGraph: {
    title: "Explore your options with UniLink",
    description: "Interests, subjects, careers, degrees and destinations — explored in one place.",
    type: "website",
    url: "/explore",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/explore",
  },
};

export default function ExplorePage() {
  return (
    <>
      <PageHero
        image="explore"
        eyebrow="Explore"
        title="Start with what you know today."
        description="You do not need a finished plan. Explore your interests, the subjects you enjoy, the careers they connect to and the places you could study."
      >
        <Button asChild variant="cta" size="lg">
          <Link href="/explore/pathway-advisor">Discover My Pathway</Link>
        </Button>
        <Button asChild variant="navy" size="lg">
          <Link href="/book-consultation">Talk to an Advisor</Link>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Ways to explore"
            title="Four ways to move forward"
            description="Each one works on its own. Together they build a clearer picture."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {exploreCards.map(({ icon: Icon, ...card }) => (
              <Card key={card.title} className="flex h-full flex-col">
                <span className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-blue/8 text-blue">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-bold">{card.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <div className="mt-5">
                  <Link href={card.to} className="text-sm font-semibold text-blue hover:underline">
                    {card.cta} →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="The UniLink journey"
            title="Discover, Explore, Plan, Prepare, Connect"
            align="center"
          />
          <div className="mt-12">
            <JourneyStages />
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

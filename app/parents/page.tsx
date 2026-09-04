import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading, Placeholder, CTABanner } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { parentTopics, parentQuestions } from "@/data/programmes";

export const metadata: Metadata = {
  title: "For Parents | UniLink Nexus International",
  description:
    "Clear, pressure-free guidance for parents supporting a student's education decisions: pathways, timelines, costs and how to help without deciding for them.",
  openGraph: {
    title: "For Parents: Supporting Your Child's Pathway",
    description: "Understand education pathways, timelines and the decisions that actually matter.",
    type: "website",
    url: "/parents",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/parents",
  },
};

export default function ParentsPage() {
  return (
    <>
      <PageHero
        image="parents"
        eyebrow="For Parents"
        title="Support the decision without making it for them"
        description="Parents carry much of the worry and most of the cost. UniLink gives you a clear view of the pathways available, what they require and how the timeline works."
      >
        <Button asChild variant="cta" size="lg">
          <Link href="/book-consultation">Book a Family Consultation</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/explore/how-it-works">How UniLink Works</Link>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="What we cover" title="The areas parents ask about most" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {parentTopics.map((topic) => (
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
        <div className="container-page">
          <SectionHeading
            eyebrow="Common questions"
            title="Questions worth asking early"
            description="Bring these to a consultation. They usually shape the plan more than the choice of country."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {parentQuestions.map((q) => (
              <li key={q}>
                <Card className="h-full">
                  <p className="text-sm font-semibold leading-relaxed text-navy">{q}</p>
                </Card>
              </li>
            ))}
          </ul>
          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Costs, timelines and requirements vary by destination and institution. UniLink offers
              advisory guidance and does not guarantee admission, scholarships or visa outcomes.
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner
        title="Talk it through as a family"
        description="A consultation covers the pathway, the timeline and the realistic options, with everyone in the room."
      />
    </>
  );
}

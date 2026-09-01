import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageHero, SectionHeading, Card, CTABanner } from "@/components/site/primitives";
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

export const Route = createFileRoute("/explore/how-it-works")({
  head: () => ({
    meta: [
      { title: "How UniLink Works | UniLink Nexus International" },
      {
        name: "description",
        content:
          "Discover, Explore, Plan, Prepare, Connect — how UniLink Nexus guides students from early uncertainty to a clear, realistic education pathway.",
      },
      { property: "og:title", content: "How UniLink Works" },
      {
        property: "og:description",
        content: "The five stages behind UniLink's student pathway advisory approach.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/explore/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "/explore/how-it-works" }],
  }),
  component: ExploreHowItWorksPage,
});

function ExploreHowItWorksPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Explore", to: "/explore" }, { label: "How It Works" }]} />
      <PageHero
        eyebrow="How It Works"
        title="Where you are, where you could go, how to get there."
        description="UniLink Nexus is a student pathway and international education advisory service. Guidance follows five stages, and you can join at whichever one fits you today."
      >
        <Button asChild variant="cta" size="lg">
          <Link to="/explore/pathway-advisor">Discover My Pathway</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/book-consultation">Talk to an Advisor</Link>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="The UniLink journey" title="Five stages, one direction" align="center" />
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

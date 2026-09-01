import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, CTABanner, SectionHeading, Card, Placeholder } from "@/components/site/primitives";
import { whyUnilink } from "@/data/site";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Unilink Nexus International" },
      {
        name: "description",
        content:
          "Unilink Nexus International provides personalised study abroad guidance — your link to global opportunities.",
      },
      { property: "og:title", content: "About Unilink Nexus International" },
      {
        property: "og:description",
        content: "Personalised international education guidance, from first questions to departure.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHero image="about"
        eyebrow="About us"
        title="Your link to global opportunities"
        description="Unilink Nexus International exists to make international education decisions clearer, calmer and more personal."
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Who we are" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Unilink Nexus International is an international education consultancy supporting
              students who want to study abroad. We combine structured guidance with a genuinely
              personal approach — your goals, qualifications and circumstances shape every
              recommendation.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              [Company background, founding year and registration details to be confirmed]
            </p>
          </div>
          <div>
            <SectionHeading title="Our mission" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              To connect ambitious students with the international study opportunities that fit
              them — not just the ones that are popular — and to support them honestly at every
              stage from planning to departure.
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading title="Why students choose Unilink" align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUnilink.map((w) => (
              <Card key={w.title}>
                <h3 className="font-bold text-navy">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading title="Our approach" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Discover, Explore, Plan, Prepare, Connect — the framework behind every conversation.
            </p>
            <Button asChild variant="navy" className="mt-6">
              <Link to="/about/approach">Read Our Approach</Link>
            </Button>
          </div>
          <div>
            <SectionHeading title="Student outcomes" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Read stories showing how guidance turns into real study plans.
            </p>
            <Button asChild variant="outline" className="mt-6">
              <Link to="/success-stories">View Success Stories</Link>
            </Button>
          </div>
        </div>
        <div className="container-page mt-8 max-w-2xl">
          <Placeholder>
            Company registration details, affiliations and statistics are pending confirmation.
          </Placeholder>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

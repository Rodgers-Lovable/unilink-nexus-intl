import { createFileRoute } from "@tanstack/react-router";
import {
  Breadcrumbs,
  PageHero,
  SectionHeading,
  Card,
  Placeholder,
  CTABanner,
} from "@/components/site/primitives";
import { JourneyStages } from "@/components/site/JourneyStages";
import { whyUnilink } from "@/data/site";

export const Route = createFileRoute("/about/approach")({
  head: () => ({
    meta: [
      { title: "Our Approach | UniLink Nexus International" },
      {
        name: "description",
        content:
          "UniLink's advisory approach: help students understand where they are, where they could go, and how to get there — through Discover, Explore, Plan, Prepare, Connect.",
      },
      { property: "og:title", content: "Our Approach" },
      {
        property: "og:description",
        content: "The philosophy behind UniLink's student pathway advisory service.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/about/approach" },
    ],
    links: [{ rel: "canonical", href: "/about/approach" }],
  }),
  component: ApproachPage,
});

function ApproachPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About", to: "/about" }, { label: "Our Approach" }]} />
      <PageHero
        eyebrow="Our Approach"
        title="Help students understand where they are, where they could go, and how to get there."
        description="That sentence is the whole method. Everything on this site — the advisor tool, the guidance pages, the consultations — exists to answer one of those three questions."
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Framework" title="Discover, Explore, Plan, Prepare, Connect" align="center" />
          <div className="mt-12">
            <JourneyStages />
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="What guides us" title="Principles we hold to" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyUnilink.map((item) => (
              <Card key={item.title} className="h-full">
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-10 max-w-2xl">
            <Placeholder>
              UniLink Nexus International is an education advisory service. Guidance is informational
              and does not guarantee admission, scholarships or visa outcomes.
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

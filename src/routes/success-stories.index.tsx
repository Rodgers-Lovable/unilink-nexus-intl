import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner, Placeholder } from "@/components/site/primitives";
import { StoryCard } from "@/components/site/cards";
import { successStories } from "@/data/site";

export const Route = createFileRoute("/success-stories/")({
  head: () => ({
    meta: [
      { title: "Student Success Stories | Unilink Nexus" },
      {
        name: "description",
        content:
          "See how Unilink Nexus International has supported students on their journey to studying abroad.",
      },
      { property: "og:title", content: "Student Success Stories" },
      {
        property: "og:description",
        content: "How guidance turns into real study plans and successful departures.",
      },
      { property: "og:url", content: "/success-stories" },
    ],
    links: [{ rel: "canonical", href: "/success-stories" }],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Success stories"
        title="From first questions to first lectures"
        description="Sample stories showing how structured guidance turns into real study plans."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {successStories.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Stories shown are sample placeholders and must be replaced with verified, consented
              student testimonials before publication. [Content to be confirmed]
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

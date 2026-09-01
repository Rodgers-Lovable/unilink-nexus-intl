import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, Breadcrumbs, CTABanner } from "@/components/site/primitives";
import { howItWorksStages } from "@/data/site";

export const Route = createFileRoute("/study-abroad/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Study Abroad Process | Unilink Nexus" },
      {
        name: "description",
        content:
          "A seven-stage view of the Unilink Nexus study-abroad process, from your first conversation to arriving at your institution.",
      },
      { property: "og:title", content: "How It Works — Study Abroad Process" },
      {
        property: "og:description",
        content: "From first conversation to arrival: the stages of a supported study-abroad journey.",
      },
      { property: "og:url", content: "/study-abroad/how-it-works" },
    ],
    links: [{ rel: "canonical", href: "/study-abroad/how-it-works" }],
  }),
  component: HowItWorks,
});

function HowItWorks() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Study Abroad", to: "/study-abroad" }, { label: "How It Works" }]} />
      <PageHero
        eyebrow="How It Works"
        title="A clear path from first question to first day."
        description="Each stage builds on the last, so nothing important is left until it is too late."
      />

      <section className="section-y">
        <div className="container-page max-w-3xl">
          <ol className="relative space-y-10 border-l border-border pl-8">
            {howItWorksStages.map((stage, i) => (
              <li key={stage.title} className="relative">
                <span className="absolute -left-[41px] flex size-8 items-center justify-center rounded-full border border-border bg-card text-xs font-extrabold text-blue">
                  {i + 1}
                </span>
                <h2 className="text-h3">{stage.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {stage.description}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-14 rounded-xl border border-border bg-surface p-8 text-center">
            <h2 className="text-h3">Start with a free consultation</h2>
            <p className="lead mt-3">
              A first conversation costs nothing and gives you a realistic view of your options.
            </p>
            <Button asChild variant="cta" size="lg" className="mt-6">
              <Link to="/book-consultation">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

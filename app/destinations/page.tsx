import type { Metadata } from "next";
import { PageHero, CTABanner, Placeholder } from "@/components/site/primitives";
import { DestinationCard } from "@/components/site/cards";
import { destinations } from "@/data/destinations";

export const metadata: Metadata = {
  title: "Study Destinations | Unilink Nexus International",
  description:
    "Compare popular international study destinations on study levels, intakes and what makes each environment different, and find one that suits your goals.",
  openGraph: {
    title: "Explore Study Destinations",
    description: "Compare international study destinations and discover which may suit your goals.",
    url: "/destinations",
  },
  alternates: {
    canonical: "/destinations",
  },
};

export default function DestinationsPage() {
  const flagship = destinations.filter((d) => d.tier === "flagship");
  const legacy = destinations.filter((d) => d.tier === "legacy");

  return (
    <>
      <PageHero
        image="destinations"
        eyebrow="Destinations"
        title="Explore study destinations"
        description="Compare popular international study destinations and discover which environment may suit your goals."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {flagship.map((d) => (
              <DestinationCard key={d.slug} destination={d} detailed />
            ))}
          </div>

          {legacy.length > 0 && (
            <div className="mt-14">
              <h2 className="text-h3">Also available</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                We can still advise on these destinations if they fit your plans.
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {legacy.map((d) => (
                  <DestinationCard key={d.slug} destination={d} detailed />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Figures above are indicative and can shift with the institution, programme and
              exchange rate. Your adviser will confirm current costs, requirements and visa details
              for the destination you choose.
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

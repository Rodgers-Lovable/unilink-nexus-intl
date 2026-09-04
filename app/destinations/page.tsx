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
            {destinations.map((d) => (
              <DestinationCard key={d.slug} destination={d} detailed />
            ))}
          </div>
          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Destination content is editable placeholder material. Supported destinations, costs,
              requirements and visa details must be verified before publication. [Content to be
              confirmed]
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

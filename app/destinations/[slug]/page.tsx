import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  CheckList,
  Placeholder,
  SectionHeading,
  TextLink,
} from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { destinationImages } from "@/components/site/cards";
import { destinations, getDestination } from "@/data/destinations";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: "Destination unavailable", robots: { index: false } };

  return {
    title: `Study in ${destination.name} | Unilink Nexus International`,
    description: destination.intro,
    openGraph: {
      title: `Study in ${destination.name}`,
      description: destination.intro,
      url: `/destinations/${slug}`,
    },
    alternates: {
      canonical: `/destinations/${slug}`,
    },
  };
}

export default async function DestinationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const img = destinationImages[destination.slug];

  return (
    <>
      <Breadcrumbs
        items={[{ label: "Destinations", to: "/destinations" }, { label: destination.name }]}
      />

      <section className="border-b border-border bg-surface">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="eyebrow">{destination.region}</p>
            <h1 className="text-h1 mt-3">Study in {destination.name}</h1>
            <p className="lead mt-4">{destination.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="lg">
                <Link href="/book-consultation">Book Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/explore/pathway-advisor">Discover My Pathway</Link>
              </Button>
            </div>
          </div>
          {img && (
            <Image
              src={img}
              alt={`${destination.name} campus environment`}
              className="w-full rounded-2xl border border-border object-cover shadow-card"
            />
          )}
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <div>
              <h2 className="text-h3">Country overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {destination.overview}
              </p>
            </div>
            <div>
              <h2 className="text-h3">Why study here?</h2>
              <div className="mt-4">
                <CheckList items={destination.whyStudy} />
              </div>
            </div>
            <div>
              <h2 className="text-h3">Education system</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {destination.educationSystem}
              </p>
            </div>
            <div>
              <h2 className="text-h3">Entry requirements overview</h2>
              <div className="mt-4">
                <CheckList items={destination.entryRequirements} />
              </div>
              <div className="mt-4">
                <Placeholder>
                  Entry requirements differ by institution and programme and must be verified
                  individually.
                </Placeholder>
              </div>
            </div>
            <div>
              <h2 className="text-h3">Student visa overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {destination.visaOverview}
              </p>
            </div>
            <div>
              <h2 className="text-h3">Student life</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {destination.studentLife}
              </p>
            </div>
            <div>
              <h2 className="text-h3">How Unilink can help</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Guidance is matched to this destination&apos;s process, from shortlisting
                institutions in {destination.name} to preparing documents and planning your
                departure.
              </p>
              <p className="mt-4">
                <TextLink to="/services">See how we help</TextLink>
              </p>
            </div>
            <div>
              <h2 className="text-h3">FAQs</h2>
              <div className="mt-4">
                <FaqAccordion items={destination.faqs} />
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <Card>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-navy">
                Popular study areas
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {destination.popularAreas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-navy">
                Typical study levels
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {destination.studyLevels.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-navy">Intakes</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {destination.intakes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-navy">
                Estimated costs
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">{destination.costsPlaceholder}</p>
            </Card>
          </aside>
        </div>
      </section>

      <section className="section-y bg-navy">
        <div className="container-page text-center">
          <SectionHeading
            title={`Interested in studying in ${destination.name}?`}
            align="center"
            className="[&_h2]:text-white"
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="cta" size="lg">
              <Link href="/book-consultation">Book Consultation</Link>
            </Button>
            <Button asChild variant="onNavy" size="lg">
              <Link href="/explore/pathway-advisor">Discover My Pathway</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

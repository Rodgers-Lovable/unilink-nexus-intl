import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Breadcrumbs,
  Card,
  CheckList,
  Placeholder,
  SectionHeading,
} from "@/components/site/primitives";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { destinationImages } from "@/components/site/cards";
import { getDestination } from "@/data/destinations";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const destination = getDestination(params.slug);
    if (!destination) throw notFound();
    return { destination };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Destination unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { destination } = loaderData;
    const title = `Study in ${destination.name} | Unilink Nexus International`;
    return {
      meta: [
        { title },
        { name: "description", content: destination.intro },
        { property: "og:title", content: `Study in ${destination.name}` },
        { property: "og:description", content: destination.intro },
        { property: "og:url", content: `/destinations/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/destinations/${params.slug}` }],
    };
  },
  notFoundComponent: DestinationNotFound,
  component: DestinationDetail,
});

function DestinationNotFound() {
  return (
    <div className="container-page section-y text-center">
      <h1 className="text-h2">Destination not found</h1>
      <p className="lead mt-3">This destination is not available.</p>
      <Button asChild variant="cta" className="mt-6">
        <Link to="/destinations">Back to destinations</Link>
      </Button>
    </div>
  );
}

function DestinationDetail() {
  const { destination } = Route.useLoaderData();
  const img = destinationImages[destination.slug];

  return (
    <>
      <Breadcrumbs items={[{ label: "Destinations", to: "/destinations" }, { label: destination.name }]} />

      <section className="border-b border-border bg-surface">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="eyebrow">{destination.region}</p>
            <h1 className="text-h1 mt-3">Study in {destination.name}</h1>
            <p className="lead mt-4">{destination.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="cta" size="lg">
                <Link to="/book-consultation">Book Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/study-abroad/eligibility">Check Eligibility</Link>
              </Button>
            </div>
          </div>
          {img && (
            <img
              src={img}
              alt={`${destination.name} campus environment`}
              loading="lazy"
              width={900}
              height={600}
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
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{destination.overview}</p>
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
                  individually. [Content to be confirmed]
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
                From shortlisting institutions in {destination.name} to preparing documents and
                planning your departure, guidance is matched to this destination's process.
              </p>
              <p className="mt-4">
                <Link to="/services" className="text-sm font-semibold text-blue hover:underline">
                  See how we help →
                </Link>
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
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-navy">Popular study areas</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {destination.popularAreas.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </Card>
            <Card>
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-navy">Typical study levels</h2>
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
              <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-navy">Estimated costs</h2>
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
              <Link to="/book-consultation">Book Consultation</Link>
            </Button>
            <Button asChild variant="onNavy" size="lg">
              <Link to="/study-abroad/eligibility">Check Eligibility</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

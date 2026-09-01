import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, CTABanner, CheckList, PageHero } from "@/components/site/primitives";
import { ServiceCard, serviceIcons } from "@/components/site/cards";
import { getService, services } from "@/data/services";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.title} | Unilink Nexus International` },
        { name: "description", content: service.short },
        { property: "og:title", content: service.title },
        { property: "og:description", content: service.short },
        { property: "og:url", content: `/services/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/services/${params.slug}` }],
    };
  },
  notFoundComponent: () => (
    <div className="container-page section-y text-center">
      <h1 className="text-h2">Service not found</h1>
      <Button asChild variant="cta" className="mt-6">
        <Link to="/services">Back to services</Link>
      </Button>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  const Icon = serviceIcons[service.icon];
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Breadcrumbs items={[{ label: "How We Help", to: "/services" }, { label: service.title }]} />
      <PageHero eyebrow="Service" title={service.title} description={service.intro}>
        {service.slug === "application-support" ? (
          <>
            <Button asChild variant="cta" size="lg">
              <Link to="/apply">Start My Application</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/book-consultation">Book a Consultation</Link>
            </Button>
          </>
        ) : (
          <Button asChild variant="cta" size="lg">
            <Link to="/book-consultation">Book a Consultation</Link>
          </Button>
        )}
      </PageHero>

      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-blue/8 text-blue">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h2 className="text-h3">What you can expect</h2>
            <div className="mt-5">
              <CheckList items={service.expect} />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
            <h2 className="text-h3">Where this fits</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              This service works alongside the rest of the process. Most students combine it with
              counselling and application support.
            </p>
            <p className="mt-5">
              <Link to="/study-abroad/how-it-works" className="text-sm font-semibold text-blue hover:underline">
                See how the process works →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page">
          <h2 className="text-h3">Other ways we help</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

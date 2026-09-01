import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, CTABanner, CheckList, PageHero } from "@/components/site/primitives";
import { ServiceCard, serviceIcons } from "@/components/site/cards";
import { getService, services } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service unavailable", robots: { index: false } };

  return {
    title: `${service.title} | Unilink Nexus International`,
    description: service.short,
    openGraph: {
      title: service.title,
      description: service.short,
      url: `/services/${slug}`,
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon];
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Breadcrumbs items={[{ label: "How We Help", to: "/services" }, { label: service.title }]} />
      <PageHero
        image="counselling"
        eyebrow="Service"
        title={service.title}
        description={service.intro}
      >
        {service.slug === "application-support" ? (
          <>
            <Button asChild variant="cta" size="lg">
              <Link href="/apply">Start My Application</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/book-consultation">Book a Consultation</Link>
            </Button>
          </>
        ) : (
          <Button asChild variant="cta" size="lg">
            <Link href="/book-consultation">Book a Consultation</Link>
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
              <Link
                href="/study-abroad/how-it-works"
                className="text-sm font-semibold text-blue hover:underline"
              >
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

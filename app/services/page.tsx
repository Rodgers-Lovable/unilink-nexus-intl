import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero, CTABanner, CheckList } from "@/components/site/primitives";
import { serviceIcons } from "@/components/site/cards";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "How We Help: Study Abroad Services | Unilink Nexus",
  description:
    "Counselling, course and university selection, application support, visa guidance and pre-departure support for international students.",
  openGraph: {
    title: "How We Help: Study Abroad Services",
    description: "Support for every stage of studying abroad, from counselling to departure.",
    url: "/services",
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="counselling"
        eyebrow="How We Help"
        title="Support for every stage of studying abroad."
        description="Five services that cover the full path from your first questions to your first week abroad."
      >
        <Button asChild variant="cta" size="lg">
          <Link href="/book-consultation">Book a Consultation</Link>
        </Button>
      </PageHero>

      {services.map((service, i) => {
        const Icon = serviceIcons[service.icon];
        return (
          <section
            key={service.slug}
            className={i % 2 === 1 ? "section-y bg-surface" : "section-y"}
          >
            <div className="container-page grid gap-10 lg:grid-cols-2">
              <div>
                <span className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-blue/8 text-blue">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="text-h2">{service.title}</h2>
                <p className="lead mt-4">{service.intro}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild variant="navy">
                    <Link href={`/services/${service.slug}`}>Learn more</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/book-consultation">Talk to an Advisor</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8">
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-navy">
                  What you can expect
                </h3>
                <div className="mt-5">
                  <CheckList items={service.expect} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <CTABanner />
    </>
  );
}

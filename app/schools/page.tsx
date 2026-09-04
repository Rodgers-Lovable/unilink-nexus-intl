import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PageHero,
  SectionHeading,
  CheckList,
  Placeholder,
  CTABanner,
} from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { schoolProgrammeFormats, schoolOutcomes } from "@/data/programmes";

export const metadata: Metadata = {
  title: "For Schools | UniLink Nexus International",
  description:
    "Career guidance, pathway planning and international education sessions delivered to schools: workshops, parent evenings and adviser-led programmes.",
  openGraph: {
    title: "For Schools: Career & Pathway Programmes",
    description: "Bring structured career and pathway guidance to your students.",
    type: "website",
    url: "/schools",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/schools",
  },
};

export default function SchoolsPage() {
  return (
    <>
      <PageHero
        image="schools"
        eyebrow="For Schools"
        title="Career guidance your students can act on"
        description="UniLink works with schools to deliver structured career, subject and pathway guidance in formats that fit a school calendar."
      >
        <Button asChild variant="cta" size="lg">
          <Link href="/contact">Enquire About Programmes</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/explore/how-it-works">How UniLink Works</Link>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Formats" title="Ways we work with schools" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {schoolProgrammeFormats.map((format) => (
              <Card key={format.title} className="h-full">
                <h3 className="text-base font-bold">{format.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {format.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Outcomes" title="What schools can expect" />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Programmes are advisory and educational. They are designed to support your existing
              guidance staff, not to replace them.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <CheckList items={schoolOutcomes} />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page max-w-2xl">
          <Placeholder>
            Programme formats, durations and fees are agreed with each school individually.
          </Placeholder>
        </div>
      </section>

      <CTABanner
        title="Bring UniLink to your school"
        description="Tell us your year groups, timing and goals, and we will propose a format that fits."
      />
    </>
  );
}

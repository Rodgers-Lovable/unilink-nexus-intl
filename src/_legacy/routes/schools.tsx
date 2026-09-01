import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  PageHero,
  SectionHeading,
  Card,
  CheckList,
  Placeholder,
  CTABanner,
} from "@/components/site/primitives";
import { schoolProgrammeFormats, schoolOutcomes } from "@/data/programmes";

export const Route = createFileRoute("/schools")({
  head: () => ({
    meta: [
      { title: "For Schools | UniLink Nexus International" },
      {
        name: "description",
        content:
          "Career guidance, pathway planning and international education sessions delivered to schools — workshops, parent evenings and adviser-led programmes.",
      },
      { property: "og:title", content: "For Schools — Career & Pathway Programmes" },
      {
        property: "og:description",
        content: "Bring structured career and pathway guidance to your students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/schools" },
    ],
    links: [{ rel: "canonical", href: "/schools" }],
  }),
  component: SchoolsPage,
});

function SchoolsPage() {
  return (
    <>
      <PageHero image="schools"
        eyebrow="For Schools"
        title="Career guidance your students can act on"
        description="UniLink works with schools to deliver structured career, subject and pathway guidance — in formats that fit a school calendar."
      >
        <Button asChild variant="cta" size="lg">
          <Link to="/contact">Enquire About Programmes</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/explore/how-it-works">How UniLink Works</Link>
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading, Card, CTABanner, CheckList } from "@/components/site/primitives";
import { ServiceCard } from "@/components/site/cards";
import { services } from "@/data/services";
import { destinations } from "@/data/destinations";

export const Route = createFileRoute("/study-abroad/")({
  head: () => ({
    meta: [
      { title: "Study Abroad — Plan Your Journey | Unilink Nexus International" },
      {
        name: "description",
        content:
          "Understand destinations, study levels, entry requirements, finances, timelines and visa preparation before you apply to study abroad.",
      },
      { property: "og:title", content: "Study Abroad — Plan Your Journey" },
      {
        property: "og:description",
        content: "A structured overview of the study-abroad process, from planning to departure.",
      },
      { property: "og:url", content: "/study-abroad" },
    ],
    links: [{ rel: "canonical", href: "/study-abroad" }],
  }),
  component: StudyAbroad,
});

const blocks = [
  {
    title: "Why Study Abroad",
    body: "Studying internationally can broaden your academic options, expose you to different teaching approaches and expand your professional network. The value depends on choosing a pathway that fits your goals.",
  },
  {
    title: "Choosing the Right Destination",
    body: "Compare destinations on entry requirements, language expectations, intake timing and total cost rather than reputation alone.",
  },
  {
    title: "Choosing the Right Study Level",
    body: "Your highest completed qualification usually determines which levels you can enter directly, and where a pathway or bridging option may be needed.",
  },
  {
    title: "Understanding Entry Requirements",
    body: "Requirements are set by each institution and programme. Two universities in the same country can assess the same profile differently. [Content to be confirmed]",
  },
  {
    title: "Planning Your Finances",
    body: "Plan in ranges covering tuition, accommodation, transport, insurance and living costs. Figures vary by city and institution. [Content to be confirmed]",
  },
  {
    title: "Application Timelines",
    body: "Work backwards from your intended intake. Testing, documents and processing all need time before submission deadlines.",
  },
  {
    title: "Visa Preparation",
    body: "Student visa processes differ by country and change over time. Requirements should always be verified against official government sources. [Content to be confirmed]",
  },
];

function StudyAbroad() {
  return (
    <>
      <PageHero
        eyebrow="Study Abroad"
        title="Study abroad with a plan that fits you."
        description="A clear view of what the process involves, so you can make decisions with context instead of guesswork."
      >
        <Button asChild variant="cta" size="lg">
          <Link to="/study-abroad/eligibility">Check My Eligibility</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/study-abroad/how-it-works">See How It Works</Link>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="The essentials" title="What to understand before you apply" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blocks.map((b) => (
              <Card key={b.title}>
                <h3 className="text-base font-bold">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Destinations"
              title="Popular destinations to compare"
              description="Supported destinations will be confirmed. These are shown as editable placeholders."
            />
            <ul className="mt-8 space-y-2">
              {destinations.map((d) => (
                <li key={d.slug}>
                  <Link
                    to="/destinations/$slug"
                    params={{ slug: d.slug }}
                    className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-blue/40 hover:text-blue"
                  >
                    {d.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Support" title="How Unilink supports you" />
            <div className="mt-8">
              <CheckList
                items={[
                  "A structured review of your academic profile",
                  "Destination and programme comparison against your goals",
                  "Document preparation and application review",
                  "Guidance through visa preparation and pre-departure planning",
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Services" title="Where guidance makes the difference" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

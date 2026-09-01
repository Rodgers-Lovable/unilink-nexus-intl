import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, CTABanner, Card, TextLink } from "@/components/site/primitives";
import { DestinationCard, ServiceCard, ArticleCard, StoryCard } from "@/components/site/cards";
import { destinations } from "@/data/destinations";
import { services } from "@/data/services";
import { resources } from "@/data/resources";
import { journeySteps, whyUnilink, successStories } from "@/data/site";
import heroImg from "@/assets/hero-network.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unilink Nexus International — Your Link to Global Opportunities" },
      {
        name: "description",
        content:
          "Personalised study-abroad guidance. Explore international destinations, check your eligibility in about three minutes and plan your journey with Unilink Nexus.",
      },
      { property: "og:title", content: "Unilink Nexus International — Study Abroad Guidance" },
      {
        property: "og:description",
        content:
          "Explore destinations, check your eligibility and get personalised guidance for your international education journey.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-surface to-background">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div className="reveal">
            <p className="eyebrow">International Education Guidance</p>
            <h1 className="text-hero mt-4">Your future can take you anywhere.</h1>
            <p className="lead mt-6 max-w-xl">
              Personalised guidance to help you explore the right destination, understand your
              options, and confidently pursue your study-abroad journey.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
                <Link to="/study-abroad/eligibility">Check My Eligibility</Link>
              </Button>
              <Button asChild variant="navy" size="lg" className="w-full sm:w-auto">
                <Link to="/book-consultation">Book a Consultation</Link>
              </Button>
            </div>
            <p className="mt-6">
              <TextLink to="/destinations">Explore Destinations</TextLink>
            </p>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
              <img
                src={heroImg}
                alt="Abstract network of international study destinations connected by pathways"
                width={1200}
                height={1008}
                className="size-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 hidden rounded-xl border border-border bg-card p-4 shadow-lift sm:block">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Preliminary check
              </p>
              <p className="mt-1 text-sm font-bold text-navy">5 criteria · about 3 minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Destinations"
            title="Where could your education take you?"
            description="Explore study destinations and learn what makes each one unique."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(0, 3).map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
          <div className="mt-8">
            <TextLink to="/destinations">View all destinations</TextLink>
          </div>
        </div>
      </section>

      {/* Eligibility feature */}
      <section className="section-y bg-surface">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Eligibility Assessment</p>
            <h2 className="text-h2 mt-3">Not sure where you qualify?</h2>
            <p className="lead mt-4">
              Answer a few questions about your education, goals, and preferred destination to
              receive a preliminary study-abroad assessment.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                { icon: Clock, text: "Takes approximately 3 minutes" },
                { icon: Sparkles, text: "Personalised to your academic profile" },
                { icon: CheckCircle2, text: "No commitment required" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-sm font-medium text-navy">
                  <Icon className="size-4 text-green" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>
            <Button asChild variant="cta" size="lg" className="mt-8 w-full sm:w-auto">
              <Link to="/study-abroad/eligibility">Start Eligibility Check</Link>
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <p className="text-sm font-bold text-navy">Assessment preview</p>
              <span className="rounded-full bg-green/10 px-3 py-1 text-xs font-semibold text-green">
                Sample
              </span>
            </div>
            <div className="mt-5 space-y-3">
              {[
                ["Academic Readiness", "Strong", "green"],
                ["Language Preparation", "Needs Review", "blue"],
                ["Destination Alignment", "Strong", "green"],
                ["Timeline", "Needs Review", "blue"],
                ["Budget Consideration", "More Information Needed", "muted"],
              ].map(([label, status, tone]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3"
                >
                  <span className="text-sm font-medium text-navy">{label}</span>
                  <span
                    className={
                      tone === "green"
                        ? "text-xs font-bold text-green"
                        : tone === "blue"
                          ? "text-xs font-bold text-blue"
                          : "text-xs font-bold text-muted-foreground"
                    }
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Illustrative preview only. Your own result is generated from the answers you provide.
            </p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="How Unilink Helps"
            title="Guidance for every step of your journey"
            align="center"
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {journeySteps.map((step, i) => (
              <li key={step.title}>
                <Card className="h-full">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-extrabold text-blue-bright">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-bold">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Services"
            title="Support that covers the whole process"
            description="From your first questions to your first week abroad."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Unilink */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Why Unilink" title="Guidance built around you" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyUnilink.map((item) => (
              <Card key={item.title}>
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Success Stories"
            title="Student journeys"
            description="Sample stories shown as editable placeholders until verified student stories are supplied."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {successStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Resources"
            title="Plan your study journey with confidence"
            description="Practical guides on planning, applications, visas and student life."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.slice(0, 4).map((r) => (
              <ArticleCard key={r.slug} resource={r} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading, CTABanner, TextLink } from "@/components/site/primitives";
import { DecisionCompass } from "@/components/study-abroad/DecisionCompass";
import { DestinationExplorer } from "@/components/study-abroad/DestinationExplorer";
import { StudyAbroadJourney } from "@/components/study-abroad/StudyAbroadJourney";
import { ApplicationCalendar } from "@/components/study-abroad/ApplicationCalendar";
import { SupportTrack } from "@/components/study-abroad/SupportTrack";
import { Reveal } from "@/components/motion";
import { heroImages } from "@/components/site/hero-images";
import { howWeHelpCategories } from "@/data/site";
import { compassIntro, breathingStatement } from "@/data/study-abroad";

export const metadata: Metadata = {
  title: "Study Abroad: A Plan That Fits You | Unilink Nexus International",
  description:
    "Understand destinations, study levels, entry requirements, finances, timelines and visa preparation before you apply to study abroad.",
  openGraph: {
    title: "Study Abroad: A Plan That Fits You",
    description: "A structured overview of the study-abroad process, from planning to departure.",
    url: "/study-abroad",
  },
  alternates: {
    canonical: "/study-abroad",
  },
};

export default function StudyAbroad() {
  return (
    <>
      <PageHero
        image="study-abroad"
        eyebrow="Study Abroad"
        title="Study abroad with a plan that fits you."
        description="A clear view of what the process involves, so you can make decisions with context instead of guesswork."
      >
        <Button asChild variant="cta" size="lg">
          <Link href="/explore/pathway-advisor">Discover My Pathway</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/study-abroad/how-it-works">See How It Works</Link>
        </Button>
      </PageHero>

      {/* Decision Compass */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow={compassIntro.eyebrow}
            title={compassIntro.title}
            description={compassIntro.description}
          />
          <div className="mt-12">
            <DecisionCompass />
          </div>
        </div>
      </section>

      {/* Breathing point */}
      <section className="bg-blue-soft/25 py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <p className="text-h2 mx-auto max-w-3xl text-center text-navy">{breathingStatement}</p>
          </Reveal>
        </div>
      </section>

      {/* Destination Explorer */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="Destinations"
            title="Explore where you could study"
            description="Select a destination to see what matters most when comparing it to the others."
          />
          <div className="mt-12">
            <DestinationExplorer />
          </div>
        </div>
      </section>

      {/* Study Abroad Journey */}
      <section className="section-y bg-navy">
        <div className="container-page">
          <SectionHeading
            eyebrow="Your journey"
            title="What happens between considering it and actually going"
            tone="inverted"
          />
          <div className="mt-12">
            <StudyAbroadJourney />
          </div>
        </div>
      </section>

      {/* Application Calendar */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Timing"
            title="Studying abroad takes planning ahead"
            description="Intakes vary by university, country and programme, so there's no single deadline to work from. Here's the sequence to plan around instead."
          />
          <div className="mt-12">
            <ApplicationCalendar />
          </div>
        </div>
      </section>

      {/* Support Track */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="Support" title="Where UniLink fits in" />
          <div className="mt-12">
            <SupportTrack />
          </div>
        </div>
      </section>

      {/* Condensed services */}
      <section className="pb-20 lg:pb-28">
        <div className="container-page">
          <p className="text-sm font-semibold text-muted-foreground">
            Three areas of support cover most of what a study-abroad decision needs:
          </p>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {howWeHelpCategories.map((c) => (
              <div key={c.title}>
                <h3 className="text-base font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {c.description}
                </p>
                <div className="mt-3">
                  <TextLink to={c.to}>Learn more</TextLink>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <TextLink to="/services">Explore all UniLink services</TextLink>
          </div>
        </div>
      </section>

      {/* Pre-CTA photo strip */}
      <section className="border-t border-border bg-surface">
        <div className="container-page grid items-center gap-8 py-16 lg:grid-cols-[1fr_1.3fr] lg:py-20">
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <Image
              src={heroImages.destinations.src}
              alt={heroImages.destinations.alt}
              className="aspect-4/3 w-full object-cover"
            />
          </div>
          <Reveal>
            <p className="text-h3 max-w-md text-navy">
              Every study-abroad plan eventually leads to a departure date. The work now is making
              sure you&apos;re ready for it.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

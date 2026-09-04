import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, School, Users, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, CTABanner, TextLink } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { TrackedLink } from "@/components/site/TrackedLink";
import { JourneyStages } from "@/components/site/JourneyStages";
import { DestinationCard, ServiceCard, ArticleCard } from "@/components/site/cards";
import { StoryCarousel } from "@/components/site/StoryCarousel";
import { destinations } from "@/data/destinations";
import { services } from "@/data/services";
import { resources } from "@/data/resources";
import { journeyEntryCards, audienceCards, whyUnilink, successStories } from "@/data/site";
import {
  Reveal,
  RevealImmediate,
  StaggerContainer,
  StaggerItem,
  ParallaxImage,
} from "@/components/motion";
import heroImg from "@/assets/hero-network.jpg";
import whyUnilinkBg from "@/assets/hero-about.jpg";
import resourcesBg from "@/assets/hero-resources.jpg";

const audienceIcons: Record<string, LucideIcon> = {
  graduation: GraduationCap,
  users: Users,
  school: School,
};

export const metadata: Metadata = {
  title: "UniLink Nexus International: Your Link to Global Opportunities",
  description:
    "A student pathway and international education advisory service. Understand where you are, where you could go and how to get there, with guidance for students, parents and schools.",
  openGraph: {
    title: "UniLink Nexus International: Student Pathway Advisory",
    description:
      "Discover, explore, plan, prepare and connect. Personalised education pathway guidance for students, parents and schools.",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-linear-to-b from-surface to-background">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <RevealImmediate delay={0}>
              <p className="eyebrow">Student Pathway & International Education Advisory</p>
            </RevealImmediate>
            <RevealImmediate delay={0.08}>
              <h1 className="text-hero mt-4">
                Understand where you are, where you could go, and how to get there.
              </h1>
            </RevealImmediate>
            <RevealImmediate delay={0.16}>
              <p className="lead mt-6 max-w-xl">
                UniLink Nexus International helps students explore careers, subjects, degree
                pathways and international study options, then turn that into a realistic plan.
              </p>
            </RevealImmediate>
            <RevealImmediate delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
                  <TrackedLink
                    href="/explore/pathway-advisor"
                    cta="pathway-advisor"
                    location="home-hero"
                  >
                    Discover My Pathway
                  </TrackedLink>
                </Button>
                <Button asChild variant="navy" size="lg" className="w-full sm:w-auto">
                  <TrackedLink
                    href="/book-consultation"
                    cta="book-consultation"
                    location="home-hero"
                  >
                    Talk to an Advisor
                  </TrackedLink>
                </Button>
              </div>
            </RevealImmediate>
          </div>
          <Reveal delay={0.2} distance={24} className="relative">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
              <ParallaxImage
                src={heroImg.src}
                alt="Abstract network of international education pathways connecting students to opportunities"
                containerClassName="aspect-[6/5]"
                speed={0.06}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Journey entry points */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Start where you are"
            title="Where are you starting from?"
            align="center"
          />
          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
            {journeyEntryCards.map((card) => (
              <StaggerItem key={card.title}>
                <Card interactive className="flex h-full flex-col">
                  <h3 className="text-lg font-bold text-navy">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {card.copy}
                  </p>
                  <div className="mt-6">
                    <Button
                      asChild
                      variant={card.to === "/apply" ? "cta" : "outline"}
                      className="w-full"
                    >
                      <Link href={card.to}>{card.cta}</Link>
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Five-stage framework */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="The UniLink framework"
            title="Discover. Explore. Plan. Prepare. Connect."
            description="One framework that runs through every conversation, tool and page on this site."
            align="center"
          />
          <div className="mt-12">
            <JourneyStages />
          </div>
        </div>
      </section>

      {/* Audiences */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Who we work with" title="Students, parents and schools" />
          <StaggerContainer className="mt-10 grid gap-6 md:grid-cols-3">
            {audienceCards.map((card) => {
              const Icon = audienceIcons[card.icon] ?? GraduationCap;
              return (
                <StaggerItem key={card.title}>
                  <Card interactive className="flex h-full flex-col">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-blue/10 text-blue">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-base font-bold text-navy">{card.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {card.copy}
                    </p>
                    <p className="mt-5">
                      <TextLink to={card.to}>{card.cta}</TextLink>
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Services */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we help"
            title="Guidance across the whole pathway"
            description="From early career conversations to application support and preparation for departure."
          />
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <ServiceCard service={s} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Destinations */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Destinations"
            title="Where could your education take you?"
            description="Compare study environments, languages, costs and distance, not rankings."
          />
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.slice(0, 3).map((d) => (
              <StaggerItem key={d.slug}>
                <DestinationCard destination={d} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal className="mt-8">
            <TextLink to="/destinations">View all destinations</TextLink>
          </Reveal>
        </div>
      </section>

      {/* Why UniLink */}
      <section className="section-y relative overflow-hidden bg-navy">
        <ParallaxImage
          src={whyUnilinkBg.src}
          alt=""
          containerClassName="absolute inset-0"
          className="absolute -top-[15%] left-0 h-[130%] w-full object-cover"
          speed={0.12}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/90" />
        <div className="container-page relative">
          <SectionHeading eyebrow="Why UniLink" title="Guidance built around you" tone="inverted" />
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2">
            {whyUnilink.map((item) => (
              <StaggerItem key={item.title}>
                <Card>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Success stories */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Success Stories"
            title="Student stories"
            description="Sample stories shown as editable placeholders until verified student stories are supplied."
          />
          <div className="mt-10">
            <StoryCarousel stories={successStories} />
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-y relative overflow-hidden bg-navy">
        <ParallaxImage
          src={resourcesBg.src}
          alt=""
          containerClassName="absolute inset-0"
          className="absolute -top-[15%] left-0 h-[130%] w-full object-cover"
          speed={0.12}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/90" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="Resources"
            title="Plan with better information"
            description="Practical guides on careers, subjects, applications and international study."
            tone="inverted"
          />
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {resources.slice(0, 4).map((r) => (
              <StaggerItem key={r.slug}>
                <ArticleCard resource={r} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

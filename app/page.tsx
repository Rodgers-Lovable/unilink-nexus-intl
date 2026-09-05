import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  FileText,
  Globe,
  ListChecks,
  MapPin,
  Search,
  Send,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, CTABanner, TextLink } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { TrackedLink } from "@/components/site/TrackedLink";
import { JourneyStages } from "@/components/site/JourneyStages";
import { DestinationCard, AudiencePanel, FeaturedResourceCard } from "@/components/site/cards";
import { destinations } from "@/data/destinations";
import { resources } from "@/data/resources";
import { journeyEntryCards, audienceCards, whyUnilink, howWeHelpCategories } from "@/data/site";
import {
  Reveal,
  RevealImmediate,
  StaggerContainer,
  StaggerItem,
  ParallaxImage,
} from "@/components/motion";
import heroImg from "@/assets/hero-network.jpg";
import audienceStudentsImg from "@/assets/hero-explore.jpg";
import audienceParentsImg from "@/assets/hero-parents.jpg";
import audienceSchoolsImg from "@/assets/hero-schools.jpg";
import editorialBreakImg from "@/assets/hero-destinations.jpg";
import whyUnilinkBg from "@/assets/hero-about.jpg";
import resourcesBg from "@/assets/hero-resources.jpg";

const howWeHelpIcons: LucideIcon[] = [Compass, Globe, FileText];

const journeyEntryIcons: LucideIcon[] = [Compass, ListChecks, Send];

const audienceImages: Record<string, { src: typeof audienceStudentsImg; alt: string }> = {
  graduation: {
    src: audienceStudentsImg,
    alt: "A student exploring pathway options with an advisor",
  },
  users: {
    src: audienceParentsImg,
    alt: "A parent and student reviewing options together at home",
  },
  school: {
    src: audienceSchoolsImg,
    alt: "A careers advisor presenting to students in a classroom",
  },
};

const whyUnilinkIcons: LucideIcon[] = [MapPin, Search, ShieldCheck, Users];

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
                Career, university and study-abroad guidance for students planning their next step.
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
            <div className="absolute -bottom-5 left-6 hidden rounded-full border border-border bg-card px-5 py-2.5 shadow-lift sm:block">
              <p className="text-xs font-bold tracking-[0.1em] text-navy uppercase">
                Discover <span className="text-blue">·</span> Explore{" "}
                <span className="text-blue">·</span> Plan <span className="text-blue">·</span>{" "}
                Prepare <span className="text-blue">·</span> Connect
              </p>
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
            {journeyEntryCards.map((card, i) => {
              const Icon = journeyEntryIcons[i] ?? Compass;
              return (
                <StaggerItem key={card.title}>
                  <Card interactive className="flex h-full flex-col">
                    <span className="inline-flex size-11 items-center justify-center rounded-lg bg-blue/10 text-blue">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-xs font-bold tracking-[0.14em] text-muted-foreground uppercase">
                      Step {i + 1}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-navy">{card.title}</h3>
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
              );
            })}
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
              const image = (audienceImages[card.icon] ?? audienceImages["graduation"])!;
              return (
                <StaggerItem key={card.title} className="h-full">
                  <AudiencePanel
                    title={card.title}
                    copy={card.copy}
                    cta={card.cta}
                    to={card.to}
                    image={image.src}
                    imageAlt={image.alt}
                  />
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* How we help */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we help"
            title="Guidance across the whole pathway"
            description="From early career conversations to application support and preparation for departure."
          />
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {howWeHelpCategories.map((category, i) => {
              const Icon = howWeHelpIcons[i] ?? Compass;
              return (
                <StaggerItem key={category.title}>
                  <Card interactive className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex size-14 items-center justify-center rounded-xl bg-blue/8 text-blue">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-bold text-blue/40" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-bold text-navy">{category.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                    <ul className="mt-4 flex-1 space-y-1.5 text-sm text-muted-foreground">
                      {category.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true">·</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4">
                      <TextLink to={category.to}>Learn More</TextLink>
                    </p>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
          <Reveal className="mt-8">
            <TextLink to="/services">View all services</TextLink>
          </Reveal>
        </div>
      </section>

      {/* Editorial break */}
      <section className="relative flex min-h-[22rem] items-center overflow-hidden py-20">
        <ParallaxImage
          src={editorialBreakImg.src}
          alt=""
          containerClassName="absolute inset-0"
          className="absolute inset-0 size-full object-cover"
          speed={0.1}
        />
        <div className="absolute inset-0 bg-navy/70" />
        <Reveal className="container-page relative text-center">
          <p className="mx-auto max-w-2xl text-2xl leading-snug font-bold text-balance text-white sm:text-3xl">
            You don&rsquo;t need to have everything figured out before you start.
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/75">
            Direction comes first. The decision follows once the options are clear.
          </p>
        </Reveal>
      </section>

      {/* Destinations */}
      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Destinations" title="Where could your education take you?" />
          <Reveal className="mt-4 max-w-2xl">
            <p className="text-h3 font-semibold text-navy">
              Compare study environments, languages, costs and distance, not rankings.
            </p>
          </Reveal>
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
          className="absolute top-[-15%] left-0 h-[130%] w-full object-cover"
          speed={0.12}
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy/90 via-navy/80 to-navy/90" />
        <div className="container-page relative">
          <SectionHeading eyebrow="Why UniLink" title="Guidance built around you" tone="inverted" />
          <StaggerContainer className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {whyUnilink.map((item, i) => {
              const Icon = whyUnilinkIcons[i] ?? MapPin;
              return (
                <StaggerItem key={item.title} className="flex gap-4">
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Human trust */}
      <section className="section-y">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <p className="eyebrow mb-3">Real people, real guidance</p>
            <h2 className="text-h2">Guidance from people who understand the journey</h2>
            <p className="lead mt-4">
              Every recommendation comes from an advisor working directly with you, not from an
              automated match. UniLink pairs students and families with someone who has guided
              others through the same decisions.
            </p>
            <p className="mt-6">
              <TextLink to="/about">Meet UniLink</TextLink>
            </p>
          </Reveal>
          <Reveal delay={0.15} distance={24}>
            {/* Placeholder until real UniLink adviser imagery is supplied. */}
            <div
              className="flex aspect-3/2 items-center justify-center rounded-2xl border border-dashed border-border bg-surface"
              aria-hidden="true"
            >
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-blue/8 text-blue">
                <Users className="size-6" aria-hidden="true" />
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Resources */}
      <section className="section-y relative overflow-hidden bg-navy">
        <ParallaxImage
          src={resourcesBg.src}
          alt=""
          containerClassName="absolute inset-0"
          className="absolute top-[-15%] left-0 h-[130%] w-full object-cover"
          speed={0.12}
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy/90 via-navy/80 to-navy/90" />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="Resources"
            title="Plan with better information"
            description="Practical guides on careers, subjects, applications and international study."
            tone="inverted"
          />
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.slice(0, 3).map((r) => (
              <StaggerItem key={r.slug}>
                <FeaturedResourceCard resource={r} />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <Reveal className="mt-8">
            <Button asChild variant="onNavy">
              <Link href="/resources">Explore all resources</Link>
            </Button>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

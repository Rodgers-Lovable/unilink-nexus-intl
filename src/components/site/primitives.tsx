import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion";
import { heroImages, type HeroImageKey } from "@/components/site/hero-images";
import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { TrackedLink } from "./TrackedLink";

export { Card };

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  /** "inverted" is for headings sitting directly on a dark photo background. */
  tone = "default",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "default" | "inverted";
  className?: string;
}) {
  const inverted = tone === "inverted";
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={
            inverted
              ? "mb-3 text-[0.8125rem] font-bold tracking-[0.12em] text-white/80 uppercase"
              : "eyebrow mb-3"
          }
        >
          {eyebrow}
        </p>
      )}
      <h2 className={cn("text-h2", inverted && "text-white")}>{title}</h2>
      {description && (
        <p className={inverted ? "mt-4 text-[1.0625rem] leading-[1.7] text-white/80" : "lead mt-4"}>
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: HeroImageKey;
  children?: ReactNode;
}) {
  const heroImage = image ? heroImages[image] : undefined;

  return (
    <section className="border-b border-border bg-surface">
      <div
        className={cn(
          "container-page py-14 lg:py-20",
          heroImage && "grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14",
        )}
      >
        <Reveal className={heroImage ? undefined : "max-w-3xl"}>
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-h1">{title}</h1>
          {description && <p className="lead mt-5">{description}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
        {heroImage && (
          <Reveal delay={0.15} distance={24} className="relative">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                className="aspect-6/5 w-full object-cover"
                priority
              />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-blue">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.to ? (
              <Link href={item.to} className="hover:text-blue">
                {item.label}
              </Link>
            ) : (
              <span className="text-navy">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CTABanner({
  title = "Ready to explore your options?",
  description = "Speak with a UniLink advisor and take the next step toward your international education goals.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-y bg-navy">
      <div className="container-page text-center">
        <h2 className="text-h2 text-white">{title}</h2>
        <p className="lead mx-auto mt-4 max-w-2xl text-blue-soft">{description}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="cta" size="lg">
            <TrackedLink href="/book-consultation" cta="book-consultation" location="cta-banner">
              Book a Consultation
            </TrackedLink>
          </Button>
          <Button asChild variant="onNavy" size="lg">
            <TrackedLink
              href="/explore/pathway-advisor"
              cta="pathway-advisor"
              location="cta-banner"
            >
              Discover My Pathway
            </TrackedLink>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      href={to}
      className="group link-underline inline-flex items-center gap-1 text-sm font-semibold text-blue"
    >
      {children}
      <span
        className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        →
      </span>
    </Link>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground">
          <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-green/10 text-green">
            <Check className="size-3" aria-hidden="true" />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-lg border border-dashed border-border bg-surface px-4 py-3 text-xs text-muted-foreground">
      {children}
    </p>
  );
}

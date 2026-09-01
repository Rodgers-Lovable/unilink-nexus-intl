import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-h2">{title}</h2>
      {description && <p className="lead mt-4">{description}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-page py-14 lg:py-20">
        <div className="max-w-3xl reveal">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-h1">{title}</h1>
          {description && <p className="lead mt-5">{description}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="container-page pt-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-blue">
            Home
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {item.to ? (
              <Link to={item.to as never} className="hover:text-blue">
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
  description = "Speak with a Unilink advisor and take the next step toward your international education goals.",
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
            <Link to="/book-consultation">Book a Consultation</Link>
          </Button>
          <Button asChild variant="onNavy" size="lg">
            <Link to="/study-abroad/eligibility">Check My Eligibility</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to as never}
      className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline"
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
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

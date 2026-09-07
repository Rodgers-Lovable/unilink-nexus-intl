import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Route as RouteIcon,
  Globe,
  FileText,
  Banknote,
  Users,
  School,
  Quote,
  BookOpen,
  Stamp,
  Home,
  type LucideIcon,
} from "lucide-react";
import { Card, TextLink } from "./primitives";
import { cn } from "@/lib/utils";
import type { Destination } from "@/data/destinations";
import type { Service } from "@/data/services";
import type { Resource, ResourceCategory } from "@/data/resources";
import ukImg from "@/assets/dest-united-kingdom.jpg";
import caImg from "@/assets/dest-canada.jpg";
import auImg from "@/assets/dest-australia.jpg";
import usImg from "@/assets/dest-united-states.jpg";
import deImg from "@/assets/dest-germany.jpg";

export const destinationImages: Record<string, typeof ukImg> = {
  "united-kingdom": ukImg,
  canada: caImg,
  australia: auImg,
  "united-states": usImg,
  germany: deImg,
};

export const serviceIcons: Record<Service["icon"], LucideIcon> = {
  compass: Compass,
  route: RouteIcon,
  globe: Globe,
  fileText: FileText,
  banknote: Banknote,
  users: Users,
  school: School,
};

export const resourceCategoryIcons: Record<ResourceCategory, LucideIcon> = {
  "Study Guides": BookOpen,
  Applications: FileText,
  "Visa Guidance": Stamp,
  "Financial Planning": Banknote,
  "Student Life": Home,
};

/**
 * Branded visual for a resource: real photography when a resource has one,
 * otherwise a consistent category icon on a UniLink gradient with a subtle
 * route/node motif — one visual system, not per-article stock photography.
 */
export function ResourceArtwork({
  category,
  image,
  imageAlt,
  iconClassName = "size-8",
}: {
  category: ResourceCategory;
  image?: string | undefined;
  imageAlt?: string | undefined;
  iconClassName?: string;
}) {
  const Icon = resourceCategoryIcons[category] ?? BookOpen;

  if (image) {
    return (
      <Image
        src={image}
        alt={imageAlt ?? ""}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
    );
  }

  return (
    <div className="relative size-full overflow-hidden bg-linear-to-br from-blue/25 via-navy to-navy">
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 200 140"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full opacity-30"
      >
        <path
          d="M -10 115 C 35 95, 65 135, 115 78 S 180 35, 215 45"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeDasharray="1.5 7"
          strokeLinecap="round"
        />
        <circle cx="35" cy="100" r="2.5" fill="white" />
        <circle cx="115" cy="78" r="2.5" fill="white" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className={cn("text-white/75", iconClassName)} aria-hidden="true" />
      </div>
    </div>
  );
}

export function DestinationCard({
  destination,
  detailed = false,
}: {
  destination: Destination;
  detailed?: boolean;
}) {
  const img = destinationImages[destination.slug];
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="aspect-3/2 overflow-hidden bg-surface">
        {img && (
          <Image
            src={img}
            alt={`${destination.name} study environment`}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="space-y-3 p-6">
        <p className="eyebrow">{destination.region}</p>
        <h3 className="text-lg font-bold">{destination.name}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{destination.intro}</p>
        {detailed && (
          <dl className="space-y-1.5 pt-1 text-xs text-muted-foreground">
            <div>
              <dt className="inline font-semibold text-navy">Study levels: </dt>
              <dd className="inline">{destination.studyLevels.join(", ")}</dd>
            </div>
            <div>
              <dt className="inline font-semibold text-navy">Intakes: </dt>
              <dd className="inline">{destination.intakes.join(" · ")}</dd>
            </div>
          </dl>
        )}
        <div className="pt-2">
          <TextLink to={`/destinations/${destination.slug}`}>
            {detailed ? "View Destination" : "Explore Destination"}
          </TextLink>
        </div>
      </div>
    </article>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];
  return (
    <Card interactive>
      <span className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-blue/8 text-blue">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-base font-bold">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      <div className="mt-4">
        <TextLink to={`/services/${service.slug}`}>Learn More</TextLink>
      </div>
    </Card>
  );
}

export function ArticleCard({ resource }: { resource: Resource }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-video overflow-hidden">
        <ResourceArtwork
          category={resource.category}
          image={resource.image}
          imageAlt={resource.imageAlt}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">
          {resource.category} · {resource.readTime}
        </p>
        <h3 className="mt-2.5 flex-1 text-base font-bold text-navy">{resource.title}</h3>
        <p className="mt-4">
          <TextLink to={`/resources/${resource.slug}`}>Read guide</TextLink>
        </p>
      </div>
    </article>
  );
}

export function StoryCard({
  story,
}: {
  story: { slug: string; student: string; destination: string; programme: string; excerpt: string };
}) {
  return (
    <Card interactive className="flex h-full flex-col">
      <div className="mb-4 flex items-center gap-3">
        <div
          className="flex size-12 items-center justify-center rounded-full bg-blue-soft/50 text-xs font-bold text-navy"
          aria-hidden="true"
        >
          IMG
        </div>
        <div>
          <p className="text-sm font-bold text-navy">{story.student}</p>
          <p className="text-xs text-muted-foreground">
            {story.destination} · {story.programme}
          </p>
        </div>
      </div>
      <Quote className="size-4 text-blue" aria-hidden="true" />
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{story.excerpt}</p>
      <div className="mt-4">
        <TextLink to="/success-stories">Read Story</TextLink>
      </div>
    </Card>
  );
}

/**
 * Image-led panel for the homepage's "Students / Parents / Schools" section —
 * an editorial alternative to a plain text card, image first so the
 * audience is legible before the copy is read.
 */
export function AudiencePanel({
  title,
  copy,
  cta,
  to,
  image,
  imageAlt,
}: {
  title: string;
  copy: string;
  cta: string;
  to: string;
  image: typeof ukImg;
  imageAlt: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="aspect-4/3 overflow-hidden bg-surface">
        <Image
          src={image}
          alt={imageAlt}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-base font-bold text-navy">{title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{copy}</p>
        <p className="mt-4">
          <TextLink to={to}>{cta}</TextLink>
        </p>
      </div>
    </article>
  );
}

/**
 * Featured resource tile for the homepage. Real article photography doesn't
 * exist yet, so the thumbnail is a branded graphic keyed to the resource's
 * category rather than unrelated stock imagery.
 */
export function FeaturedResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-card">
      <div className="relative aspect-video overflow-hidden">
        <ResourceArtwork
          category={resource.category}
          image={resource.image}
          imageAlt={resource.imageAlt}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.6875rem] font-bold tracking-[0.12em] text-white/60 uppercase">
          {resource.category} · {resource.readTime}
        </p>
        <h3 className="mt-2.5 flex-1 text-base font-bold text-white">{resource.title}</h3>
        <p className="mt-4">
          <Link
            href={`/resources/${resource.slug}`}
            className="group link-underline inline-flex items-center gap-1 text-sm font-semibold text-white"
          >
            Read guide
            <span
              className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </p>
      </div>
    </article>
  );
}

/** Restrained by design: photo, name, role, optional one-line descriptor — never a biography. */
export function TeamCard({
  member,
}: {
  member: { name: string; role: string; descriptor?: string; photo?: string; photoAlt?: string };
}) {
  return (
    <div>
      <div className="aspect-4/3 overflow-hidden rounded-xl bg-surface">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.photoAlt ?? member.name}
            width={400}
            height={300}
            className="size-full object-cover"
          />
        ) : (
          <div
            className="flex size-full items-center justify-center text-xs font-semibold text-muted-foreground"
            aria-hidden="true"
          >
            Photo coming soon
          </div>
        )}
      </div>
      <h3 className="mt-4 text-base font-bold text-navy">{member.name}</h3>
      <p className="text-sm font-semibold text-blue">{member.role}</p>
      {member.descriptor && (
        <p className="mt-1 text-sm text-muted-foreground">{member.descriptor}</p>
      )}
    </div>
  );
}

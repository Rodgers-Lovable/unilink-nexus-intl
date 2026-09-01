import { Link } from "@tanstack/react-router";
import {
  Compass,
  Layers,
  FileText,
  ShieldCheck,
  Luggage,
  Quote,
  type LucideIcon,
} from "lucide-react";
import { Card, TextLink } from "./primitives";
import type { Destination } from "@/data/destinations";
import type { Service } from "@/data/services";
import type { Resource } from "@/data/resources";
import ukImg from "@/assets/dest-united-kingdom.jpg";
import caImg from "@/assets/dest-canada.jpg";
import auImg from "@/assets/dest-australia.jpg";
import usImg from "@/assets/dest-united-states.jpg";
import deImg from "@/assets/dest-germany.jpg";

export const destinationImages: Record<string, string> = {
  "united-kingdom": ukImg,
  canada: caImg,
  australia: auImg,
  "united-states": usImg,
  germany: deImg,
};

export const serviceIcons: Record<Service["icon"], LucideIcon> = {
  compass: Compass,
  layers: Layers,
  fileText: FileText,
  shieldCheck: ShieldCheck,
  luggage: Luggage,
};

export function DestinationCard({ destination, detailed = false }: { destination: Destination; detailed?: boolean }) {
  const img = destinationImages[destination.slug];
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift">
      <div className="aspect-[3/2] overflow-hidden bg-surface">
        {img && (
          <img
            src={img}
            alt={`${destination.name} study environment`}
            loading="lazy"
            width={900}
            height={600}
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
          <Link
            to="/destinations/$slug"
            params={{ slug: destination.slug }}
            className="text-sm font-semibold text-blue hover:underline"
          >
            {detailed ? "View Destination" : "Explore Destination"} →
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];
  return (
    <Card>
      <span className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-blue/8 text-blue">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="text-base font-bold">{service.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.short}</p>
      <div className="mt-4">
        <Link
          to="/services/$slug"
          params={{ slug: service.slug }}
          className="text-sm font-semibold text-blue hover:underline"
        >
          Learn More →
        </Link>
      </div>
    </Card>
  );
}

export function ArticleCard({ resource }: { resource: Resource }) {
  return (
    <Card className="flex h-full flex-col">
      <p className="eyebrow">{resource.category}</p>
      <h3 className="mt-3 text-base font-bold">{resource.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{resource.excerpt}</p>
      <p className="mt-4 text-xs text-muted-foreground">{resource.readTime}</p>
      <div className="mt-3">
        <Link
          to="/resources/$slug"
          params={{ slug: resource.slug }}
          className="text-sm font-semibold text-blue hover:underline"
        >
          Read Article →
        </Link>
      </div>
    </Card>
  );
}

export function StoryCard({
  story,
}: {
  story: { slug: string; student: string; destination: string; programme: string; excerpt: string };
}) {
  return (
    <Card className="flex h-full flex-col">
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

export function TeamCard({
  member,
}: {
  member: { name: string; role: string; expertise: string; bio: string };
}) {
  return (
    <Card>
      <div
        className="mb-4 flex aspect-[4/3] items-center justify-center rounded-lg bg-surface text-xs font-semibold text-muted-foreground"
        aria-hidden="true"
      >
        Photo placeholder
      </div>
      <h3 className="text-base font-bold">{member.name}</h3>
      <p className="text-sm font-semibold text-blue">{member.role}</p>
      <p className="mt-1 text-xs text-muted-foreground">{member.expertise}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
    </Card>
  );
}

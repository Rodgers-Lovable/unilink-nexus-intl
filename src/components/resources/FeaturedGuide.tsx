import { ResourceArtwork } from "@/components/site/cards";
import { TextLink } from "@/components/site/primitives";
import type { Resource } from "@/data/resources";

/** The single, prominent entry point into the resource library — see `getFeaturedResource`. */
export function FeaturedGuide({ resource }: { resource: Resource }) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-card lg:grid-cols-[1.1fr_1fr]">
      <div className="relative aspect-video lg:aspect-auto">
        <ResourceArtwork
          category={resource.category}
          image={resource.image}
          imageAlt={resource.imageAlt}
          iconClassName="size-14"
        />
      </div>
      <div className="flex flex-col justify-center p-8 lg:p-10">
        <p className="eyebrow">Featured guide</p>
        <h2 className="text-h2 mt-3">{resource.title}</h2>
        <p className="lead mt-4">{resource.excerpt}</p>
        <p className="mt-6 text-xs font-bold tracking-[0.12em] text-muted-foreground uppercase">
          {resource.category} · {resource.readTime}
        </p>
        <p className="mt-5">
          <TextLink to={`/resources/${resource.slug}`}>Read guide</TextLink>
        </p>
      </div>
    </article>
  );
}

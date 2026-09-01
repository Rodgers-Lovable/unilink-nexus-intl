import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, CTABanner } from "@/components/site/primitives";
import { getResource, resources } from "@/data/resources";
import { ArticleCard } from "@/components/site/cards";

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const resource = getResource(params.slug);
    if (!resource) throw notFound();
    return { resource };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { resource } = loaderData;
    return {
      meta: [
        { title: `${resource.title} | Unilink Nexus` },
        { name: "description", content: resource.excerpt },
        { property: "og:title", content: resource.title },
        { property: "og:description", content: resource.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/resources/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/resources/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: resource.title,
            description: resource.excerpt,
            datePublished: resource.date,
            author: { "@type": "Organization", name: "Unilink Nexus International" },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page section-y text-center">
      <h1 className="text-h2">Article not found</h1>
      <Button asChild variant="cta" className="mt-6">
        <Link to="/resources">Back to resources</Link>
      </Button>
    </div>
  ),
  component: ArticlePage,
});

function ArticlePage() {
  const { resource } = Route.useLoaderData();
  const related = resources.filter((r) => r.slug !== resource.slug).slice(0, 3);

  return (
    <>
      <Breadcrumbs items={[{ label: "Resources", to: "/resources" }, { label: resource.title }]} />

      <article className="section-y">
        <div className="container-page max-w-3xl">
          <p className="eyebrow">{resource.category}</p>
          <h1 className="text-h1 mt-3">{resource.title}</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {resource.readTime} · {new Date(resource.date).toLocaleDateString("en-GB", { dateStyle: "long" })}
          </p>
          <p className="lead mt-6">{resource.excerpt}</p>

          {resource.body.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-h3">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <div className="mt-12 rounded-xl border border-border bg-surface p-6">
            <p className="text-sm font-semibold text-navy">Planning your own journey?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Get a preliminary view of your options in about three minutes.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild variant="cta">
                <Link to="/explore/pathway-advisor">Discover My Pathway</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/book-consultation">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>

      <section className="section-y bg-surface">
        <div className="container-page">
          <h2 className="text-h3">Keep reading</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ArticleCard key={r.slug} resource={r} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

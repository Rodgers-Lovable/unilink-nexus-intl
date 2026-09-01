import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero, CTABanner, Placeholder } from "@/components/site/primitives";
import { ArticleCard } from "@/components/site/cards";
import { resourceCategories, resources } from "@/data/resources";

export const Route = createFileRoute("/resources/")({
  head: () => ({
    meta: [
      { title: "Study Abroad Resources & Guides | Unilink Nexus" },
      {
        name: "description",
        content:
          "Guides on planning, applications, visas, financial planning and student life for international students.",
      },
      { property: "og:title", content: "Study Abroad Resources & Guides" },
      {
        property: "og:description",
        content: "Practical guides for every stage of studying abroad.",
      },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const [category, setCategory] = useState<string>("All");
  const filtered = category === "All" ? resources : resources.filter((r) => r.category === category);

  return (
    <>
      <PageHero image="resources"
        eyebrow="Resources"
        title="Guides for every stage of studying abroad"
        description="Practical, plainly written guides on planning, applications, visas and student life."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {["All", ...resourceCategories].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={
                  category === c
                    ? "rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white"
                    : "rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-navy/40"
                }
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <ArticleCard key={r.slug} resource={r} />
            ))}
          </div>

          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Articles are sample editorial content and should be reviewed and verified before
              publication. [Content to be confirmed]
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

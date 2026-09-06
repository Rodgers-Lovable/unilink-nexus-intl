"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/site/cards";
import { FeaturedGuide } from "@/components/resources/FeaturedGuide";
import { ResourcePathwayBreak } from "@/components/resources/ResourcePathwayBreak";
import type { Resource } from "@/data/resources";

const ALL = "All";

export function ResourceList({
  resources,
  categories,
  featured,
}: {
  resources: Resource[];
  categories: readonly string[];
  featured: Resource;
}) {
  const [category, setCategory] = useState<string>(ALL);
  const isAll = category === ALL;

  const gridResources = isAll
    ? resources.filter((r) => r.slug !== featured.slug)
    : resources.filter((r) => r.category === category);

  const showBreak = isAll && gridResources.length > 3;
  const firstRow = showBreak ? gridResources.slice(0, 3) : gridResources;
  const rest = showBreak ? gridResources.slice(3) : [];

  return (
    <>
      <div
        className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        role="group"
        aria-label="Filter by category"
      >
        {[ALL, ...categories].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={
              category === c
                ? "shrink-0 rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white"
                : "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-navy"
            }
          >
            {c}
          </button>
        ))}
      </div>

      {isAll && (
        <div className="mt-10">
          <FeaturedGuide resource={featured} />
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-h3">{isAll ? "Explore our guides" : category}</h2>

        {firstRow.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No guides in this category yet.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {firstRow.map((r) => (
              <ArticleCard key={r.slug} resource={r} />
            ))}
          </div>
        )}
      </div>

      {showBreak && (
        <div className="mt-12">
          <ResourcePathwayBreak />
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((r) => (
            <ArticleCard key={r.slug} resource={r} />
          ))}
        </div>
      )}
    </>
  );
}

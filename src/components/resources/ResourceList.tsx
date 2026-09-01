"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/site/cards";
import type { Resource } from "@/data/resources";

export function ResourceList({
  resources,
  categories,
}: {
  resources: Resource[];
  categories: readonly string[];
}) {
  const [category, setCategory] = useState<string>("All");
  const filtered = category === "All" ? resources : resources.filter((r) => r.category === category);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["All", ...categories].map((c) => (
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
    </>
  );
}

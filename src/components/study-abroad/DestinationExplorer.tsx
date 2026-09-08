"use client";

import { useState } from "react";
import { WorldMap } from "./WorldMap";
import { TextLink } from "@/components/site/primitives";
import { worldMapDestinations } from "@/data/study-abroad";
import { cn } from "@/lib/utils";

export function DestinationExplorer() {
  const [activeSlug, setActiveSlug] = useState(worldMapDestinations[0]!.slug);
  const active = worldMapDestinations.find((d) => d.slug === activeSlug)!;

  return (
    <div className="grid min-w-0 gap-10 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-12">
      <div className="min-w-0">
        <WorldMap activeSlug={activeSlug} onSelect={setActiveSlug} />

        {/* Destination names as real controls, not just map coordinates. */}
        <ul className="scrollbar-hide mt-6 flex min-w-0 gap-2 overflow-x-auto sm:flex-wrap sm:overflow-visible">
          {worldMapDestinations.map((d) => (
            <li key={d.slug} className="shrink-0">
              <button
                type="button"
                onClick={() => setActiveSlug(d.slug)}
                aria-pressed={d.slug === activeSlug}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  d.slug === activeSlug
                    ? "border-orange bg-orange/10 text-orange"
                    : "border-border text-navy hover:border-blue/40 hover:text-blue",
                )}
              >
                {d.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div aria-live="polite" className="rounded-2xl border border-border bg-card p-7 shadow-card">
        <p className="eyebrow">{active.region}</p>
        <h3 className="text-h3 mt-2">{active.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{active.intro}</p>
        <ul className="mt-5 space-y-2 border-t border-border pt-5 text-sm text-foreground">
          {active.considerations.map((c) => (
            <li key={c} className="flex gap-2.5">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-blue" aria-hidden="true" />
              {c}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <TextLink to={`/destinations/${active.slug}`}>Explore {active.name}</TextLink>
        </div>
      </div>
    </div>
  );
}

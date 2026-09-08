"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { compassDimensions } from "@/data/study-abroad";
import { cn } from "@/lib/utils";

/** Hexagonal positions (percent) for the six dimensions around the central hub. */
const POSITIONS = [
  { x: 50, y: 10 },
  { x: 84, y: 30 },
  { x: 84, y: 70 },
  { x: 50, y: 90 },
  { x: 16, y: 70 },
  { x: 16, y: 30 },
];

export function DecisionCompass() {
  const [activeKey, setActiveKey] = useState<string>(compassDimensions[0].key);
  const active = compassDimensions.find((d) => d.key === activeKey)!;

  return (
    <div>
      {/* Desktop: radial hub with a single shared detail panel. */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14">
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 size-full"
            aria-hidden="true"
          >
            {POSITIONS.map((p, i) => (
              <line
                key={i}
                x1={50}
                y1={50}
                x2={p.x}
                y2={p.y}
                className={cn(
                  "stroke-1 transition-colors duration-200",
                  compassDimensions[i]!.key === activeKey ? "stroke-orange/50" : "stroke-border",
                )}
              />
            ))}
          </svg>

          <div className="absolute top-1/2 left-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-blue/30 bg-blue-soft/40 text-center">
            <p className="text-xs font-bold tracking-widest text-navy uppercase">
              Your Study
              <br />
              Abroad Plan
            </p>
          </div>

          {compassDimensions.map((d, i) => {
            const p = POSITIONS[i]!;
            const isActive = d.key === activeKey;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setActiveKey(d.key)}
                aria-pressed={isActive}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-card px-3.5 py-2 text-xs font-bold whitespace-nowrap shadow-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "border-orange text-orange"
                    : "border-border text-navy hover:border-blue/40 hover:text-blue",
                )}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                {d.title}
              </button>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="rounded-2xl border border-border bg-card p-8 shadow-card"
        >
          <p className="eyebrow">{active.title}</p>
          <h3 className="text-h3 mt-2">{active.question}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{active.description}</p>
        </div>
      </div>

      {/* Mobile/tablet: compact header + accordion. */}
      <div className="lg:hidden">
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-blue/30 bg-blue-soft/40 px-5 py-4">
          <span className="text-sm font-bold tracking-wider text-navy uppercase">
            Your Study Abroad Plan
          </span>
        </div>
        <ol className="space-y-2">
          {compassDimensions.map((d) => {
            const isOpen = d.key === activeKey;
            return (
              <li key={d.key} className="rounded-xl border border-border bg-card">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveKey(d.key)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <span className={cn("text-sm font-bold", isOpen ? "text-orange" : "text-navy")}>
                    {d.title}
                  </span>
                  <ChevronDown
                    className={cn(
                      "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                      isOpen && "rotate-180 text-orange",
                    )}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-sm font-semibold text-foreground">{d.question}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {d.description}
                    </p>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

"use client";

import {
  GRID_COLS,
  GRID_ROWS,
  worldMapLandBlocks,
  worldMapDestinations,
} from "@/data/study-abroad";
import { cn } from "@/lib/utils";

const CELL = 10;
const DOT_R = 2.1;
const WIDTH = GRID_COLS * CELL;
const HEIGHT = GRID_ROWS * CELL;

function isLand(row: number, col: number) {
  return worldMapLandBlocks.some(
    (b) => row >= b.rows[0] && row <= b.rows[1] && col >= b.cols[0] && col <= b.cols[1],
  );
}

const landDots: { row: number; col: number }[] = [];
for (let row = 0; row < GRID_ROWS; row++) {
  for (let col = 0; col < GRID_COLS; col++) {
    if (isLand(row, col)) landDots.push({ row, col });
  }
}

export function WorldMap({
  activeSlug,
  onSelect,
}: {
  activeSlug: string | null;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label="Stylised world map showing UniLink's supported study destinations"
      >
        {landDots.map((d) => (
          <circle
            key={`${d.row}-${d.col}`}
            cx={d.col * CELL + CELL / 2}
            cy={d.row * CELL + CELL / 2}
            r={DOT_R}
            className="fill-border"
          />
        ))}
        {worldMapDestinations.map((d) => {
          const active = d.slug === activeSlug;
          const cx = d.col * CELL + CELL / 2;
          const cy = d.row * CELL + CELL / 2;
          return (
            <g key={d.slug}>
              {active && (
                <circle cx={cx} cy={cy} r={DOT_R * 3.4} className="fill-orange/15">
                  <animate
                    attributeName="r"
                    values={`${DOT_R * 2.4};${DOT_R * 3.6};${DOT_R * 2.4}`}
                    dur="2.2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
              <circle
                cx={cx}
                cy={cy}
                r={active ? DOT_R * 2.1 : DOT_R * 1.7}
                className={cn(
                  "cursor-pointer stroke-2 transition-[r] duration-200",
                  active
                    ? "fill-orange stroke-white"
                    : "fill-blue stroke-white/80 hover:fill-blue-bright",
                )}
                onClick={() => onSelect(d.slug)}
              />
            </g>
          );
        })}
      </svg>

      {/* Real, focusable controls overlaid on the markers — the SVG circles above are decorative/pointer-only. */}
      <div className="pointer-events-none absolute inset-0">
        {worldMapDestinations.map((d) => (
          <button
            key={d.slug}
            type="button"
            onClick={() => onSelect(d.slug)}
            aria-pressed={d.slug === activeSlug}
            aria-label={`Show details for ${d.name}`}
            className="pointer-events-auto absolute size-6 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            style={{
              left: `${((d.col + 0.5) / GRID_COLS) * 100}%`,
              top: `${((d.row + 0.5) / GRID_ROWS) * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

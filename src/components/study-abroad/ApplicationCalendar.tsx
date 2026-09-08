import { calendarStages } from "@/data/study-abroad";
import { cn } from "@/lib/utils";

/** A small decorative calendar-grid glyph — not a real calendar, just a planner cue. */
function CalendarGlyph({ active }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 28 24" className="size-6" aria-hidden="true">
      <rect
        x="1"
        y="4"
        width="26"
        height="19"
        rx="2"
        className={cn(active ? "fill-blue-soft stroke-blue" : "fill-surface stroke-border")}
        strokeWidth="1.5"
      />
      <path
        d="M1 9h26"
        className={cn(active ? "stroke-blue" : "stroke-border")}
        strokeWidth="1.5"
      />
      <path d="M7 1v6M21 1v6" className="stroke-border" strokeWidth="1.5" strokeLinecap="round" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <circle
            key={`${row}-${col}`}
            cx={5 + col * 6}
            cy={13 + row * 4}
            r="0.9"
            className={active ? "fill-blue/50" : "fill-border"}
          />
        )),
      )}
    </svg>
  );
}

export function ApplicationCalendar() {
  return (
    <div>
      {/* Desktop: calendar-column strip */}
      <div className="hidden overflow-hidden rounded-2xl border border-border lg:grid lg:grid-cols-6">
        {calendarStages.map((stage, i) => (
          <div
            key={stage.title}
            className={cn(
              "flex flex-col gap-3 border-border p-5",
              i > 0 && "border-l",
              i % 2 === 0 ? "bg-card" : "bg-surface",
            )}
          >
            <CalendarGlyph active={i === 0} />
            <h3 className="text-sm font-bold text-navy">{stage.title}</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">{stage.description}</p>
          </div>
        ))}
      </div>

      {/* Mobile/tablet: vertical planning schedule */}
      <ol className="space-y-3 lg:hidden">
        {calendarStages.map((stage) => (
          <li
            key={stage.title}
            className="flex items-start gap-4 rounded-xl border border-border bg-card p-4"
          >
            <CalendarGlyph />
            <div>
              <h3 className="text-sm font-bold text-navy">{stage.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {stage.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

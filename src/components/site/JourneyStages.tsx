import { ClipboardCheck, Compass, Link2, Map, Route as RouteIcon, type LucideIcon } from "lucide-react";
import { unilinkJourney } from "@/data/site";

const icons: Record<string, LucideIcon> = {
  compass: Compass,
  map: Map,
  route: RouteIcon,
  clipboard: ClipboardCheck,
  link: Link2,
};

/** The five-stage UniLink framework, shown as a connected journey line. */
export function JourneyStages() {
  return (
    <ol className="relative grid gap-6 md:grid-cols-5">
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-blue/20 via-blue/40 to-green/40 md:block"
      />
      {unilinkJourney.map((stage, i) => {
        const Icon = icons[stage.icon] ?? Compass;
        return (
          <li key={stage.key} className="relative">
            <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border border-border bg-card text-blue shadow-card">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Stage {i + 1}
            </p>
            <h3 className="mt-1 text-base font-bold text-navy">{stage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {stage.description}
            </p>
          </li>
        );
      })}
    </ol>
  );
}

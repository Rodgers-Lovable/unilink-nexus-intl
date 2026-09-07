import {
  ChevronRight,
  ClipboardCheck,
  Compass,
  Link2,
  Map,
  Route as RouteIcon,
  type LucideIcon,
} from "lucide-react";
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
    <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-6 hidden h-px bg-linear-to-r from-blue/20 via-blue/40 to-green/40 md:block"
      />
      {unilinkJourney.map((stage, i) => {
        const Icon = icons[stage.icon] ?? Compass;
        const isLast = i === unilinkJourney.length - 1;
        return (
          <li key={stage.key} className="relative pl-16 md:pl-0">
            {!isLast && (
              <>
                <span
                  aria-hidden="true"
                  className="absolute left-6 top-12 h-[calc(100%+1.5rem)] w-px bg-linear-to-b from-blue/30 to-blue/5 md:hidden"
                />
                <ChevronRight
                  aria-hidden="true"
                  className="absolute top-6 -right-3 z-10 hidden size-4 -translate-y-1/2 translate-x-1/2 text-blue/40 md:block"
                />
              </>
            )}
            <span className="absolute left-0 top-0 z-10 inline-flex size-12 items-center justify-center rounded-full border border-border bg-card text-blue shadow-card md:static">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground md:mt-4">
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

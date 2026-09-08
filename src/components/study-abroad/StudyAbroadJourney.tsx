import { ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion";
import { studyAbroadJourney } from "@/data/study-abroad";
import { cn } from "@/lib/utils";

export function StudyAbroadJourney() {
  return (
    <StaggerContainer role="list" aria-label="Study abroad journey stages" className="relative">
      <span
        aria-hidden="true"
        className="absolute top-6 left-6 hidden h-[calc(100%-3rem)] w-px bg-linear-to-b from-blue/40 via-blue/25 to-green/40 lg:block"
      />
      {studyAbroadJourney.map((stage, i) => {
        const isLast = i === studyAbroadJourney.length - 1;
        return (
          <StaggerItem
            key={stage.stage}
            role="listitem"
            className="relative flex gap-5 py-5 lg:items-center lg:gap-8 lg:py-6"
          >
            <span
              className={cn(
                "relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold",
                isLast
                  ? "border-green bg-green/10 text-green"
                  : "border-orange bg-navy text-orange",
              )}
            >
              {stage.stage}
            </span>
            <div className="flex flex-1 flex-col gap-1 border-b border-white/10 pb-5 lg:flex-row lg:items-baseline lg:justify-between lg:gap-6 lg:border-b-0 lg:pb-6">
              <h3 className="text-base font-bold text-white lg:w-40 lg:shrink-0">{stage.title}</h3>
              <p className="text-sm leading-relaxed text-white/70">{stage.description}</p>
            </div>
            {!isLast && (
              <ArrowRight
                aria-hidden="true"
                className="hidden size-4 shrink-0 self-center text-blue/50 lg:block"
              />
            )}
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}

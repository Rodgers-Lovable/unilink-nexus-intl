import { ChevronDown, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion";
import { TextLink } from "@/components/site/primitives";
import { unilinkJourney } from "@/data/site";

/**
 * A compact visual connector to the framework, not a restatement of it — the
 * full five-stage explanation already lives on `/about/approach`.
 */
export function FrameworkStrip() {
  return (
    <section className="py-14 lg:py-20">
      <div className="container-page text-center">
        <Reveal>
          <p className="eyebrow">How we work</p>
          <h2 className="text-h2 mt-3">A clear framework for every student journey.</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-1 sm:flex-row sm:justify-center sm:gap-2">
            {unilinkJourney.map((stage, i) => (
              <div key={stage.key} className="flex flex-col items-center sm:flex-row sm:gap-2">
                <span className="text-sm font-bold text-navy sm:text-base">{stage.title}</span>
                {i < unilinkJourney.length - 1 && (
                  <>
                    <ChevronDown
                      className="my-1 size-4 text-blue/40 sm:hidden"
                      aria-hidden="true"
                    />
                    <ChevronRight
                      className="hidden size-4 text-blue/40 sm:block"
                      aria-hidden="true"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="lead mx-auto mt-6 max-w-xl">
            The framework behind every UniLink conversation — from understanding where a student is
            today to helping them prepare for what comes next.
          </p>
          <p className="mt-4">
            <TextLink to="/about/approach">Explore Our Approach</TextLink>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

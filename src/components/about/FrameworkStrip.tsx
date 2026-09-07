import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion";
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

        <div className="mx-auto mt-12 max-w-3xl sm:mt-14">
          <StaggerContainer className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
            <span
              aria-hidden="true"
              className="absolute top-1.5 left-1.75 h-[calc(100%-0.75rem)] w-px bg-linear-to-b from-blue/10 via-blue/40 to-blue/10 sm:hidden"
            />
            <span
              aria-hidden="true"
              className="absolute top-1.5 right-0 left-0 hidden h-px bg-linear-to-r from-blue/10 via-blue/40 to-blue/10 sm:block"
            />
            {unilinkJourney.map((stage) => (
              <StaggerItem
                key={stage.key}
                className="relative flex items-center gap-3 pl-6 sm:flex-col sm:gap-2 sm:pl-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute top-1 left-0 size-3 rounded-full border-2 border-blue bg-card sm:static sm:top-auto sm:left-auto"
                />
                <span className="text-sm font-bold text-navy sm:text-base">{stage.title}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <Reveal delay={0.15}>
          <p className="lead mx-auto mt-8 max-w-xl">
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

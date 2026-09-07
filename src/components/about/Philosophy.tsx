import { Reveal } from "@/components/motion";

/**
 * Editorial rendering of the same four ideas shown as cards elsewhere on the
 * site (`whyUnilink` in `@/data/site`, used on the homepage and the Approach
 * page). Kept local rather than reused verbatim so the fuller phrasing here
 * doesn't change those other renderings.
 */
const principles = [
  {
    title: "Start where you are",
    description:
      "You do not need to have your entire future figured out before asking for guidance. We help students understand where they are now and what their next step could be.",
  },
  {
    title: "Explore before applying",
    description:
      "Students should understand their possibilities before committing to a course, institution or study destination.",
  },
  {
    title: "Honest, student-first advice",
    description:
      "Recommendations should reflect the student's goals, qualifications and circumstances, not simply what is easiest or most popular.",
  },
  {
    title: "Families and schools matter",
    description:
      "Education decisions are rarely made in isolation. We help parents, families and schools take part in more informed conversations around a student's future.",
  },
] as const;

export function Philosophy() {
  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Our philosophy</p>
          <h2 className="text-h2 mt-3">Guidance should start with the student.</h2>
        </Reveal>

        <div className="mt-12 divide-y divide-border border-t border-border">
          {principles.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="grid gap-3 py-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10">
                <div className="flex items-baseline gap-4 md:block md:gap-0">
                  <span className="text-h2 text-blue/30">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-bold text-navy md:mt-3">{item.title}</h3>
                </div>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

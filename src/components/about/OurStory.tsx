import { Reveal } from "@/components/motion";

/**
 * TODO(unilink): "Our story" — add founding year, company origin and
 * registration details once confirmed. Do not fabricate these; the previous
 * bracketed placeholder text was removed from the public page for this reason.
 */
export function OurStory() {
  return (
    <section className="section-y">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Who we are</p>
          <h2 className="text-h2 mt-3">Guidance starts with understanding the student.</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 max-w-2xl border-l-2 border-blue/30 pl-6 md:pl-8">
          <p className="lead">
            UniLink Nexus International is an international education consultancy supporting
            students who want to study abroad. We combine structured guidance with a genuinely
            personal approach, so each student&rsquo;s goals, qualifications and circumstances shape
            the recommendations they receive.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

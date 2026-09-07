import Image from "next/image";
import { Reveal } from "@/components/motion";
import heroExplore from "@/assets/hero-explore.jpg";

/**
 * TODO(unilink): "Our story" — add founding year, company origin and
 * registration details once confirmed. Do not fabricate these; the previous
 * bracketed placeholder text was removed from the public page for this reason.
 */
export function OurStory() {
  return (
    <section className="section-y">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">Who we are</p>
          <h2 className="text-h2 mt-3">Guidance starts with understanding the student.</h2>
          <p className="lead mt-5">
            UniLink Nexus International is an international education consultancy supporting
            students who want to study abroad. We combine structured guidance with a genuinely
            personal approach, so each student&rsquo;s goals, qualifications and circumstances shape
            the recommendations they receive.
          </p>
        </Reveal>
        <Reveal delay={0.15} distance={24}>
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <Image
              src={heroExplore}
              alt="A UniLink advisor talking through study options with a student"
              className="aspect-4/3 w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

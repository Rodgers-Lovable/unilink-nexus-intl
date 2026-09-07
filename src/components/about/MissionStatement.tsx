import { Reveal } from "@/components/motion";

/** A typography-only visual break — no icon, no card, no border. */
export function MissionStatement() {
  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="container-page text-center">
        <Reveal>
          <p className="text-[0.8125rem] font-bold tracking-[0.12em] text-white/70 uppercase">
            Our mission
          </p>
          <p className="text-hero mx-auto mt-5 max-w-3xl text-white">
            Connecting students with opportunities that fit them — not simply the ones that are
            popular.
          </p>
          <p className="lead mx-auto mt-6 max-w-xl text-blue-soft">
            We help students make informed education decisions and support them honestly from early
            exploration and planning through applications and preparation for departure.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

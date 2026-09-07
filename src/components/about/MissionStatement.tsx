import { Reveal, ParallaxImage } from "@/components/motion";
import heroNetwork from "@/assets/hero-network.jpg";

/** A typography-led visual break, given depth by a photographic layer rather than a card or icon. */
export function MissionStatement() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <ParallaxImage
        src={heroNetwork.src}
        alt=""
        containerClassName="absolute inset-0"
        className="absolute top-[-15%] left-0 h-[130%] w-full object-cover opacity-40"
        speed={0.12}
      />
      <div className="absolute inset-0 bg-linear-to-b from-navy/95 via-navy/85 to-navy/95" />
      <div className="container-page relative text-center">
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

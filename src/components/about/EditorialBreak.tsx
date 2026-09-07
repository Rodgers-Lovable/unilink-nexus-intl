import { Reveal, ParallaxImage } from "@/components/motion";
import counselling from "@/assets/counselling.jpg";

/** Full-bleed photographic pacing break — a visual pause, not another content section. */
export function EditorialBreak() {
  return (
    <section className="relative flex min-h-88 items-center overflow-hidden py-20">
      <ParallaxImage
        src={counselling.src}
        alt=""
        containerClassName="absolute inset-0"
        className="absolute top-[-15%] left-0 h-[130%] w-full object-cover"
        speed={0.1}
      />
      <div className="absolute inset-0 bg-navy/65" />
      <Reveal className="container-page relative text-center">
        <p className="mx-auto max-w-xl text-2xl leading-snug font-bold text-balance text-white sm:text-3xl">
          Every recommendation starts with a conversation, not a form.
        </p>
      </Reveal>
    </section>
  );
}

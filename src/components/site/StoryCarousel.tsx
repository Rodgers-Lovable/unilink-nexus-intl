"use client";

import { StoryCard } from "./cards";
import type { Testimonial } from "@/data/testimonials";

const SECONDS_PER_CARD = 6;

export function StoryCarousel({ stories }: { stories: Testimonial[] }) {
  const duration = stories.length * SECONDS_PER_CARD;

  return (
    <div
      className="relative -mx-4 overflow-hidden px-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      role="region"
      aria-label="Student success stories"
    >
      <div
        className="animate-marquee flex w-max gap-6"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[stories, stories].map((set, setIndex) => (
          <div
            key={setIndex}
            className="flex shrink-0 gap-6"
            aria-hidden={setIndex === 1 ? true : undefined}
          >
            {set.map((story) => (
              <div key={story.slug} className="w-[85%] shrink-0 sm:w-[360px]">
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

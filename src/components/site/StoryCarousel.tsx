"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StoryCard } from "./cards";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function StoryCarousel({ stories }: { stories: Testimonial[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateEdges();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [updateEdges]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-story-card]");
    const step = (card?.offsetWidth ?? 320) + 24;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-2"
      >
        {stories.map((story) => (
          <div
            key={story.slug}
            data-story-card
            className="w-[85%] shrink-0 snap-start sm:w-[360px]"
          >
            <StoryCard story={story} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={atStart}
          aria-label="Previous story"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border border-border text-navy transition-colors",
            atStart
              ? "cursor-not-allowed opacity-40"
              : "hover:border-blue/40 hover:bg-surface hover:text-blue",
          )}
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={atEnd}
          aria-label="Next story"
          className={cn(
            "inline-flex size-10 items-center justify-center rounded-full border border-border text-navy transition-colors",
            atEnd
              ? "cursor-not-allowed opacity-40"
              : "hover:border-blue/40 hover:bg-surface hover:text-blue",
          )}
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

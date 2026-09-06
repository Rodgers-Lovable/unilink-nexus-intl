import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Compact, typography-led interruption in the guide grid — not another photo, not another CTA banner. */
export function ResourcePathwayBreak() {
  return (
    <div className="rounded-2xl border border-border bg-surface px-6 py-12 text-center">
      <svg
        width="120"
        height="24"
        viewBox="0 0 120 24"
        className="mx-auto text-blue/40"
        aria-hidden="true"
        focusable="false"
      >
        <line
          x1="4"
          y1="12"
          x2="108"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="1 7"
          strokeLinecap="round"
        />
        <circle cx="4" cy="12" r="3.5" className="fill-blue" />
        <path d="M104 6 L112 12 L104 18" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
      <h2 className="text-h3 mt-4">Not sure what you should be researching yet?</h2>
      <p className="lead mx-auto mt-3 max-w-md">
        Your next question depends on where you are in the process.
      </p>
      <Button asChild variant="cta" size="lg" className="mt-6">
        <Link href="/explore/pathway-advisor">Discover My Pathway</Link>
      </Button>
    </div>
  );
}

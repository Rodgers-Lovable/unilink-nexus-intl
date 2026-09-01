import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * Placeholder mark derived from the Unilink Nexus identity (globe + arrow).
 * Replace the SVG with the official logo file when it is supplied.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="var(--navy)" />
      <ellipse cx="20" cy="20" r="18" rx="8.5" ry="18" fill="none" stroke="var(--blue-bright)" strokeWidth="1.4" opacity="0.75" />
      <path d="M4.4 14.5h31.2M4.4 25.5h31.2" stroke="var(--blue-bright)" strokeWidth="1.4" opacity="0.6" />
      <path
        d="M11 26c4.5-9.5 12-14 21-15"
        fill="none"
        stroke="var(--green-bright)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path d="M27.5 8.2l5 2.5-3.4 4" fill="none" stroke="var(--green-bright)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5", className)} aria-label="Unilink Nexus International — home">
      <LogoMark />
      <span className="leading-tight">
        <span
          className={cn(
            "block text-[15px] font-extrabold tracking-tight",
            variant === "light" ? "text-white" : "text-navy",
          )}
        >
          UNILINK NEXUS
        </span>
        <span
          className={cn(
            "block text-[10px] font-semibold uppercase tracking-[0.2em]",
            variant === "light" ? "text-blue-soft" : "text-muted-foreground",
          )}
        >
          International
        </span>
      </span>
    </Link>
  );
}

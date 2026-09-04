"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics/umami";

type TrackedLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    cta: string;
    location: string;
    children: ReactNode;
  };

/**
 * A next/link that reports a "cta-clicked" Umami event on click. Exists so
 * Server Component pages can render tracked CTAs without themselves needing
 * "use client" — event handler closures can't cross the server/client
 * boundary, so the click handler has to live in a client leaf like this one.
 */
export function TrackedLink({ cta, location, ...props }: TrackedLinkProps) {
  return <Link {...props} onClick={() => trackEvent("cta-clicked", { cta, location })} />;
}

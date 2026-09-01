"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initUmami, trackPageview } from "@/lib/analytics/umami";

/** Injects the Umami script once and reports a pageview on every navigation. */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initUmami();
  }, []);

  useEffect(() => {
    const query = searchParams.toString();
    trackPageview(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  return null;
}

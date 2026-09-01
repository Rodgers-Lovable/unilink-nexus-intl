"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { SCRIPT_SRC, WEBSITE_ID, trackPageview, umamiEnabled } from "@/lib/analytics/umami";

/** Loads the Umami tracker script and reports a pageview on every navigation. */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    trackPageview(query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  if (!umamiEnabled) return null;

  return (
    <Script
      src={SCRIPT_SRC}
      strategy="afterInteractive"
      data-website-id={WEBSITE_ID}
      // We report SPA pageviews manually via the effect above.
      data-auto-track="false"
    />
  );
}

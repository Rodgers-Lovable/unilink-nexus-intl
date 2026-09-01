/**
 * Umami analytics integration.
 *
 * Configure with two environment variables (see .env.example / project settings):
 *   VITE_UMAMI_WEBSITE_ID — website ID from your Umami dashboard
 *   VITE_UMAMI_SRC        — tracker script URL, e.g. https://cloud.umami.is/script.js
 *
 * When either variable is missing, every function here is a safe no-op so
 * local development and previews behave exactly as before.
 */

const WEBSITE_ID = import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined;
const SCRIPT_SRC = import.meta.env.VITE_UMAMI_SRC as string | undefined;

type UmamiTrack = (eventName?: string, eventData?: Record<string, string | number>) => void;

declare global {
  interface Window {
    umami?: { track: UmamiTrack };
  }
}

export const umamiEnabled = Boolean(WEBSITE_ID && SCRIPT_SRC);

let injected = false;

/** Inject the Umami tracker script. Call once on app mount (client only). */
export function initUmami(): void {
  if (typeof document === "undefined" || injected || !umamiEnabled) return;
  injected = true;

  const script = document.createElement("script");
  script.defer = true;
  script.src = SCRIPT_SRC!;
  script.setAttribute("data-website-id", WEBSITE_ID!);
  // We report SPA pageviews manually via router events.
  script.setAttribute("data-auto-track", "false");
  document.head.appendChild(script);
}

/** Track a custom event. No-ops when Umami is not configured or not loaded yet. */
export function trackEvent(name: string, data?: Record<string, string | number>): void {
  if (typeof window === "undefined" || !umamiEnabled) return;
  try {
    window.umami?.track(name, data);
  } catch {
    // Analytics must never break the app.
  }
}

/** Track a pageview for SPA navigations. */
export function trackPageview(url: string): void {
  if (typeof window === "undefined" || !umamiEnabled) return;
  try {
    window.umami?.track((props) => ({ ...props, url }));
  } catch {
    // ignore
  }
}

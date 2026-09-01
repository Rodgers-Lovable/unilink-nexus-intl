# Umami Analytics Integration

Add privacy-friendly Umami analytics to the site with pageview tracking plus custom events at every key conversion point.

## What you'll need from Umami (placeholders for now)

Umami requires a hosted instance (Umami Cloud free tier, or self-hosted). The integration will be built with config placeholders — same pattern as EmailJS:

- `VITE_UMAMI_WEBSITE_ID` — the website ID from your Umami dashboard
- `VITE_UMAMI_SRC` — the tracker script URL (e.g. `https://cloud.umami.is/script.js` or your self-hosted URL)

If the variables are not set, tracking silently no-ops so local/dev behavior is unaffected.

## Implementation

### 1. Tracking module — `src/lib/analytics/umami.ts`

- Injects the Umami `<script>` tag at runtime (only when both env vars are present) — keeps it out of SSR/prerender.
- Exposes a typed `trackEvent(name, data?)` helper that safely no-ops when Umami is absent.
- SPA pageview tracking: subscribe to TanStack Router navigation events so every client-side route change is recorded (Umami's default auto-track misses SPA navigations).

### 2. Wire into `src/routes/__root.tsx`

- Call the Umami init once on mount and attach the router pageview listener.

### 3. Custom events at the points that matter to you

**Lead generation (most important):**
- `consultation-submitted` / `consultation-skipped` / `consultation-failed` — book-consultation form outcomes (distinguishes real deliveries from unconfigured/skipped sends)
- `contact-submitted` / `contact-skipped` / `contact-failed` — contact form outcomes

**Application funnel (4-step intake):**
- `application-started` — first step of /apply begun
- `application-step-completed` — with `{ step: 1..4 }` so you can see where applicants drop off
- `application-submitted` — successful submission (reference number issued)

**Pathway Advisor funnel:**
- `pathway-advisor-started`
- `pathway-advisor-completed` — with resulting career-family data, so you can see what students are interested in
- `pathway-lead-submitted` — email capture on the results screen

**Engagement signals:**
- `cta-clicked` — on major CTAs ("Start My Application", "Book a Consultation", "Take the Pathway Advisor") with a `location` property (navbar, homepage hero, journey cards, advisor results, etc.) so you can compare which placements convert
- `outbound-social-click` — Instagram / Facebook clicks in the footer
- Destination and service detail pageviews come free from page tracking; you'll see which destinations/services get the most interest in the Umami dashboard

## What you'll be able to answer in Umami

- Which destinations, services, and resources attract the most visits
- Full funnel: visitor → advisor/apply start → completion → lead submitted
- Where users abandon the 4-step application
- Which CTA placements drive the most applications/consultations
- How much traffic your Instagram/Facebook profiles send and receive

## Files

- New: `src/lib/analytics/umami.ts`
- Edit: `src/routes/__root.tsx`, `src/routes/book-consultation.tsx`, `src/routes/contact.tsx`, `src/components/apply/ApplicationWizard.tsx`, `src/components/pathway/PathwayWizard.tsx`, `src/components/pathway/PathwayResults.tsx`, `src/components/site/Navbar.tsx`, `src/components/site/Footer.tsx`, homepage/CTA banners as needed

## Verification

- TypeScript + build pass.
- Playwright: confirm the script is not injected without env vars (no-op), no console errors, and `trackEvent` calls fire without breaking form submissions.

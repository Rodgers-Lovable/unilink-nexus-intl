# Legal pages, company data layer, EmailJS forms

## Goal
Publish the client's full Privacy Policy and Terms of Use, move company/testimonial/service content into a central data layer, remove the team profiles section, and wire all forms to EmailJS.

## 1. Central company data file

Create `src/data/company.ts` as the single source of truth for organisation details:

- Legal name, trading name, tagline
- Privacy email, general/legal email, telephone, WhatsApp, registered/business address
- Opening hours
- Governing-law jurisdiction
- Policy "last updated" dates
- Registration details

Every value that is still unknown stays as a clearly marked placeholder string (e.g. `"[privacy email]"`) in this one file. Filling it in later updates the legal pages, contact page and footer at once.

`src/data/site.ts` keeps journey/audience/FAQ content and re-exports contact details from `company.ts` so existing imports keep working.

## 2. Legal pages

Move legal content out of the route file into `src/data/legal.ts`, holding structured sections (heading, paragraphs, bullet lists) for each policy.

- **Privacy Policy** — the client's full 17-section text, verbatim, including the Burundi Law No. 1/03 reference, AI/automated tools section, children and young people, sharing, international transfers, retention, security, rights, marketing, cookies, third-party sites, changes and contact.
- **Terms of Use** — the client's full 20-section text, verbatim, including education guidance, Pathway Advisor limits, no guarantee of admission, Apply Now scope, accuracy obligations, acceptable use, IP, liability and governing law.
- **Cookie Policy** and **Disclaimer** remain, rewritten to be consistent with and cross-reference the two new policies rather than contradicting them.

`src/routes/legal.$page.tsx` renders the structured sections with proper heading hierarchy, bullet lists and readable long-form typography, pulling contact details and dates from `company.ts`. The generic "placeholder legal content" footnote is removed; the page shows the real last-updated value.

Footer links point to `/legal/privacy-policy`, `/legal/terms`, `/legal/cookie-policy`, `/legal/disclaimer`.

## 3. Remove team profiles

- Delete `src/routes/about.team.tsx`
- Remove "Our Team" from the About dropdown in `src/components/site/nav-data.ts`
- Remove the "Meet the team" block and its button from `src/routes/about.index.tsx`, leaving the student-outcomes column
- Remove the `team` array from `src/data/site.ts`

## 4. Content into the data layer

- **Testimonials** — move success stories into `src/data/testimonials.ts` with a clear typed shape, ready for the client's verified stories. Sample entries stay flagged as samples until replaced.
- **Services and programmes** — keep `src/data/services.ts` as the source, and move school programme formats and parent topics into it (or a sibling `programmes.ts`) so `/schools` and `/parents` read from one place.
- Pages import from these files only; no inline content in route files.

## 5. EmailJS form wiring

Install `@emailjs/browser` and add `src/lib/email/emailjs.ts`:

- Reads `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_PUBLIC_KEY` and per-form template IDs from a config object with empty-string defaults (these are publishable values, safe in the client).
- Exposes `isEmailJsConfigured()` and `sendEmail(templateKey, payload)`.
- When not configured, `sendEmail` resolves as a no-op so the existing local-storage fallback still records the submission and the UI never breaks.

Wire these forms to send through it, each with its own template key:

| Form | Template key |
|---|---|
| Contact page | `contact` |
| Book a consultation | `consultation` |
| Pathway Advisor results lead form | `pathway` |
| Start My Application (`/apply`) | `application` |

Each submission:
- validates with the existing Zod schemas before sending
- sends a flattened, readable payload (no raw JSON blobs) to the client's inbox
- keeps the local-storage record as a backup
- shows a proper success or failure state, with a retry option on failure and the real contact email offered as a fallback

Consent/privacy notes under each form are replaced with wording that matches the new Privacy Policy and links to it.

## 6. Verification

- Typecheck and build
- Confirm no `[Content to be confirmed]` remains on the legal pages
- Confirm no dead links to `/about/team`
- Submit each form in preview with EmailJS unconfigured to confirm graceful fallback

## Technical notes

- EmailJS keys are publishable and belong in `.env` as `VITE_` variables; no backend or secret store is needed.
- No Lovable Cloud enablement in this change — lead persistence stays local until you decide on a backend.
- Legal text is stored as structured data, not raw HTML, so nothing is rendered with `dangerouslySetInnerHTML`.

## What I still need from you

- EmailJS Service ID, Public Key and the four Template IDs
- Privacy email, general/legal email, telephone, WhatsApp, business address
- Governing-law jurisdiction for the Terms
- The effective "last updated" date for both policies

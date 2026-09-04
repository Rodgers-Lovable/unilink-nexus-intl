# UniLink Nexus International

The marketing and lead-capture site for UniLink Nexus International, a study-abroad
advisory service. Covers destination and service information, a study-pathway
advisor, and application/consultation lead capture.

## Stack

- [Next.js](https://nextjs.org) (App Router, React 19, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) on Radix primitives
- [Resend](https://resend.com) for server-side form email delivery, via a Next.js Server Action
- [Umami](https://umami.is) for analytics

Migrated from TanStack Start in September 2026 — see commit history on `develop` for
the route-by-route port.

## Development

```sh
npm install
npm run dev
```

Copy `.env.example` to `.env` and fill in the values you need — every integration
(Resend, Umami) degrades gracefully to a "not configured" no-op when its env vars
are unset, so the app runs fully without any of them.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build locally
- `npm run lint` — ESLint
- `npm run format` — Prettier, write mode

## Structure

- `app/` — routes (App Router file conventions: folders for segments, `[slug]` for
  dynamic segments, `page.tsx`/`not-found.tsx`/`error.tsx` per route)
- `src/components/` — `ui/` (shadcn primitives), `site/` (layout, cards, nav),
  `apply/`, `pathway/`, `contact/`, `consultation/` (the interactive forms and
  wizards), `motion/` (framer-motion helpers)
- `src/data/` — static, code-defined content (destinations, services, resources, etc.)
- `src/lib/` — application/pathway business logic, email delivery, analytics

See [docs/brand-brief.md](docs/brand-brief.md) for the brand palette, tone and
content rules this site was built against.

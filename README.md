# UniLink Nexus International

The marketing and lead-capture site for UniLink Nexus International, a study-abroad
advisory service. Covers destination and service information, a study-pathway
advisor, and application/consultation lead capture.

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR)
  on [Nitro](https://nitro.build), deployed as a Cloudflare Worker
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) on Radix primitives
- [Resend](https://resend.com) for server-side form email delivery
- [Umami](https://umami.is) for analytics

A migration to Next.js (App Router) is planned; this repo is being cleaned up in
preparation for that (see recent commit history).

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
- `npm run build` — production build (Nitro/Cloudflare Worker output)
- `npm run lint` — ESLint
- `npm run format` — Prettier, write mode

## Structure

- `src/routes/` — file-based routes (TanStack Router conventions: `.` for nested
  segments, `$slug` for dynamic segments, `index` for index routes)
- `src/components/` — `ui/` (shadcn primitives), `site/` (layout, cards, nav),
  `apply/` and `pathway/` (the two multi-step wizards), `motion/` (framer-motion helpers)
- `src/data/` — static, code-defined content (destinations, services, resources, etc.)
- `src/lib/` — application/pathway business logic, email delivery, analytics

See [docs/brand-brief.md](docs/brand-brief.md) for the brand palette, tone and
content rules this site was built against.

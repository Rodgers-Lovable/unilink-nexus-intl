# Animation Plan for UniLink Nexus International

## Goal
Add expressive, polished motion that supports the "student pathway" positioning without slowing the site or distracting from content. Motion should feel calm, confident, and international — never playful or gimmicky.

## Decisions from your input
- **Intensity:** Expressive and memorable.
- **Scroll reveals:** Fade-up with stagger.
- **Micro-interactions:** Cards lift on hover, buttons respond, form step transitions, navigation.
- **Hero motion:** Text reveal plus image parallax.

## Technical approach
- Add `framer-motion` as the animation library. It handles scroll triggers, layout transitions, gestures, and reduced-motion cleanly.
- Keep CSS-only hover states as a fallback for simple interactions.
- Respect `prefers-reduced-motion` everywhere; the existing media query in `src/styles.css` will be preserved and expanded.

## Implementation steps

### 1. Install dependency and create animation primitives
- Install `framer-motion`.
- Create `src/components/motion/`:
  - `Reveal.tsx` — fade-up wrapper with configurable delay, distance, and once/repeat.
  - `StaggerContainer.tsx` — parent wrapper that staggers children on scroll.
  - `ParallaxImage.tsx` — slow Y-axis translation tied to scroll progress.
  - `MotionButton.tsx` — Button extension with tap scale and hover lift.
  - `MotionCard.tsx` — Card extension with hover lift and image zoom.
- Create `src/lib/motion.ts` for shared transition presets (spring, ease-out, duration) and a `useReducedMotion` hook.

### 2. Homepage hero animation
- Animate the eyebrow, headline, lead, and CTA row with a staggered reveal sequence.
- Apply a subtle parallax drift to the hero image on scroll.
- Keep the initial paint fast: use `initial={{ opacity: 0 }}` only, no heavy assets.

### 3. Global scroll-triggered reveals
- Wrap section headings and grids in `StaggerContainer` + `Reveal`.
- Apply stagger to:
  - Journey entry cards on the homepage.
  - Audience cards.
  - Service, destination, article, and story grids.
  - Why UniLink cards and CTA banners.
- Stagger delay: ~0.08s per item, duration ~0.5s.

### 4. Card and button micro-interactions
- Cards: lift on hover (`translateY(-4px)`), shadow deepens, image scales slightly.
- Buttons: tap scale (`0.97`), CTA buttons get a subtle shadow lift, icon arrows shift right on hover.
- Text links: underline grows from left to right.

### 5. Navigation animations
- Mobile menu: slide down + fade in, menu items stagger in.
- Desktop dropdowns: fade + slight Y shift.
- Active nav link: underline or background transition.

### 6. Wizard step transitions
- **Pathway Advisor:** animate step content in/out with a slide-fade (direction matches forward/back).
- **Application intake:** same pattern, plus animate the review sections in with stagger.
- Progress bars: animate width/color changes.
- Choice cards: tap scale and selected-state spring.

### 7. Page-level touches
- Subtle page fade on route transitions if supported by TanStack Router without complexity.
- Loading spinner in Pathway Advisor gets a pulse animation.
- Empty/error states fade in rather than appearing instantly.

### 8. Accessibility and performance
- All animations respect `prefers-reduced-motion`.
- Use `will-change` sparingly and only on actively animating elements.
- Lazy-load motion components where possible; no motion on first paint above the fold that blocks LCP.
- Verify no layout shift from hero parallax.

### 9. Verification
- Run `bun run build` to confirm no bundle or type errors.
- Use Playwright to check:
  - Hero reveal plays on load.
  - Cards lift on hover.
  - Pathway Advisor steps transition smoothly.
  - Mobile menu opens with animation.
  - Reduced-motion media query disables animations.

## Out of scope
- Complex 3D, WebGL, or particle effects.
- Custom cursor or scroll-jacking.
- Animated illustrations beyond the existing imagery.

## Deliverables
- New motion component library under `src/components/motion/`.
- Updated `src/styles.css` with any extra keyframes and reduced-motion rules.
- Animated homepage hero and section grids.
- Animated navigation and wizards.
- Verified build and smoke-tested interactions.

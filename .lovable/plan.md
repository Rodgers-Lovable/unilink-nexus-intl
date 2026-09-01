# Complete website content integration plan

## Goal
Replace all placeholder content and publish-ready gaps across the UniLink Nexus International website once the client supplies the requested information.

## What we are waiting for from the client

1. Business identity & contact details — phone, WhatsApp, email, address, hours, registration/founding info.
2. Team information — names, roles, bios, expertise, headshots, optional LinkedIn.
3. Success stories / testimonials — verified student names, destinations, programmes, challenges, outcomes, quotes, photos with consent.
4. Destinations — supported countries, tuition/living cost ranges, intakes, entry requirements, visa overviews, partner institutions.
5. Services & programmes — final service descriptions, inclusions, pricing/fees, school programme formats and booking, parent consultation structure, packages.
6. Visual assets — team photos, student photos, office/team photos, destination images, brand imagery guidelines.
7. Content & resources — articles, FAQs, downloadable guides/brochures.
8. Legal & compliance — privacy policy, terms of use, cookie policy, disclaimer/refund policy, form consent wording.
9. Technical & operational — receiving email, CRM/calendar tool, whether to enable Lovable Cloud backend for leads/applications, application management workflow.
10. Social proof & marketing — extra social links, accreditations, memberships, key statistics.

## Implementation steps

1. **Contact & business details**
   - Update `src/data/site.ts` `contactInfo` with real phone, WhatsApp, email, hours, address.
   - Update `src/routes/contact.tsx` to remove the placeholder warning once details are confirmed.
   - Add company registration/founding text to `src/routes/about.index.tsx`.

2. **Team profiles**
   - Replace `team` array in `src/data/site.ts` with real names, roles, expertise, bios.
   - Add headshots to `src/assets/team/` and update `src/routes/about.team.tsx` to render photos.
   - Remove the placeholder block on the team page.

3. **Success stories**
   - Replace `successStories` in `src/data/site.ts` with verified, consented stories.
   - Add student photos to `src/assets/success-stories/` if provided and consented.
   - Remove the placeholder block on `src/routes/success-stories.index.tsx`.

4. **Destinations**
   - Confirm or edit the destination list in `src/data/destinations.ts`.
   - Replace all `[Content to be confirmed]` placeholders with verified copy, costs, intakes, requirements, visa info, student life notes.
   - Add destination images to `src/assets/` if custom assets are provided.

5. **Services & programmes**
   - Finalize `services` in `src/data/services.ts` with accurate descriptions and expectations.
   - Add pricing/service structure if the client wants it public.
   - Update `src/routes/services.$slug.tsx` and `src/routes/services.index.tsx` if layout changes are needed.
   - Confirm school programme formats and fees in `src/data/site.ts` `schoolProgrammeFormats`.
   - Remove placeholder blocks on `/schools` and `/parents`.

6. **Visual assets**
   - Add provided images under `src/assets/` with consistent naming.
   - Replace generated/placeholder imagery on homepage, about, team, success stories, and destinations where appropriate.
   - Ensure all images have alt text.

7. **Content & resources**
   - Replace or expand `resources` in `src/data/resources.ts` with real articles.
   - Update `src/data/site.ts` `studyAbroadFaqs` with client-provided FAQs.
   - Add any downloadable guides as public files under `public/` and link from relevant pages.

8. **Legal pages**
   - Replace placeholder legal text in `src/routes/legal.$page.tsx` with final, reviewed copy.
   - Update the "last updated" date and remove the placeholder notice.
   - Ensure form consent notes on `/contact` and `/apply` match the approved privacy wording.

9. **Backend & integrations**
   - If the client chooses real backend storage, enable Lovable Cloud and migrate `src/lib/leads.ts` and `src/lib/application/applicationService.ts` from localStorage to server functions and database tables.
   - Wire form submissions to the client's receiving email or CRM.
   - Add any calendar/booking tool links (Calendly, WhatsApp Business) to CTAs.

10. **Social proof & marketing**
    - Add extra social links to `src/data/site.ts` `socialLinks` and the footer.
    - Add accreditations, memberships, and statistics to `/about` and `/about/approach`.

11. **Final verification**
    - Run typecheck and build.
    - Check every page for remaining `[Content to be confirmed]` or `[Name to be confirmed]` placeholders.
    - Verify all internal links, form submissions, and image paths.
    - Run a preview smoke test before publishing.

## Outcome
A publish-ready website with real contact details, team profiles, testimonials, verified destination and service content, finalized legal pages, and (if requested) a connected backend for leads and applications.

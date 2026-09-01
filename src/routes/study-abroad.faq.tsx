import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Breadcrumbs, CTABanner } from "@/components/site/primitives";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { studyAbroadFaqs } from "@/data/site";

export const Route = createFileRoute("/study-abroad/faq")({
  head: () => ({
    meta: [
      { title: "Study Abroad FAQs | Unilink Nexus International" },
      {
        name: "description",
        content:
          "Answers to common questions about planning to study abroad, timelines, eligibility assessments and what a consultation involves.",
      },
      { property: "og:title", content: "Study Abroad FAQs" },
      {
        property: "og:description",
        content: "Common questions about studying abroad, answered clearly.",
      },
      { property: "og:url", content: "/study-abroad/faq" },
    ],
    links: [{ rel: "canonical", href: "/study-abroad/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: studyAbroadFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Study Abroad", to: "/study-abroad" }, { label: "FAQs" }]} />
      <PageHero
        eyebrow="FAQs"
        title="Questions students ask most."
        description="If your question is not answered here, a consultation is the fastest way to get a clear response."
      />
      <section className="section-y">
        <div className="container-page max-w-3xl">
          <FaqAccordion items={studyAbroadFaqs} />
        </div>
      </section>
      <CTABanner />
    </>
  );
}

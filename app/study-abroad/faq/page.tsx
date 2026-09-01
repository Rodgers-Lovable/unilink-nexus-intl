import type { Metadata } from "next";
import { PageHero, Breadcrumbs, CTABanner } from "@/components/site/primitives";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { studyAbroadFaqs } from "@/data/site";

export const metadata: Metadata = {
  title: "Study Abroad FAQs | Unilink Nexus International",
  description:
    "Answers to common questions about planning to study abroad, timelines, eligibility assessments and what a consultation involves.",
  openGraph: {
    title: "Study Abroad FAQs",
    description: "Common questions about studying abroad, answered clearly.",
    url: "/study-abroad/faq",
  },
  alternates: {
    canonical: "/study-abroad/faq",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: studyAbroadFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Faq() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger -- static, code-defined JSON-LD, no user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Study Abroad", to: "/study-abroad" }, { label: "FAQs" }]} />
      <PageHero
        image="resources"
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

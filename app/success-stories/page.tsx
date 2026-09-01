import type { Metadata } from "next";
import { PageHero, CTABanner, Placeholder } from "@/components/site/primitives";
import { StoryCard } from "@/components/site/cards";
import { testimonials, hasUnverifiedTestimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: "Student Success Stories | Unilink Nexus",
  description: "See how Unilink Nexus International has supported students studying abroad.",
  openGraph: {
    title: "Student Success Stories",
    description: "How guidance turns into real study plans and successful departures.",
    url: "/success-stories",
  },
  alternates: {
    canonical: "/success-stories",
  },
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        image="success"
        eyebrow="Success stories"
        title="From first questions to first lectures"
        description="Sample stories showing how structured guidance turns into real study plans."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
          {hasUnverifiedTestimonials && (
            <div className="mt-10 max-w-2xl">
              <Placeholder>
                Some stories shown are samples, pending verified and consented student testimonials.
              </Placeholder>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}

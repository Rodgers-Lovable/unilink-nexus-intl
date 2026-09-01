import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs, PageHero } from "@/components/site/primitives";

const legalPages: Record<string, { title: string; sections: { heading: string; text: string }[] }> = {
  "privacy-policy": {
    title: "Privacy Policy",
    sections: [
      {
        heading: "Overview",
        text: "This Privacy Policy explains how Unilink Nexus International collects, uses and protects personal information submitted through this website. [Full policy text to be confirmed with legal review]",
      },
      {
        heading: "Information we collect",
        text: "Contact details, academic background and enquiry information you provide through forms and the eligibility assessment. [Content to be confirmed]",
      },
      {
        heading: "How we use information",
        text: "To respond to enquiries, provide guidance and arrange consultations. We do not sell personal information. [Content to be confirmed]",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    sections: [
      {
        heading: "Overview",
        text: "These terms govern the use of the Unilink Nexus International website. [Full terms text to be confirmed with legal review]",
      },
      {
        heading: "Guidance disclaimer",
        text: "Website content is for general guidance only and does not constitute a guarantee of admission, scholarship or visa approval.",
      },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    sections: [
      {
        heading: "Overview",
        text: "This policy explains how cookies and similar technologies are used on this website. [Full policy text to be confirmed]",
      },
      {
        heading: "Your choices",
        text: "You can control cookies through your browser settings. [Content to be confirmed]",
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    sections: [
      {
        heading: "General guidance",
        text: "Information on this website is provided for general guidance only. Admission, scholarship and visa outcomes depend on institutions and authorities, and requirements change over time.",
      },
      {
        heading: "No guarantees",
        text: "Unilink Nexus International does not guarantee admission, scholarships or visa approval. [Content to be confirmed]",
      },
    ],
  },
};

export const Route = createFileRoute("/legal")({
  loader: ({ params }) => {
    const page = legalPages[params.page];
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Page unavailable" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.page.title} | Unilink Nexus International` },
        { name: "description", content: loaderData.page.sections[0]?.text ?? "" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-page section-y text-center">
      <h1 className="text-h2">Page not found</h1>
      <Link to="/" className="mt-4 inline-block text-sm font-semibold text-blue hover:underline">
        Back to home
      </Link>
    </div>
  ),
  component: LegalPage,
});

function LegalPage() {
  const { page } = Route.useLoaderData();
  return (
    <>
      <Breadcrumbs items={[{ label: page.title }]} />
      <PageHero eyebrow="Legal" title={page.title} />
      <section className="section-y">
        <div className="container-page max-w-3xl space-y-10">
          {page.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-h3">{s.heading}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            Last updated: [date to be confirmed]. This is placeholder legal content pending
            professional review.
          </p>
        </div>
      </section>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Breadcrumbs, PageHero, SectionHeading, Card, Placeholder, CTABanner } from "@/components/site/primitives";

const careerFamilies = [
  {
    title: "Computing & AI",
    subjects: "Mathematics, Computer Science, Physics",
    degrees: "Computer Science, Artificial Intelligence, Data Science, Software Engineering",
  },
  {
    title: "Engineering & Technology",
    subjects: "Mathematics, Physics, Chemistry",
    degrees: "Civil, Mechanical, Electrical & Electronic Engineering",
  },
  {
    title: "Business & Finance",
    subjects: "Business, Economics, Accounting, Mathematics",
    degrees: "Business Administration, Finance & Accounting, Economics",
  },
  {
    title: "Healthcare & Life Sciences",
    subjects: "Biology, Chemistry, Mathematics",
    degrees: "Nursing & Health Sciences, Biomedical Science, Public Health",
  },
  {
    title: "Creative Industries",
    subjects: "Art & Design, English, History",
    degrees: "Design, Media & Communication, Architecture",
  },
  {
    title: "Law, Policy & Governance",
    subjects: "History, English, Economics, French",
    degrees: "Law, International Relations, Public Administration",
  },
  {
    title: "Psychology & Social Sciences",
    subjects: "Psychology, Biology, Geography",
    degrees: "Psychology, Sociology & Social Policy, Human Resource Management",
  },
  {
    title: "Environment & Agriculture",
    subjects: "Biology, Geography, Chemistry",
    degrees: "Environmental Science, Agriculture & Food Systems, Sustainable Development",
  },
];

export const Route = createFileRoute("/explore/career-subject-guidance")({
  head: () => ({
    meta: [
      { title: "Career & Subject Guidance | UniLink Nexus International" },
      {
        name: "description",
        content:
          "See how the subjects you enjoy connect to career families and the degree pathways that lead there — before you commit to a course or country.",
      },
      { property: "og:title", content: "Career & Subject Guidance" },
      {
        property: "og:description",
        content: "Connect subjects to careers and degree pathways worth exploring.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/explore/career-subject-guidance" },
    ],
    links: [{ rel: "canonical", href: "/explore/career-subject-guidance" }],
  }),
  component: CareerSubjectGuidancePage,
});

function CareerSubjectGuidancePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Explore", to: "/explore" }, { label: "Career & Subject Guidance" }]} />
      <PageHero image="explore"
        eyebrow="Career & Subject Guidance"
        title="Subjects open doors. Understand which ones."
        description="Subject choices quietly decide which degrees stay available later. This is a plain map from what you enjoy studying to the directions it can lead."
      >
        <Button asChild variant="cta" size="lg">
          <Link to="/explore/pathway-advisor">Discover My Pathway</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/services/$slug" params={{ slug: "career-guidance" }}>
            Career Guidance Service
          </Link>
        </Button>
      </PageHero>

      <section className="section-y">
        <div className="container-page">
          <SectionHeading
            eyebrow="Career families"
            title="From subjects to careers to degrees"
            description="Use this as a starting point for research, not as a decision. Requirements differ by institution and country."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {careerFamilies.map((family) => (
              <Card key={family.title} className="h-full">
                <h3 className="text-base font-bold">{family.title}</h3>
                <dl className="mt-4 space-y-2 text-sm">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Subjects often involved
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{family.subjects}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Degree families worth investigating
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{family.degrees}</dd>
                  </div>
                </dl>
              </Card>
            ))}
          </div>
          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Subject-to-degree relationships vary between curricula and institutions. Always verify
              entry requirements with the institution. [Content to be confirmed]
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner
        title="Not sure which subjects suit you?"
        description="The UniLink Pathway Advisor turns what you enjoy into directions worth exploring."
      />
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHero, CTABanner, Card, Placeholder } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/primitives";
import { team } from "@/data/site";

export const Route = createFileRoute("/about/team")({
  head: () => ({
    meta: [
      { title: "Our Team | Unilink Nexus International" },
      {
        name: "description",
        content:
          "Meet the advisors behind Unilink Nexus International — counselling, applications and student support.",
      },
      { property: "og:title", content: "Our Team" },
      { property: "og:description", content: "Meet the advisors behind Unilink Nexus International." },
      { property: "og:url", content: "/about/team" },
    ],
    links: [{ rel: "canonical", href: "/about/team" }],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "About", to: "/about" }, { label: "Our Team" }]} />
      <PageHero
        eyebrow="Our team"
        title="The people behind your guidance"
        description="Advisors across counselling, applications and student support — working with you from first questions to departure."
      />

      <section className="section-y">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.role}>
                <div className="flex size-14 items-center justify-center rounded-full bg-navy text-lg font-bold text-white" aria-hidden="true">
                  UN
                </div>
                <h2 className="mt-4 font-bold text-navy">{member.name}</h2>
                <p className="text-sm font-semibold text-blue">{member.role}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                  {member.expertise}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </Card>
            ))}
          </div>
          <div className="mt-10 max-w-2xl">
            <Placeholder>
              Team profiles are placeholders. Names, photos and biographies must be verified before
              publication. [Content to be confirmed]
            </Placeholder>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}

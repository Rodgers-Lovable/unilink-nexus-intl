import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, ShieldCheck, Clock } from "lucide-react";
import { ApplicationWizard } from "@/components/apply/ApplicationWizard";
import { PageHero } from "@/components/site/primitives";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: "Start My Application — UniLink Nexus International" },
      {
        name: "description",
        content:
          "Begin your student application profile with UniLink Nexus International. Share your academic background and study goals, and an adviser will guide your next steps.",
      },
      { property: "og:title", content: "Start My Application — UniLink Nexus International" },
      {
        property: "og:description",
        content:
          "A guided four-step intake covering your background, study plans and goals so a UniLink adviser can support your application.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApplyPage,
});

const assurances = [
  {
    icon: Clock,
    title: "About 5–7 minutes",
    body: "Four short steps. Your answers are kept on this device as you go.",
  },
  {
    icon: ClipboardList,
    title: "No documents needed yet",
    body: "Share what you know now. Transcripts and certificates come later, with adviser support.",
  },
  {
    icon: ShieldCheck,
    title: "Advisory review, not an admission",
    body: "This starts a conversation with an adviser — it is not a university application.",
  },
];

function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Connect"
        title="Start My Application"
        description="Tell us where you are academically and where you'd like to go. A UniLink adviser will review your profile and guide you through the steps that follow."
      />

      <section className="section-padding bg-surface">
        <div className="container-page">
          <ul className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
            {assurances.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <item.icon className="size-5 text-blue" aria-hidden="true" />
                <h2 className="mt-3 text-sm font-bold text-navy">{item.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <ApplicationWizard />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ClipboardList, ShieldCheck, Clock } from "lucide-react";
import { ApplicationWizard } from "@/components/apply/ApplicationWizard";
import { PageHero } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Start My Application | UniLink Nexus International",
  description:
    "Begin your student application profile with UniLink Nexus International. Share your academic background and study goals, and an adviser will guide your next steps.",
  openGraph: {
    title: "Start My Application | UniLink Nexus International",
    description:
      "A guided four-step intake covering your background, study plans and goals so a UniLink adviser can support your application.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

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
    body: "This starts a conversation with an adviser. It is not a university application.",
  },
];

export default function ApplyPage() {
  return (
    <>
      <PageHero
        image="apply"
        eyebrow="Connect"
        title="Start My Application"
        description="Tell us where you are academically and where you'd like to go. A UniLink adviser will review your profile and guide you through the steps that follow."
      />

      <section className="section-padding py-4 border-b shadow-xl">
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

      <section className="section-padding my-16">
        <div className="container-page">
          <ApplicationWizard />
        </div>
      </section>
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CheckList } from "@/components/site/primitives";
import { destinations } from "@/data/destinations";
import { saveLead } from "@/lib/leads";

export const Route = createFileRoute("/book-consultation")({
  head: () => ({
    meta: [
      { title: "Book a Free Consultation | Unilink Nexus International" },
      {
        name: "description",
        content:
          "Book a consultation with Unilink Nexus International to discuss your study abroad goals, options and next steps.",
      },
      { property: "og:title", content: "Book a Free Consultation" },
      {
        property: "og:description",
        content: "A structured conversation about your study goals and realistic options.",
      },
      { property: "og:url", content: "/book-consultation" },
    ],
    links: [{ rel: "canonical", href: "/book-consultation" }],
  }),
  component: BookPage,
});

function BookPage() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    saveLead({
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      studyLevel: String(data.get("studyLevel") ?? ""),
      destinationInterest: [String(data.get("destination") ?? "")],
      notes: String(data.get("message") ?? ""),
      source: "book-consultation",
      preferredContactMethod: "Phone call",
      consent: true,
    });
    setSent(true);
  };

  return (
    <section className="section-y bg-surface min-h-screen">
      <div className="container-page grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">Free consultation</p>
          <h1 className="text-h1 mt-3">Book your consultation</h1>
          <p className="lead mt-4">
            A structured conversation about your goals, qualifications and the options realistically
            open to you.
          </p>
          <div className="mt-8">
            <CheckList
              items={[
                "A review of your academic profile",
                "Destination and programme directions to consider",
                "Clear next steps for your timeline",
              ]}
            />
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Prefer a quicker start?{" "}
            <Link to="/study-abroad/eligibility" className="font-semibold text-blue hover:underline">
              Check your eligibility first
            </Link>
            .
          </p>
        </div>

        <Card className="bg-card">
          {sent ? (
            <div className="py-8 text-center">
              <h2 className="text-h3">Request received</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Thank you — we will be in touch to arrange your consultation. (Demo mode —
                submissions are stored locally.)
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input name="fullName" required placeholder="Full name" className="h-12" aria-label="Full name" />
                <Input name="email" type="email" required placeholder="Email address" className="h-12" aria-label="Email address" />
              </div>
              <Input name="phone" required placeholder="Phone or WhatsApp" className="h-12" aria-label="Phone number" />
              <div className="grid gap-4 sm:grid-cols-2">
                <select name="studyLevel" required className="h-12 w-full rounded-lg border border-border bg-card px-3 text-sm" aria-label="Intended study level" defaultValue="">
                  <option value="" disabled>
                    Intended study level
                  </option>
                  {["Bachelor's", "Master's", "PhD", "Diploma / Certificate", "Not sure yet"].map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
                <select name="destination" required className="h-12 w-full rounded-lg border border-border bg-card px-3 text-sm" aria-label="Preferred destination" defaultValue="">
                  <option value="" disabled>
                    Preferred destination
                  </option>
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                  <option value="Not sure">Not sure yet</option>
                </select>
              </div>
              <Textarea name="message" rows={4} placeholder="Anything you'd like us to prepare for? (optional)" aria-label="Additional message" />
              <Button type="submit" variant="cta" size="lg" className="w-full">
                Request My Consultation
              </Button>
              <p className="text-xs text-muted-foreground">
                By submitting, you agree to be contacted about your enquiry. [Placeholder privacy
                note]
              </p>
            </form>
          )}
        </Card>
      </div>
    </section>
  );
}

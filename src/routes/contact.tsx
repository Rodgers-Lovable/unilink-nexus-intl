import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Card, Placeholder } from "@/components/site/primitives";
import { contactInfo } from "@/data/site";
import { saveLead } from "@/lib/leads";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Unilink Nexus International" },
      {
        name: "description",
        content:
          "Get in touch with Unilink Nexus International to discuss your study abroad plans. Reach us by phone, WhatsApp or email.",
      },
      { property: "og:title", content: "Contact Unilink Nexus International" },
      { property: "og:description", content: "Talk to us about your study abroad plans." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    saveLead({
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      notes: String(data.get("message") ?? ""),
      source: "contact-form",
      preferredContactMethod: "Email",
      consent: true,
    });
    setSent(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us about your study plans"
        description="Questions, timelines or simply where to start — we're happy to help."
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
                  {contactInfo.phone}
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
                  {contactInfo.whatsapp}
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
                  {contactInfo.email}
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">{contactInfo.hours}</p>
              <p className="mt-1 text-sm text-muted-foreground">{contactInfo.address}</p>
            </Card>
            <Placeholder>
              Contact details are placeholders pending confirmation. [Content to be confirmed]
            </Placeholder>
          </div>

          <Card>
            {sent ? (
              <div className="py-8 text-center">
                <h2 className="text-h3">Message received</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Thank you for reaching out. We will respond as soon as possible. (Demo mode —
                  submissions are stored locally.)
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input name="fullName" required placeholder="Full name" className="h-12" aria-label="Full name" />
                  <Input name="email" type="email" required placeholder="Email address" className="h-12" aria-label="Email address" />
                </div>
                <Input name="phone" placeholder="Phone or WhatsApp (optional)" className="h-12" aria-label="Phone number" />
                <Textarea name="message" required rows={5} placeholder="How can we help?" aria-label="Your message" />
                <Button type="submit" variant="cta" size="lg" className="w-full">
                  Send Message
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
    </>
  );
}

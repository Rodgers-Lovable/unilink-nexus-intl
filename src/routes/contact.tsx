import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero, Card } from "@/components/site/primitives";
import { contactInfo, company, isPlaceholder } from "@/data/company";
import { saveLead } from "@/lib/leads";
import { formatEmailBody, sendEmail } from "@/lib/email/emailjs";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | UniLink Nexus International" },
      {
        name: "description",
        content:
          "Get in touch with UniLink Nexus International to discuss your study plans. Reach us by phone, WhatsApp or email, or send an enquiry.",
      },
      { property: "og:title", content: "Contact UniLink Nexus International" },
      { property: "og:description", content: "Talk to us about your study plans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

type Status = "idle" | "sending" | "sent" | "error";

function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ fullName: "", email: "", phone: "", message: "" });

  const send = async () => {
    setStatus("sending");

    await saveLead({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      notes: values.message,
      source: "contact-form",
      preferredContactMethod: "Email",
      consent: true,
    });

    const result = await sendEmail("contact", {
      form_name: "Website contact form",
      from_name: values.fullName,
      reply_to: values.email,
      phone: values.phone || "Not provided",
      message: values.message,
      summary: formatEmailBody({
        "Full name": values.fullName,
        Email: values.email,
        "Phone / WhatsApp": values.phone,
        Message: values.message,
        Submitted: new Date().toLocaleString(),
      }),
    });

    setStatus(result.status === "error" ? "error" : "sent");
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void send();
  };

  const showDetail = (value: string) => (isPlaceholder(value) ? "Available on request" : value);

  return (
    <>
      <PageHero image="counselling"
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
                  {showDetail(contactInfo.phone)}
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
                  {showDetail(contactInfo.whatsapp)}
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
                  {showDetail(contactInfo.email)}
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">{showDetail(contactInfo.hours)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{showDetail(contactInfo.address)}</p>
            </Card>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {company.legalName} provides education advisory guidance. We do not guarantee
              admission, scholarships or visa outcomes.
            </p>
          </div>

          <Card>
            {status === "sent" ? (
              <div className="py-8 text-center">
                <h2 className="text-h3">Message received</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Thank you for reaching out. A UniLink adviser will respond as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="fullName"
                    required
                    value={values.fullName}
                    onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
                    placeholder="Full name"
                    className="h-12"
                    aria-label="Full name"
                  />
                  <Input
                    name="email"
                    type="email"
                    required
                    value={values.email}
                    onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                    placeholder="Email address"
                    className="h-12"
                    aria-label="Email address"
                  />
                </div>
                <Input
                  name="phone"
                  value={values.phone}
                  onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                  placeholder="Phone or WhatsApp (optional)"
                  className="h-12"
                  aria-label="Phone number"
                />
                <Textarea
                  name="message"
                  required
                  rows={5}
                  value={values.message}
                  onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                  placeholder="How can we help?"
                  aria-label="Your message"
                />

                {status === "error" && (
                  <p role="alert" className="text-sm font-semibold text-destructive">
                    We couldn&apos;t send your message just now. Please try again, or email us
                    directly at {showDetail(contactInfo.email)}.
                  </p>
                )}

                <Button
                  type="submit"
                  variant="cta"
                  size="lg"
                  className="w-full"
                  disabled={status === "sending"}
                >
                  {status === "sending"
                    ? "Sending…"
                    : status === "error"
                      ? "Try again"
                      : "Send Message"}
                </Button>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  By submitting, you agree that {company.shortName} may use your details to respond
                  to this enquiry, as described in our{" "}
                  <Link
                    to="/legal/$page"
                    params={{ page: "privacy-policy" }}
                    className="font-semibold text-blue hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </Card>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import {
  contactInfo,
  company,
  isPlaceholder,
  offices,
  officeHours,
  telHref,
  whatsappHref,
} from "@/data/company";
import { saveLead } from "@/lib/leads";
import { sendEmail } from "@/lib/email/sendgrid";
import { trackEvent } from "@/lib/analytics/umami";

type Status = "idle" | "sending" | "sent" | "skipped" | "error";

export function ContactForm() {
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
      details: {
        "Full name": values.fullName,
        Email: values.email,
        "Phone / WhatsApp": values.phone,
        Message: values.message,
        Submitted: new Date().toLocaleString(),
      },
    });

    setStatus(
      result.status === "error" ? "error" : result.status === "skipped" ? "skipped" : "sent",
    );
    trackEvent(
      result.status === "error"
        ? "contact-failed"
        : result.status === "skipped"
          ? "contact-skipped"
          : "contact-submitted",
    );
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void send();
  };

  const showDetail = (value: string) => (isPlaceholder(value) ? "Available on request" : value);

  return (
    <>
      <PageHero
        image="counselling"
        eyebrow="Contact"
        title="Talk to us about your study plans"
        description="Questions, timelines, or simply where to start. We're happy to help."
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <ul className="space-y-5 text-sm">
                {offices.map((office) => (
                  <li key={office.city}>
                    <p className="flex items-start gap-3 font-semibold text-navy">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-blue" aria-hidden="true" />
                      {office.city}, {office.country}
                    </p>
                    <p className="mt-1 pl-7 text-muted-foreground">{office.address}</p>
                    <a
                      href={telHref(office.phone)}
                      className="mt-1 flex items-center gap-3 pl-7 font-medium text-blue hover:underline"
                    >
                      <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                      {office.phone}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
                {isPlaceholder(contactInfo.whatsapp) ? (
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <MessageCircle className="size-4 shrink-0 text-blue" aria-hidden="true" />
                    WhatsApp available on request
                  </p>
                ) : (
                  <a
                    href={whatsappHref(contactInfo.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 transition-colors hover:text-blue"
                  >
                    <MessageCircle className="size-4 shrink-0 text-blue" aria-hidden="true" />
                    WhatsApp us
                  </a>
                )}
                {isPlaceholder(contactInfo.email) ? (
                  <p className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="size-4 shrink-0 text-blue" aria-hidden="true" />
                    Available on request
                  </p>
                ) : (
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 transition-colors hover:text-blue"
                  >
                    <Mail className="size-4 shrink-0 text-blue" aria-hidden="true" />
                    {contactInfo.email}
                  </a>
                )}
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Office hours
                </p>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {officeHours.map((row) => (
                    <div key={row.days} className="flex justify-between gap-4">
                      <span>{row.days}</span>
                      <span>{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {company.legalName} provides education advisory guidance. We do not guarantee
              admission, scholarships or visa outcomes.
            </p>
          </div>

          <Card>
            {status === "sent" || status === "skipped" ? (
              <div className="py-8 text-center">
                <h2 className="text-h3">Message received</h2>
                {status === "sent" ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Thank you for reaching out. A UniLink adviser will respond as soon as possible.
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Your message has been recorded, but our email delivery service isn&apos;t set up
                    yet. To guarantee a response, please contact us directly using the phone,
                    WhatsApp or email details shown on this page.
                  </p>
                )}
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
                    href="/legal/privacy-policy"
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

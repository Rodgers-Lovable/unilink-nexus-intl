"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckList } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import { destinations } from "@/data/destinations";
import { saveLead } from "@/lib/leads";
import { sendEmail } from "@/lib/email/sendgrid";
import { company, contactInfo, isPlaceholder } from "@/data/company";
import { trackEvent } from "@/lib/analytics/umami";

export function ConsultationForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "skipped" | "error">("idle");

  const send = async (data: FormData) => {
    setStatus("sending");

    const values = {
      fullName: String(data.get("fullName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      studyLevel: String(data.get("studyLevel") ?? ""),
      destination: String(data.get("destination") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    await saveLead({
      fullName: values.fullName,
      email: values.email,
      phone: values.phone,
      studyLevel: values.studyLevel,
      destinationInterest: [values.destination],
      notes: values.message,
      source: "book-consultation",
      preferredContactMethod: "Phone call",
      consent: true,
    });

    const result = await sendEmail("consultation", {
      form_name: "Consultation request",
      from_name: values.fullName,
      reply_to: values.email,
      details: {
        "Full name": values.fullName,
        Email: values.email,
        "Phone / WhatsApp": values.phone,
        "Intended study level": values.studyLevel,
        "Preferred destination": values.destination,
        Notes: values.message,
        Submitted: new Date().toLocaleString(),
      },
    });

    setStatus(
      result.status === "error" ? "error" : result.status === "skipped" ? "skipped" : "sent",
    );

    trackEvent(
      result.status === "error"
        ? "consultation-failed"
        : result.status === "skipped"
          ? "consultation-skipped"
          : "consultation-submitted",
      { destination: values.destination || "Not sure", studyLevel: values.studyLevel },
    );
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void send(new FormData(e.currentTarget));
  };

  const contactEmail = isPlaceholder(contactInfo.email) ? "our contact page" : contactInfo.email;

  return (
    <section className="section-y bg-surface min-h-screen">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-start">
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
            <Link
              href="/explore/pathway-advisor"
              className="font-semibold text-blue hover:underline"
            >
              Discover your pathway first
            </Link>
            .
          </p>
        </div>

        <Card className="bg-card">
          {status === "sent" || status === "skipped" ? (
            <div className="py-8 text-center">
              <h2 className="text-h3">Request received</h2>
              {status === "sent" ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Thank you. A UniLink adviser will be in touch to arrange your consultation.
                </p>
              ) : (
                <div className="mt-3 space-y-3 text-sm text-muted-foreground">
                  <p>
                    Your details have been recorded, but our email delivery service isn&apos;t set
                    up yet, so we may not see your request right away.
                  </p>
                  <p className="font-semibold text-navy">
                    To guarantee a response, please contact us directly:
                  </p>
                  <ul className="space-y-1">
                    {!isPlaceholder(contactInfo.phone) && <li>Phone: {contactInfo.phone}</li>}
                    {!isPlaceholder(contactInfo.whatsapp) && (
                      <li>WhatsApp: {contactInfo.whatsapp}</li>
                    )}
                    {!isPlaceholder(contactInfo.email) && <li>Email: {contactInfo.email}</li>}
                    {isPlaceholder(contactInfo.phone) &&
                      isPlaceholder(contactInfo.whatsapp) &&
                      isPlaceholder(contactInfo.email) && (
                        <li>
                          Reach us via our{" "}
                          <Link href="/contact" className="font-semibold text-blue hover:underline">
                            contact page
                          </Link>
                          .
                        </li>
                      )}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  name="fullName"
                  required
                  placeholder="Full name"
                  className="h-12"
                  aria-label="Full name"
                />
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="h-12"
                  aria-label="Email address"
                />
              </div>
              <Input
                name="phone"
                required
                placeholder="Phone or WhatsApp"
                className="h-12"
                aria-label="Phone number"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  name="studyLevel"
                  required
                  className="h-12 w-full rounded-lg border border-border bg-card px-3 text-sm"
                  aria-label="Intended study level"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Intended study level
                  </option>
                  {["Bachelor's", "Master's", "PhD", "Diploma / Certificate", "Not sure yet"].map(
                    (o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ),
                  )}
                </select>
                <select
                  name="destination"
                  required
                  className="h-12 w-full rounded-lg border border-border bg-card px-3 text-sm"
                  aria-label="Preferred destination"
                  defaultValue=""
                >
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
              <Textarea
                name="message"
                rows={4}
                placeholder="Anything you'd like us to prepare for? (optional)"
                aria-label="Additional message"
              />
              {status === "error" && (
                <p role="alert" className="text-sm font-semibold text-destructive">
                  We couldn&apos;t send your request just now. Please try again, or reach us at{" "}
                  {contactEmail}.
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
                    : "Request My Consultation"}
              </Button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                By submitting, you agree that {company.shortName} may use your details to arrange
                and prepare for this consultation, as described in our{" "}
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
  );
}

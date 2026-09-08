"use client";

import { useRef, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { Clock, Info, Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero, SectionHeading, TextLink } from "@/components/site/primitives";
import { Card } from "@/components/site/Card";
import {
  contactInfo,
  company,
  isPlaceholder,
  offices,
  officeHours,
  telHref,
  whatsappHref,
  mapsHref,
  type IAddress,
} from "@/data/company";
import { sendEmail } from "@/lib/email/emailjs";
import { trackEvent } from "@/lib/analytics/umami";

type Status = "idle" | "sending" | "sent" | "skipped" | "error";
type Audience = "Student" | "Parent" | "School" | "Other";
const audiences: Audience[] = ["Student", "Parent", "School", "Other"];

type Values = {
  fullName: string;
  email: string;
  phone: string;
  audience: Audience | "";
  message: string;
};

type Errors = Partial<Record<keyof Values, string>>;

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = "Please enter a valid email address.";
  if (!values.audience) errors.audience = "Please let us know who you are.";
  if (!values.message.trim()) errors.message = "Let us know how we can help.";
  return errors;
}

/** Mirrors TextLink's look for mailto:/tel:/wa.me links, which aren't app routes. */
function ActionLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group link-underline inline-flex items-center gap-1 text-sm font-semibold text-blue"
    >
      {children}
      <span
        className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      >
        →
      </span>
    </a>
  );
}

/** Abstract node-and-path graphic — deliberately not a literal map, so it can't misrepresent geography. */
function LocationVisual() {
  return (
    <svg viewBox="0 0 400 220" className="w-full text-border" aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="399" height="219" rx="16" fill="var(--color-surface)" />
      {Array.from({ length: 9 }).map((_, row) =>
        Array.from({ length: 17 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={20 + col * 22}
            cy={20 + row * 22}
            r="1.2"
            className="fill-border"
          />
        )),
      )}
      <path
        d="M 300 70 C 220 60, 160 140, 90 150"
        fill="none"
        stroke="var(--color-blue)"
        strokeWidth="2"
        strokeDasharray="2 8"
        strokeLinecap="round"
      />
      <circle cx="300" cy="70" r="7" className="fill-blue" />
      <circle
        cx="300"
        cy="70"
        r="12"
        fill="none"
        className="stroke-blue"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <text x="300" y="46" textAnchor="middle" className="fill-navy text-[13px] font-bold">
        Nairobi
      </text>
      <circle cx="90" cy="150" r="7" className="fill-green" />
      <circle
        cx="90"
        cy="150"
        r="12"
        fill="none"
        className="stroke-green"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <text x="90" y="178" textAnchor="middle" className="fill-navy text-[13px] font-bold">
        Bujumbura
      </text>
    </svg>
  );
}

function OfficeBlock({ office }: { office: IAddress }) {
  const fullAddress = `${office.address}, ${office.city}, ${office.country}`;
  return (
    <div>
      <p className="flex items-center gap-2 font-bold text-navy">
        <MapPin className="size-4 shrink-0 text-blue" aria-hidden="true" />
        {office.city}, {office.country}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{office.address}</p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
        <ActionLink href={mapsHref(fullAddress)} external>
          Get directions
        </ActionLink>
        <ActionLink href={telHref(office.phone)}>Call {office.city}</ActionLink>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState<Values>({
    fullName: "",
    email: "",
    phone: "",
    audience: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const send = async () => {
    setStatus("sending");

    const result = await sendEmail("contact", {
      form_name: "Website contact form",
      from_name: values.fullName,
      reply_to: values.email,
      details: {
        "Full name": values.fullName,
        Email: values.email,
        "Phone / WhatsApp": values.phone,
        "I am a": values.audience,
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
    if (status === "sending") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (nextErrors.fullName) fullNameRef.current?.focus();
    else if (nextErrors.email) emailRef.current?.focus();
    else if (nextErrors.message) messageRef.current?.focus();
    if (Object.keys(nextErrors).length > 0) return;

    void send();
  };

  const showDetail = (value: string) => (isPlaceholder(value) ? "Available on request" : value);
  const nairobi = offices.find((o) => o.city === "Nairobi");
  const bujumbura = offices.find((o) => o.city === "Bujumbura");
  const orderedOffices = [nairobi, bujumbura].filter((o): o is IAddress => Boolean(o));

  return (
    <>
      <PageHero
        image="parents"
        eyebrow="Contact UniLink"
        title="Talk to us about your study plans"
        description="Questions about studying abroad, choosing your next step, or simply where to begin? Talk to our team."
      />

      {/* Conversation interface */}
      <section className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-5 lg:items-start">
          {/* Contact options */}
          <div className="order-2 lg:order-1 lg:col-span-2">
            <h2 className="text-h3">Choose how you&rsquo;d like to talk</h2>

            <div className="mt-6 divide-y divide-border border-t border-border">
              <div className="flex items-start gap-4 py-5">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-blue text-white">
                  <FaWhatsapp className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold text-navy">WhatsApp</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    For quick questions and conversations.
                  </p>
                  <p className="mt-2.5">
                    {isPlaceholder(contactInfo.whatsapp) ? (
                      <span className="text-sm text-muted-foreground">Available on request</span>
                    ) : (
                      <ActionLink href={whatsappHref(contactInfo.whatsapp)} external>
                        Chat on WhatsApp
                      </ActionLink>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-blue">
                  <Phone className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-navy">Call us</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Speak directly with the UniLink team.
                  </p>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="phones" className="border-none">
                      <AccordionTrigger className="justify-start gap-1.5 p-0 py-2.5 text-sm font-semibold text-blue hover:underline [&>svg]:size-4">
                        View phone numbers
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1.5 pt-1 text-sm">
                          {offices.map((office) => (
                            <li key={office.city}>
                              <a
                                href={telHref(office.phone)}
                                className="font-medium text-navy hover:text-blue"
                              >
                                {office.city}: {office.phone}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              <div className="flex items-start gap-4 py-5">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-blue">
                  <Mail className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold text-navy">Email</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    For detailed enquiries or documents.
                  </p>
                  <p className="mt-2.5">
                    {isPlaceholder(contactInfo.email) ? (
                      <span className="text-sm text-muted-foreground">Available on request</span>
                    ) : (
                      <ActionLink href={`mailto:${contactInfo.email}`}>Send an email</ActionLink>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Enquiry form */}
          <div className="order-1 lg:order-2 lg:col-span-3">
            <Card>
              {status === "sent" || status === "skipped" ? (
                <div className="py-8 text-center">
                  <h2 className="text-h3">
                    {status === "sent"
                      ? "Thanks — we've received your enquiry."
                      : "Your enquiry has been recorded"}
                  </h2>
                  {status === "sent" ? (
                    <p className="mt-3 text-sm text-muted-foreground">
                      A member of the UniLink team will follow up using the contact details you
                      provided.
                    </p>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Our email delivery service isn&apos;t set up yet, so to guarantee a response
                      please also reach us directly by phone, WhatsApp or email above.
                    </p>
                  )}
                  <p className="mt-5">
                    <TextLink to="/explore/pathway-advisor">
                      Explore your pathway while you wait
                    </TextLink>
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="space-y-5">
                  <div>
                    <h2 className="text-h3">Send us an enquiry</h2>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      Tell us what&rsquo;s on your mind and we&rsquo;ll take it from there.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="fullName" className="sr-only">
                        Full name
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        ref={fullNameRef}
                        required
                        value={values.fullName}
                        onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
                        placeholder="Full name *"
                        className="h-12"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                      {errors.fullName && (
                        <p
                          id="fullName-error"
                          role="alert"
                          className="mt-1 text-xs text-destructive"
                        >
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Email address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        ref={emailRef}
                        required
                        value={values.email}
                        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                        placeholder="Email address *"
                        className="h-12"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone or WhatsApp
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={values.phone}
                      onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                      placeholder="Phone / WhatsApp"
                      className="h-12"
                      aria-describedby="phone-hint"
                    />
                    <p id="phone-hint" className="mt-1.5 text-xs text-muted-foreground">
                      Optional — include this if you&rsquo;d prefer us to contact you by phone or
                      WhatsApp.
                    </p>
                  </div>

                  <fieldset>
                    <legend className="text-sm font-semibold text-navy">I am a...</legend>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {audiences.map((option) => (
                        <label key={option} className="cursor-pointer">
                          <input
                            type="radio"
                            name="audience"
                            value={option}
                            checked={values.audience === option}
                            onChange={() => setValues((v) => ({ ...v, audience: option }))}
                            className="peer sr-only"
                            aria-describedby={errors.audience ? "audience-error" : undefined}
                          />
                          <span className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors peer-checked:border-blue peer-checked:bg-blue peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.audience && (
                      <p
                        id="audience-error"
                        role="alert"
                        className="mt-1.5 text-xs text-destructive"
                      >
                        {errors.audience}
                      </p>
                    )}
                  </fieldset>

                  <div>
                    <label htmlFor="message" className="sr-only">
                      How can we help?
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      ref={messageRef}
                      required
                      rows={6}
                      value={values.message}
                      onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
                      placeholder="Tell us what you'd like help with..."
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" role="alert" className="mt-1 text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <p role="alert" className="text-sm font-semibold text-destructive">
                      We couldn&apos;t send your enquiry just now. Please try again, or email us
                      directly at {showDetail(contactInfo.email)}.
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="cta"
                    size="lg"
                    className="w-full"
                    disabled={status === "sending"}
                    aria-busy={status === "sending"}
                  >
                    {status === "sending"
                      ? "Sending…"
                      : status === "error"
                        ? "Try again"
                        : "Send enquiry"}
                  </Button>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    By submitting this form, you agree to be contacted about your enquiry, as
                    described in our{" "}
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
        </div>
      </section>

      {/* Locations */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHeading eyebrow="Our offices" title="Find UniLink" />
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
            <LocationVisual />
            <div className="grid gap-8 sm:grid-cols-2">
              {orderedOffices.map((office) => (
                <OfficeBlock key={office.city} office={office} />
              ))}
            </div>
          </div>
          <p className="mt-12 text-center text-lg font-semibold text-navy">
            Here when you need guidance. Connected to where you want to go.
          </p>
        </div>
      </section>

      {/* Hours + responsible guidance */}
      <section className="section-y">
        <div className="container-page grid gap-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden="true" />
            <div>
              <p className="font-bold text-navy">Office hours</p>
              <div className="mt-1.5 space-y-1 text-sm text-muted-foreground">
                {officeHours.map((row) => (
                  <div key={row.days} className="flex gap-3">
                    <span className="w-20 shrink-0">{row.days}</span>
                    <span>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-blue/15 bg-blue/5 p-5">
            <Info className="mt-0.5 size-5 shrink-0 text-blue" aria-hidden="true" />
            <div>
              <p className="font-bold text-navy">Responsible guidance</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {company.legalName} provides education advisory guidance. We do not guarantee
                admission, scholarships or visa outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway Advisor escape route */}
      <section className="section-y bg-surface">
        <div className="container-page text-center">
          <svg
            width="120"
            height="24"
            viewBox="0 0 120 24"
            className="mx-auto text-blue/40"
            aria-hidden="true"
          >
            <line
              x1="4"
              y1="12"
              x2="108"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
            <circle cx="4" cy="12" r="3.5" className="fill-blue" />
            <path d="M104 6 L112 12 L104 18" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
          <h2 className="text-h3 mt-4">Not ready to talk yet?</h2>
          <p className="lead mx-auto mt-3 max-w-md">
            Start with a few questions and see which pathways might fit where you are today.
          </p>
          <p className="mt-5">
            <TextLink to="/explore/pathway-advisor">Discover My Pathway</TextLink>
          </p>
        </div>
      </section>
    </>
  );
}

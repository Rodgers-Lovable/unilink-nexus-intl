import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, GraduationCap, MapPin, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storeApplicationHandoff } from "@/lib/application/applicationService";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { QuestionBlock } from "./PathwayShell";
import { leadFromPathway, saveLead, type ContactMethod } from "@/lib/leads";
import type { PathwayProfile, PathwayResult } from "@/lib/pathway/types";

const contactMethods: ContactMethod[] = ["WhatsApp", "Phone call", "Email"];

export function PathwayResults({
  profile,
  result,
  onRestart,
}: {
  profile: PathwayProfile;
  result: PathwayResult;
  onRestart: () => void;
}) {
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", notes: "" });
  const [method, setMethod] = useState<ContactMethod>("WhatsApp");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.fullName.trim()) next['fullName'] = "Please add your name.";
    if (!form.email.trim()) next['email'] = "Please add an email address.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setSaving(true);
    await saveLead({
      ...leadFromPathway(profile, result, {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        preferredContactMethod: method,
      }),
      notes: [profile.notes, form.notes].filter(Boolean).join(" | "),
    });
    setSaving(false);
    setSent(true);
  };

  const allInterests = [...result.interests, ...result.inferredInterests];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-2xl border border-border bg-gradient-to-br from-surface to-background p-6 shadow-card sm:p-10">
        <p className="eyebrow">Your UniLink pathway</p>
        <h2 className="text-h2 mt-3">{result.headline}</h2>
        <p className="lead mt-4">{result.narrative}</p>
      </div>

      {/* Interests */}
      <section className="mt-12">
        <h3 className="text-h3">Your interests</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          What you told us, plus related areas your answers point toward.
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {allInterests.map((interest) => (
            <li
              key={interest}
              className="rounded-full border border-blue/20 bg-blue/6 px-4 py-2 text-sm font-semibold text-navy"
            >
              {interest}
            </li>
          ))}
        </ul>
      </section>

      {/* Careers */}
      <section className="mt-12">
        <h3 className="text-h3">Career areas worth exploring</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {result.careerFamilies.map((career) => (
            <article
              key={career.key}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <span className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-blue/8 text-blue">
                <Compass className="size-5" aria-hidden="true" />
              </span>
              <h4 className="text-base font-bold">{career.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {career.description}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Roles to look into: {career.exampleRoles.join(", ")}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Degrees */}
      <section className="mt-12">
        <h3 className="text-h3">Degree pathways worth investigating</h3>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {result.degreeFamilies.map((degree) => (
            <article
              key={degree.key}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-green">
                <GraduationCap className="size-4" aria-hidden="true" />
                {degree.relatedTo}
              </span>
              <h4 className="mt-3 text-base font-bold">{degree.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {degree.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="mt-12">
        <h3 className="text-h3">Destinations to explore</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Exploratory options based on your budget, language and travel preferences — not confirmed
          placements.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {result.destinations.map((destination) => (
            <article
              key={destination.name}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <h4 className="flex items-center gap-2 text-base font-bold">
                <MapPin className="size-4 text-blue" aria-hidden="true" />
                {destination.name}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {destination.why}
              </p>
              <dl className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <div>
                  <dt className="inline font-semibold text-navy">Budget: </dt>
                  <dd className="inline">{destination.budget}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-navy">Language: </dt>
                  <dd className="inline">{destination.language}</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-navy">Distance: </dt>
                  <dd className="inline">{destination.distance}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* Next steps */}
      <section className="mt-12">
        <h3 className="text-h3">Your suggested next steps</h3>
        <ol className="mt-6 space-y-4">
          {result.nextSteps.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                {i + 1}
              </span>
              <div>
                <p className="text-base font-bold text-navy">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Ready to apply */}
      <section className="mt-12 rounded-2xl border border-orange/30 bg-orange/5 p-6 sm:p-8">
        <h3 className="text-h3">Ready to take the next step?</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Start your application profile and we&apos;ll carry over what you&apos;ve told us here, so
          you don&apos;t have to answer the same questions twice.
        </p>
        <Button asChild variant="cta" size="lg" className="mt-5">
          <Link to="/apply" onClick={() => storeApplicationHandoff(profile)}>
            Start My Application
          </Link>
        </Button>
      </section>

      {/* Adviser */}
      <section className="mt-12 rounded-2xl border border-border bg-surface p-6 shadow-card sm:p-8">
        <h3 className="text-h3">Talk to a UniLink Advisor</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Share your details and an adviser can review this pathway with you and turn it into a
          practical education plan.
        </p>

        {sent ? (
          <div className="mt-6 rounded-xl border border-green/30 bg-green/8 p-5">
            <p className="text-sm font-bold text-navy">Thank you — your pathway has been saved.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              A UniLink adviser will follow up using your preferred contact method.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild variant="cta">
                <Link to="/book-consultation">Book a Consultation</Link>
              </Button>
              <Button variant="outline" onClick={onRestart}>
                <RotateCcw className="size-4" aria-hidden="true" />
                Restart
              </Button>
            </div>
          </div>
        ) : (
          <form className="mt-6 space-y-5" onSubmit={submit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <QuestionBlock label="Full name" error={errors['fullName']}>
                <Input
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  autoComplete="name"
                  aria-label="Full name"
                />
              </QuestionBlock>
              <QuestionBlock label="Email" error={errors['email']}>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  autoComplete="email"
                  aria-label="Email"
                />
              </QuestionBlock>
              <QuestionBlock label="Phone or WhatsApp" hint="Optional">
                <Input
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  autoComplete="tel"
                  aria-label="Phone or WhatsApp"
                />
              </QuestionBlock>
              <QuestionBlock label="Preferred contact method">
                <div className="flex flex-wrap gap-2">
                  {contactMethods.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      aria-pressed={method === m}
                      className={
                        method === m
                          ? "rounded-lg border border-blue bg-blue/8 px-4 py-2.5 text-sm font-semibold text-navy"
                          : "rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:border-blue/40"
                      }
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </QuestionBlock>
            </div>
            <QuestionBlock label="Anything else you'd like your adviser to know?" hint="Optional">
              <Textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                aria-label="Notes for your adviser"
              />
            </QuestionBlock>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="cta" size="lg" disabled={saving}>
                {saving ? "Sending…" : "Talk to a UniLink Advisor"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={onRestart}>
                <RotateCcw className="size-4" aria-hidden="true" />
                Restart
              </Button>
            </div>
          </form>
        )}
      </section>

      <p className="mt-10 rounded-lg border border-dashed border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
        {result.disclaimer}
      </p>
    </div>
  );
}

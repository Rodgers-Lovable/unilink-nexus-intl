import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "./StepShell";
import { OptionGrid } from "./StepShell";
import { Card } from "@/components/site/primitives";
import { saveLead, leadFromAssessment, type ContactMethod } from "@/lib/leads";
import type { EligibilityAssessment, EligibilityProfile, CriterionStatus } from "@/lib/eligibility/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<CriterionStatus, string> = {
  Strong: "bg-green/10 text-green",
  "Needs Review": "bg-blue/10 text-blue",
  "More Information Needed": "bg-muted text-muted-foreground",
};

export function AssessmentResult({
  profile,
  assessment,
  onRestart,
}: {
  profile: EligibilityProfile;
  assessment: EligibilityAssessment;
  onRestart: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredContactMethod: "WhatsApp" as ContactMethod,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!contact.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email)) next.email = "Please enter a valid email address.";
    if (contact.phone.trim().length < 6) next.phone = "Please enter a contact number.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    await saveLead(leadFromAssessment(profile, assessment, contact));
    setSaved(true);
    toast.success("Assessment saved. A Unilink advisor will be in touch.");
  };

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
        <p className="eyebrow">Preliminary assessment</p>
        <h2 className="text-h3 mt-3">{assessment.headline}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Overall status:{" "}
          <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", statusStyles[assessment.overall])}>
            {assessment.overall}
          </span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {assessment.criteria.map((c) => (
          <Card key={c.key}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-bold">{c.label}</h3>
              <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-xs font-bold", statusStyles[c.status])}>
                {c.status}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.detail}</p>
          </Card>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
        <h3 className="text-base font-bold">What this suggests</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{assessment.narrative}</p>
        {assessment.recommendations.length > 0 && (
          <>
            <h4 className="mt-6 text-sm font-bold text-navy">Suggested next steps</h4>
            <ul className="mt-3 space-y-2">
              {assessment.recommendations.map((r) => (
                <li key={r} className="text-sm leading-relaxed text-muted-foreground">
                  • {r}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p className="rounded-lg border border-dashed border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
        {assessment.disclaimer}
      </p>

      {saved ? (
        <div className="rounded-xl border border-green/30 bg-green/6 p-6">
          <h3 className="text-base font-bold text-green">Assessment saved</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Thank you. A Unilink advisor will review your assessment and contact you using your
            preferred method.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="cta">
              <Link to="/book-consultation">Book a Consultation</Link>
            </Button>
            <Button variant="outline" onClick={onRestart}>
              Start Again
            </Button>
          </div>
        </div>
      ) : showForm ? (
        <form onSubmit={submit} noValidate className="space-y-5 rounded-xl border border-border bg-card p-6 sm:p-8">
          <h3 className="text-base font-bold">Talk to an advisor</h3>
          <p className="text-sm text-muted-foreground">
            Your answers and assessment will be attached to your enquiry.
          </p>
          <Field label="Full name" htmlFor="lead-name" error={errors.fullName}>
            <Input
              id="lead-name"
              className="h-12"
              value={contact.fullName}
              onChange={(e) => setContact({ ...contact, fullName: e.target.value })}
            />
          </Field>
          <Field label="Email" htmlFor="lead-email" error={errors.email}>
            <Input
              id="lead-email"
              type="email"
              className="h-12"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
            />
          </Field>
          <Field label="Phone / WhatsApp" htmlFor="lead-phone" error={errors.phone}>
            <Input
              id="lead-phone"
              type="tel"
              className="h-12"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            />
          </Field>
          <OptionGrid
            legend="Preferred contact method"
            name="contactMethod"
            options={["WhatsApp", "Phone call", "Email"]}
            value={contact.preferredContactMethod}
            onChange={(v) => setContact({ ...contact, preferredContactMethod: v as ContactMethod })}
          />
          <div className="flex flex-wrap gap-3 pt-2">
            <Button type="submit" variant="cta" size="lg">
              Save My Assessment
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="cta" size="lg" onClick={() => setShowForm(true)}>
            Save My Assessment &amp; Talk to an Advisor
          </Button>
          <Button variant="outline" size="lg" onClick={onRestart}>
            Start Again
          </Button>
        </div>
      )}
    </div>
  );
}

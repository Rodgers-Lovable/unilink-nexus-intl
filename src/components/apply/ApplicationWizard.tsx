"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Pencil } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { countries } from "@/data/countries";
import {
  academicLevelOptions,
  applicationDestinationOptions,
  applicationSteps,
  emptyApplicationDraft,
  getIntakeOptions,
  performanceOptions,
  targetLevelOptions,
  type ApplicationDraft,
  type ApplicationSource,
  type ApplicationStepKey,
  type StudentApplication,
} from "@/lib/application/types";
import { validateStep, type FieldErrors } from "@/lib/application/validation";
import {
  APPLICATION_DISCLAIMER,
  CONSENT_STATEMENT,
  clearApplicationHandoff,
  mergeDraft,
  readApplicationHandoff,
  readDraft,
  saveDraft,
  submitApplication,
} from "@/lib/application/applicationService";
import {
  ComboboxField,
  ErrorSummary,
  MultiSelectField,
  SelectField,
  StepNav,
  TextAreaField,
  TextField,
} from "./fields";
import { formatEmailBody } from "@/lib/email/format";
import { sendEmail } from "@/lib/email/resend";
import { trackEvent } from "@/lib/analytics/umami";
import { cn } from "@/lib/utils";

function ProgressHeader({ current }: { current: number }) {
  const total = applicationSteps.length;
  return (
    <div className="border-b border-border pb-6">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Step {current + 1} of {total}
        </p>
        <p className="text-xs font-semibold text-blue">{applicationSteps[current]?.label}</p>
      </div>
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current + 1}
        aria-valuetext={`Step ${current + 1} of ${total}: ${applicationSteps[current]?.label}`}
        className="mt-3 flex gap-1.5"
      >
        {applicationSteps.map((step, i) => (
          <span
            key={step.key}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              i < current ? "bg-green" : i === current ? "bg-blue" : "bg-border",
            )}
          />
        ))}
      </div>
      <ol className="mt-4 hidden gap-4 text-xs sm:flex">
        {applicationSteps.map((step, i) => (
          <li
            key={step.key}
            aria-current={i === current ? "step" : undefined}
            className={cn(
              "font-semibold",
              i === current ? "text-navy" : i < current ? "text-green" : "text-muted-foreground",
            )}
          >
            {i + 1}. {step.label}
          </li>
        ))}
      </ol>
    </div>
  );
}

function ReviewSection({
  title,
  onEdit,
  rows,
}: {
  title: string;
  onEdit: () => void;
  rows: { label: string; value: string }[];
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-bold text-navy">{title}</h3>
        <Button type="button" variant="link" className="h-auto p-0 text-sm" onClick={onEdit}>
          <Pencil className="mr-1.5 size-3.5" aria-hidden="true" />
          Edit
          <span className="sr-only"> {title}</span>
        </Button>
      </div>
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 sm:grid-cols-[220px_1fr] sm:gap-4">
            <dt className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {row.label}
            </dt>
            <dd className="text-sm text-foreground">{row.value || "—"}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function ApplicationWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<ApplicationDraft>(emptyApplicationDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [deliveryFailed, setDeliveryFailed] = useState(false);
  const [submitted, setSubmitted] = useState<StudentApplication | null>(null);
  const [source, setSource] = useState<ApplicationSource>("direct_application");
  const [prefilled, setPrefilled] = useState(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const startedTracked = useRef(false);

  const intakeOptions = useMemo(() => getIntakeOptions(), []);
  const step = applicationSteps[stepIndex]?.key as ApplicationStepKey;

  // Hydrate from a saved draft and/or a Pathway Advisor handoff.
  useEffect(() => {
    const handoff = readApplicationHandoff();
    const saved = readDraft();
    let next = emptyApplicationDraft;
    if (saved) next = mergeDraft(next, saved);
    if (handoff) {
      next = mergeDraft(next, handoff);
      setSource("pathway_advisor");
      setPrefilled(true);
      clearApplicationHandoff();
    }
    setDraft(next);
  }, []);

  useEffect(() => {
    if (!submitted) saveDraft(draft);
  }, [draft, submitted]);

  const goTo = (index: number) => {
    setStepIndex(index);
    setErrors({});
    requestAnimationFrame(() => {
      headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const stepErrors = validateStep(step, draft);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    if (step !== "review") {
      if (!startedTracked.current) {
        startedTracked.current = true;
        trackEvent("application-started", { source });
      }
      trackEvent("application-step-completed", { step: stepIndex + 1 });
      goTo(stepIndex + 1);
      return;
    }

    setSubmitting(true);
    setDeliveryFailed(false);
    try {
      const record = await submitApplication(draft, source);

      const delivery = await sendEmail("application", {
        form_name: "Student application profile",
        from_name: record.personal.fullName,
        reply_to: record.personal.email,
        phone: record.personal.phone,
        reference: record.reference,
        message: record.additionalInformation || "No additional information",
        summary: formatEmailBody({
          Reference: record.reference,
          Source: record.source,
          "Full name": record.personal.fullName,
          Email: record.personal.email,
          "Phone / WhatsApp": record.personal.phone,
          Nationality: record.personal.nationality,
          "Country of residence": record.personal.countryOfResidence,
          "Highest academic level": record.academic.highestAcademicLevel,
          Institution: record.academic.institution,
          Qualification: record.academic.qualification,
          "Completion year": record.academic.completionYear,
          Performance: record.academic.performance,
          "Target level": record.studyPlan.targetLevel,
          "Preferred course": record.studyPlan.preferredCourse,
          "Preferred destinations": record.studyPlan.preferredDestinations,
          "Preferred intake": record.studyPlan.preferredIntake,
          "Additional information": record.additionalInformation,
          "Consent given": record.consent ? "Yes" : "No",
          Submitted: new Date(record.createdAt).toLocaleString(),
        }),
      });

      if (delivery.status === "error") setDeliveryFailed(true);

      trackEvent("application-submitted", {
        source: record.source,
        delivery: delivery.status,
        targetLevel: record.studyPlan.targetLevel,
      });
      setSubmitted(record);
      requestAnimationFrame(() => {
        headingRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } finally {
      setSubmitting(false);
    }
  };

  const setPersonal = (patch: Partial<ApplicationDraft["personal"]>) =>
    setDraft((d) => ({ ...d, personal: { ...d.personal, ...patch } }));
  const setAcademic = (patch: Partial<ApplicationDraft["academic"]>) =>
    setDraft((d) => ({ ...d, academic: { ...d.academic, ...patch } }));
  const setStudyPlan = (patch: Partial<ApplicationDraft["studyPlan"]>) =>
    setDraft((d) => ({ ...d, studyPlan: { ...d.studyPlan, ...patch } }));

  const toggleDestination = (value: string) =>
    setDraft((d) => {
      const current = d.studyPlan.preferredDestinations;
      const next =
        value === "I'm not sure yet"
          ? current.includes(value)
            ? []
            : [value]
          : current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current.filter((v) => v !== "I'm not sure yet"), value];
      return { ...d, studyPlan: { ...d.studyPlan, preferredDestinations: next } };
    });

  if (submitted) {
    return (
      <div ref={headingRef} className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <span className="mx-auto inline-flex size-14 items-center justify-center rounded-full bg-green/10 text-green">
            <CheckCircle2 className="size-7" aria-hidden="true" />
          </span>
          <h2 className="text-h2 mt-6">Your application profile has been submitted.</h2>
          <p className="lead mt-4">
            A UniLink adviser will review your academic background and study goals, then reach out
            about next steps.
          </p>
          <div className="mt-8 rounded-xl border border-border bg-surface p-5">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              Your reference number
            </p>
            <p className="mt-2 text-lg font-extrabold tracking-wide text-navy">
              {submitted.reference}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Keep this reference for any follow-up.
            </p>
          </div>
          {deliveryFailed && (
            <p
              role="alert"
              className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm leading-relaxed text-destructive"
            >
              Your profile is saved with the reference above, but our email notification did not go
              through. Please quote this reference when you contact us so we can pick it up quickly.
            </p>
          )}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="cta" size="lg">
              <Link href="/resources">Explore Resources</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          {APPLICATION_DISCLAIMER}
        </p>
      </div>
    );
  }

  return (
    <div ref={headingRef} className="mx-auto max-w-3xl">
      {prefilled && (
        <p className="mb-6 rounded-lg border border-green/30 bg-green/5 px-4 py-3 text-sm text-navy">
          We&apos;ve carried over what you told the Pathway Advisor. Review it and update anything
          that&apos;s changed.
        </p>
      )}

      <form
        noValidate
        onSubmit={handleSubmit}
        className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
      >
        <ProgressHeader current={stepIndex} />

        <div className="space-y-6 py-8">
          <ErrorSummary errors={errors} />

          <AnimatePresence mode="wait">
            {step === "personal" && (
              <motion.fieldset
                key="personal"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <legend className="sr-only">About you</legend>
                <TextField
                  label="Full Name"
                  required
                  autoComplete="name"
                  value={draft.personal.fullName}
                  onChange={(v) => setPersonal({ fullName: v })}
                  error={errors["fullName"]}
                  placeholder="As it appears on your academic documents"
                />
                <TextField
                  label="Email Address"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={draft.personal.email}
                  onChange={(v) => setPersonal({ email: v })}
                  error={errors["email"]}
                  placeholder="name@example.com"
                />
                <TextField
                  label="Phone / WhatsApp Number"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={draft.personal.phone}
                  onChange={(v) => setPersonal({ phone: v })}
                  error={errors["phone"]}
                  hint="Include your country code so an adviser can reach you."
                  placeholder="+257 00 000 000"
                />
                <ComboboxField
                  label="Nationality"
                  required
                  options={countries}
                  value={draft.personal.nationality}
                  onChange={(v) => setPersonal({ nationality: v })}
                  error={errors["nationality"]}
                />
                <ComboboxField
                  label="Current Country of Residence"
                  required
                  options={countries}
                  value={draft.personal.countryOfResidence}
                  onChange={(v) => setPersonal({ countryOfResidence: v })}
                  error={errors["countryOfResidence"]}
                />
              </motion.fieldset>
            )}

            {step === "academic" && (
              <motion.fieldset
                key="academic"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <legend className="sr-only">Academic background</legend>
                <SelectField
                  label="Highest Academic Level"
                  required
                  options={academicLevelOptions}
                  value={draft.academic.highestAcademicLevel}
                  onChange={(v) => setAcademic({ highestAcademicLevel: v })}
                  error={errors["highestAcademicLevel"]}
                />
                <TextField
                  label="Last Academic Institution Attended"
                  required
                  value={draft.academic.institution}
                  onChange={(v) => setAcademic({ institution: v })}
                  error={errors["institution"]}
                  placeholder="School, college or university name"
                />
                <TextField
                  label="Qualification / Programme"
                  value={draft.academic.qualification}
                  onChange={(v) => setAcademic({ qualification: v })}
                  error={errors["qualification"]}
                  placeholder="For example: A-Levels, BSc Economics"
                />
                <TextField
                  label="Year Completed or Expected Completion"
                  inputMode="numeric"
                  value={draft.academic.completionYear}
                  onChange={(v) => setAcademic({ completionYear: v })}
                  error={errors["completionYear"]}
                  placeholder="2026"
                />
                <SelectField
                  label="Academic performance"
                  options={performanceOptions}
                  value={draft.academic.performance}
                  onChange={(v) => setAcademic({ performance: v })}
                  error={errors["performance"]}
                  hint="A general indication is enough. Exact grades are not needed at this stage."
                  placeholder="Optional"
                />
              </motion.fieldset>
            )}

            {step === "studyPlan" && (
              <motion.fieldset
                key="studyPlan"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                <legend className="sr-only">Study plans</legend>
                <SelectField
                  label="What level would you like to study?"
                  required
                  options={targetLevelOptions}
                  value={draft.studyPlan.targetLevel}
                  onChange={(v) => setStudyPlan({ targetLevel: v })}
                  error={errors["targetLevel"]}
                />
                <TextField
                  label="What would you like to study?"
                  required
                  value={draft.studyPlan.preferredCourse}
                  onChange={(v) => setStudyPlan({ preferredCourse: v })}
                  error={errors["preferredCourse"]}
                  hint="A course, subject or broad field is fine. For example, “Data Science” or “something in health”."
                  placeholder="Course or subject area"
                />
                <MultiSelectField
                  label="Where would you like to study?"
                  required
                  options={applicationDestinationOptions}
                  values={draft.studyPlan.preferredDestinations}
                  onToggle={toggleDestination}
                  error={errors["preferredDestinations"]}
                  hint="Select as many as you are considering. These are destinations we can advise on, not university partnerships."
                />
                <SelectField
                  label="Preferred intake"
                  options={intakeOptions}
                  value={draft.studyPlan.preferredIntake}
                  onChange={(v) => setStudyPlan({ preferredIntake: v })}
                  error={errors["preferredIntake"]}
                  placeholder="Optional"
                />
                <TextAreaField
                  label="Anything else you'd like your UniLink adviser to know?"
                  value={draft.additionalInformation}
                  onChange={(v) => setDraft((d) => ({ ...d, additionalInformation: v }))}
                  error={errors["additionalInformation"]}
                  hint="You can tell us about your goals, preferred universities, budget considerations, previous applications, or anything you're unsure about."
                  placeholder="Optional"
                />
              </motion.fieldset>
            )}

            {step === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-h3 font-bold text-navy">Review Your Application</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Check everything below, then confirm your consent to submit.
                  </p>
                </div>

                <ReviewSection
                  title="Personal Information"
                  onEdit={() => goTo(0)}
                  rows={[
                    { label: "Full name", value: draft.personal.fullName },
                    { label: "Email address", value: draft.personal.email },
                    { label: "Phone / WhatsApp", value: draft.personal.phone },
                    { label: "Nationality", value: draft.personal.nationality },
                    { label: "Country of residence", value: draft.personal.countryOfResidence },
                  ]}
                />

                <ReviewSection
                  title="Academic Background"
                  onEdit={() => goTo(1)}
                  rows={[
                    { label: "Highest academic level", value: draft.academic.highestAcademicLevel },
                    { label: "Last institution", value: draft.academic.institution },
                    { label: "Qualification / programme", value: draft.academic.qualification },
                    { label: "Completion year", value: draft.academic.completionYear },
                    { label: "Academic performance", value: draft.academic.performance },
                  ]}
                />

                <ReviewSection
                  title="Study Plans"
                  onEdit={() => goTo(2)}
                  rows={[
                    { label: "Target level", value: draft.studyPlan.targetLevel },
                    { label: "Preferred course", value: draft.studyPlan.preferredCourse },
                    {
                      label: "Preferred destinations",
                      value: draft.studyPlan.preferredDestinations.join(", "),
                    },
                    { label: "Preferred intake", value: draft.studyPlan.preferredIntake },
                    { label: "Additional information", value: draft.additionalInformation },
                  ]}
                />

                <div className="rounded-xl border border-border p-5">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="application-consent"
                      checked={draft.consent}
                      aria-describedby={errors["consent"] ? "consent-error" : undefined}
                      onCheckedChange={(checked) =>
                        setDraft((d) => ({ ...d, consent: checked === true }))
                      }
                      className="mt-0.5"
                    />
                    <label
                      htmlFor="application-consent"
                      className="text-sm leading-relaxed text-foreground"
                    >
                      {CONSENT_STATEMENT}
                    </label>
                  </div>
                  {errors["consent"] && (
                    <p
                      id="consent-error"
                      role="alert"
                      className="mt-3 text-xs font-medium text-destructive"
                    >
                      {errors["consent"]}
                    </p>
                  )}
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                    Please only provide information necessary for your education enquiry. Read our{" "}
                    <Link
                      href="/legal/privacy-policy"
                      className="font-semibold text-blue hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <StepNav
          {...(stepIndex > 0 ? { onBack: () => goTo(stepIndex - 1) } : {})}
          nextLabel={step === "review" ? "Submit Application" : "Continue"}
          submitting={submitting}
        />
      </form>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">{APPLICATION_DISCLAIMER}</p>
    </div>
  );
}

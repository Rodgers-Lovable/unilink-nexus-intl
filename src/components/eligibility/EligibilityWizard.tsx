import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, OptionGrid, ProgressIndicator, stepLabels } from "./StepShell";
import { AssessmentResult } from "./AssessmentResult";
import { eligibilityService } from "@/lib/eligibility/eligibilityService";
import { emptyProfile, type EligibilityAssessment, type EligibilityProfile } from "@/lib/eligibility/types";
import { destinations } from "@/data/destinations";

const fieldSuggestions = [
  "Business & Management",
  "Computer Science",
  "Data Science",
  "Engineering",
  "Nursing & Health",
  "Law",
  "Education",
  "Economics & Finance",
  "Architecture",
  "Agriculture",
];

const intakes = ["Next available intake", "Within 6 months", "Within 12 months", "In more than a year", "Not sure yet"];

export function EligibilityWizard() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<EligibilityProfile>(emptyProfile);
  const [assessment, setAssessment] = useState<EligibilityAssessment | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof EligibilityProfile>(key: K, value: EligibilityProfile[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const toggleDestination = (name: string) =>
    setProfile((p) => ({
      ...p,
      preferredDestinations: p.preferredDestinations.includes(name)
        ? p.preferredDestinations.filter((d) => d !== name)
        : [...p.preferredDestinations, name],
    }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (step === 0) {
      if (!profile.targetStudyLevel) next['targetStudyLevel'] = "Please choose a study level.";
      if (!profile.targetField.trim()) next['targetField'] = "Please tell us your field of interest.";
    }
    if (step === 1) {
      if (!profile.highestQualification) next['highestQualification'] = "Please choose your highest qualification.";
      if (!profile.graduationYear.trim()) next['graduationYear'] = "Please add the year you completed it.";
    }
    if (step === 2 && profile.preferredDestinations.length === 0) {
      next['preferredDestinations'] = "Select at least one option, including “I'm not sure”.";
    }
    if (step === 3) {
      if (!profile.currentCountry.trim()) next['currentCountry'] = "Please add your current country.";
      if (!profile.targetIntake) next['targetIntake'] = "Please choose a preferred intake.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = async () => {
    if (!validate()) return;
    if (step === 3) {
      setLoading(true);
      const result = await eligibilityService.generateAssessmentSummary(profile);
      setAssessment(result);
      setLoading(false);
    }
    setStep((s) => Math.min(s + 1, 4));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setProfile(emptyProfile);
    setAssessment(null);
    setErrors({});
    setStep(0);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <ProgressIndicator current={step} />

      <div className="mt-10">
        <p className="eyebrow">
          Step {step + 1} of 5 — {stepLabels[step]}
        </p>

        {step === 0 && (
          <div className="mt-6 space-y-8">
            <OptionGrid
              legend="What level would you like to study?"
              name="studyLevel"
              options={["Bachelor's", "Master's", "PhD", "Diploma / Certificate", "Not sure yet"]}
              value={profile.targetStudyLevel}
              onChange={(v) => set("targetStudyLevel", v as EligibilityProfile["targetStudyLevel"])}
            />
            {errors['targetStudyLevel'] && (
              <p role="alert" className="text-xs font-medium text-destructive">{errors['targetStudyLevel']}</p>
            )}
            <Field
              label="What subject or field are you interested in?"
              htmlFor="targetField"
              hint="Start typing to see suggestions, or enter your own."
              error={errors['targetField']}
            >
              <Input
                id="targetField"
                list="field-suggestions"
                className="h-12"
                value={profile.targetField}
                onChange={(e) => set("targetField", e.target.value)}
                placeholder="e.g. Data Science"
              />
              <datalist id="field-suggestions">
                {fieldSuggestions.map((f) => (
                  <option key={f} value={f} />
                ))}
              </datalist>
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="mt-6 space-y-8">
            <OptionGrid
              legend="What is your highest completed qualification?"
              name="qualification"
              options={["Secondary school", "Diploma", "Bachelor's degree", "Master's degree", "Other"]}
              value={profile.highestQualification}
              onChange={(v) => set("highestQualification", v as EligibilityProfile["highestQualification"])}
            />
            {errors['highestQualification'] && (
              <p role="alert" className="text-xs font-medium text-destructive">{errors['highestQualification']}</p>
            )}

            {profile.highestQualification && (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Qualification name" htmlFor="qualName">
                  <Input
                    id="qualName"
                    className="h-12"
                    value={profile.qualificationName}
                    onChange={(e) => set("qualificationName", e.target.value)}
                    placeholder="e.g. BSc Computer Science"
                  />
                </Field>
                <Field label="Institution" htmlFor="qualInstitution">
                  <Input
                    id="qualInstitution"
                    className="h-12"
                    value={profile.qualificationInstitution}
                    onChange={(e) => set("qualificationInstitution", e.target.value)}
                  />
                </Field>
                <Field label="Field of study" htmlFor="qualField">
                  <Input
                    id="qualField"
                    className="h-12"
                    value={profile.qualificationField}
                    onChange={(e) => set("qualificationField", e.target.value)}
                  />
                </Field>
                <Field label="Year completed" htmlFor="gradYear" error={errors['graduationYear']}>
                  <Input
                    id="gradYear"
                    inputMode="numeric"
                    className="h-12"
                    value={profile.graduationYear}
                    onChange={(e) => set("graduationYear", e.target.value)}
                    placeholder="e.g. 2024"
                  />
                </Field>
                <Field label="Grading system" htmlFor="gradeScale">
                  <select
                    id="gradeScale"
                    className="h-12 w-full rounded-lg border border-border bg-card px-3 text-sm"
                    value={profile.gradeScale}
                    onChange={(e) => set("gradeScale", e.target.value as EligibilityProfile["gradeScale"])}
                  >
                    <option value="">Select…</option>
                    {["Percentage", "GPA (4.0)", "Letter grade", "Classification", "Other"].map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Approximate grade / GPA" htmlFor="grade">
                  <Input
                    id="grade"
                    className="h-12"
                    value={profile.qualificationGrade}
                    onChange={(e) => set("qualificationGrade", e.target.value)}
                    placeholder="e.g. 72% or 3.4"
                  />
                </Field>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 space-y-6">
            <OptionGrid
              legend="Where would you like to study? Select all that apply."
              name="destinations"
              multiple
              options={[...destinations.map((d) => d.name), "I'm not sure — help me decide"]}
              value={profile.preferredDestinations}
              onChange={toggleDestination}
            />
            {errors['preferredDestinations'] && (
              <p role="alert" className="text-xs font-medium text-destructive">{errors['preferredDestinations']}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Supported destinations are placeholders and will be confirmed. [Content to be confirmed]
            </p>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Current country" htmlFor="currentCountry" error={errors['currentCountry']}>
                <Input
                  id="currentCountry"
                  className="h-12"
                  value={profile.currentCountry}
                  onChange={(e) => set("currentCountry", e.target.value)}
                />
              </Field>
              <Field label="Preferred intake" htmlFor="intake" error={errors['targetIntake']}>
                <select
                  id="intake"
                  className="h-12 w-full rounded-lg border border-border bg-card px-3 text-sm"
                  value={profile.targetIntake}
                  onChange={(e) => set("targetIntake", e.target.value)}
                >
                  <option value="">Select…</option>
                  {intakes.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <OptionGrid
              legend="English proficiency test status"
              name="englishTest"
              options={["IELTS", "TOEFL", "PTE", "Duolingo", "Not taken yet", "Not required"]}
              value={profile.englishTestType}
              onChange={(v) => set("englishTestType", v as EligibilityProfile["englishTestType"])}
            />

            {profile.englishTestType &&
              !["Not taken yet", "Not required"].includes(profile.englishTestType) && (
                <Field label="Test score" htmlFor="testScore">
                  <Input
                    id="testScore"
                    className="h-12 max-w-xs"
                    value={profile.englishTestScore}
                    onChange={(e) => set("englishTestScore", e.target.value)}
                    placeholder="e.g. 6.5"
                  />
                </Field>
              )}

            <OptionGrid
              legend="Approximate tuition budget per year"
              name="budget"
              options={[
                "Under 10,000 USD / year",
                "10,000 – 20,000 USD / year",
                "20,000 – 35,000 USD / year",
                "Over 35,000 USD / year",
                "Not sure yet",
              ]}
              value={profile.budgetRange}
              onChange={(v) => set("budgetRange", v as EligibilityProfile["budgetRange"])}
            />

            <Field
              label="Anything else we should know?"
              htmlFor="context"
              hint="Optional — scholarships, dependants, gaps in study, or specific questions."
            >
              <Textarea
                id="context"
                rows={4}
                value={profile.additionalContext}
                onChange={(e) => set("additionalContext", e.target.value)}
              />
            </Field>
          </div>
        )}

        {step === 4 && assessment && (
          <div className="mt-6">
            <AssessmentResult profile={profile} assessment={assessment} onRestart={restart} />
          </div>
        )}
      </div>

      {step < 4 && (
        <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            Back
          </Button>
          <Button variant="cta" size="lg" onClick={next} disabled={loading}>
            {loading ? "Preparing your assessment…" : step === 3 ? "See My Assessment" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}

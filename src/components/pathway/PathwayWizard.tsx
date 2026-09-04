"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChoiceCards, ProgressBar, QuestionBlock, StepHeader, stepLabels } from "./PathwayShell";
import { PathwayResults } from "./PathwayResults";
import { pathwayService } from "@/lib/pathway/pathwayService";
import { trackEvent } from "@/lib/analytics/umami";
import {
  budgetOptions,
  countryOptions,
  countryFlags,
  curriculumOptions,
  destinationOptions,
  emptyPathwayProfile,
  interestOptions,
  languageOptions,
  performanceOptions,
  scholarshipOptions,
  situationOptions,
  stageOptions,
  subjectOptions,
  travelOptions,
  type PathwayProfile,
  type PathwayResult,
} from "@/lib/pathway/types";

const LAST_STEP = stepLabels.length - 1;

export function PathwayWizard() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<PathwayProfile>(emptyPathwayProfile);
  const [result, setResult] = useState<PathwayResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const startedTracked = useRef(false);

  const set = <K extends keyof PathwayProfile>(key: K, value: PathwayProfile[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const toggle =
    (key: "interests" | "subjects" | "preferredDestinations" | "studentSituation") =>
    (option: string) =>
      setProfile((p) => ({
        ...p,
        [key]: p[key].includes(option) ? p[key].filter((v) => v !== option) : [...p[key], option],
      }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (step === 0 && profile.interests.length === 0) {
      next["interests"] = "Pick at least one. “I'm not sure yet” is a valid answer.";
    }
    if (step === 2) {
      if (!profile.country) next["country"] = "Please choose where you currently live.";
      if (!profile.level) next["level"] = "Please choose the stage you're at.";
    }
    if (step === 3 && profile.preferredDestinations.length === 0) {
      next["preferredDestinations"] = "Choose at least one, or select “Show me everything”.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const scrollUp = () => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const next = async () => {
    if (!validate()) return;

    if (!startedTracked.current) {
      startedTracked.current = true;
      trackEvent("pathway-advisor-started");
    }

    if (step === LAST_STEP - 1) {
      setLoading(true);

      const generated = await pathwayService.generatePathway(profile);
      setResult(generated);
      setLoading(false);

      trackEvent("pathway-advisor-completed", {
        country: profile.country,
        level: profile.level,
        careerFamilies: generated.careerFamilies.map((c) => c.title).join(", "),
        destinations: generated.destinations.map((d) => d.name).join(", "),
      });
    }

    setStep((s) => Math.min(s + 1, LAST_STEP));
    // scrollUp();
  };

  const back = () => {
    setStep((s) => Math.max(s - 1, 0));
    // scrollUp();
  };

  const restart = () => {
    setProfile(emptyPathwayProfile);
    setResult(null);
    setErrors({});
    setStep(0);
    scrollUp();
  };

  if (step === LAST_STEP && result) {
    return <PathwayResults profile={profile} result={result} onRestart={restart} />;
  }

  const stepVariants = {
    initial: { opacity: 0, x: 18 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -12 },
  };

  return (
    <div className="mx-auto max-w-3xl">
      <ProgressBar current={step} />

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="step-0"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepHeader
              question="What are you curious about?"
              helper="Pick as many as you like. There are no wrong answers."
            />
            <ChoiceCards
              legend="Interests"
              options={interestOptions}
              value={profile.interests}
              onSelect={toggle("interests")}
              multiple
              columns={2}
            />
            {errors["interests"] && (
              <p role="alert" className="mt-3 text-xs font-medium text-destructive">
                {errors["interests"]}
              </p>
            )}
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="step-1"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepHeader
              question="What are you good at or enjoy studying?"
              helper="Not sure? Choose the subjects you enjoy most."
            />
            <ChoiceCards
              legend="Subjects and strengths"
              options={subjectOptions}
              value={profile.subjects}
              onSelect={toggle("subjects")}
              multiple
              columns={2}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step-2"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepHeader
              question="Where are you in your studies right now?"
              helper="This helps us keep suggestions realistic for your stage."
            />
            <div className="mt-6 space-y-10">
              <QuestionBlock label="Country of residence" error={errors["country"]}>
                <ChoiceCards
                  legend="Country of residence"
                  options={countryOptions}
                  value={profile.country}
                  onSelect={(v) => set("country", v)}
                  columns={2}
                  flags={countryFlags}
                />
              </QuestionBlock>

              <QuestionBlock label="What stage are you at?" error={errors["level"]}>
                <ChoiceCards
                  legend="Stage of study"
                  options={stageOptions}
                  value={profile.level}
                  onSelect={(v) => set("level", v)}
                  columns={2}
                />
              </QuestionBlock>

              <QuestionBlock label="What curriculum or qualification are you following?">
                <ChoiceCards
                  legend="Curriculum"
                  options={curriculumOptions}
                  value={profile.curriculum}
                  onSelect={(v) => set("curriculum", v)}
                  columns={2}
                />
              </QuestionBlock>

              <QuestionBlock
                label="How would you describe your current academic performance?"
                hint="An honest estimate is enough. Exact grades are not needed yet."
              >
                <ChoiceCards
                  legend="Academic performance"
                  options={performanceOptions}
                  value={profile.performance}
                  onSelect={(v) => set("performance", v)}
                  columns={2}
                />
              </QuestionBlock>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step-3"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepHeader
              question="Where would you like to study?"
              helper="You don't need to choose one country. We can compare several options."
            />
            <ChoiceCards
              legend="Destinations"
              options={destinationOptions}
              value={profile.preferredDestinations}
              onSelect={toggle("preferredDestinations")}
              multiple
              columns={3}
              flags={countryFlags}
            />
            {errors["preferredDestinations"] && (
              <p role="alert" className="mt-3 text-xs font-medium text-destructive">
                {errors["preferredDestinations"]}
              </p>
            )}
            <p className="mt-5 rounded-lg border border-dashed border-border bg-surface p-4 text-xs leading-relaxed text-muted-foreground">
              These are exploratory destination options. UniLink does not claim to represent
              institutions in these destinations.
            </p>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step-4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepHeader
              question="A few practical preferences"
              helper="Your budget does not define your potential. It helps us identify realistic routes and understand where funding may matter."
            />
            <div className="mt-6 space-y-10">
              <QuestionBlock label="Approximate annual budget">
                <ChoiceCards
                  legend="Budget"
                  options={budgetOptions}
                  value={profile.budgetRange}
                  onSelect={(v) => set("budgetRange", v)}
                  columns={2}
                />
              </QuestionBlock>

              <QuestionBlock label="Would funding or a scholarship be important?">
                <ChoiceCards
                  legend="Funding importance"
                  options={scholarshipOptions}
                  value={profile.scholarshipImportance}
                  onSelect={(v) => set("scholarshipImportance", v)}
                  columns={2}
                />
              </QuestionBlock>

              <QuestionBlock label="Preferred teaching language">
                <ChoiceCards
                  legend="Teaching language"
                  options={languageOptions}
                  value={profile.languagePreference}
                  onSelect={(v) => set("languagePreference", v)}
                  columns={2}
                />
              </QuestionBlock>

              <QuestionBlock label="How far are you willing to travel?">
                <ChoiceCards
                  legend="Travel preference"
                  options={travelOptions}
                  value={profile.travelPreference}
                  onSelect={(v) => set("travelPreference", v)}
                  columns={1}
                />
              </QuestionBlock>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step-5"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <StepHeader
              question="Anything else about your situation?"
              helper="All optional. Only share information you're comfortable providing."
            />
            <div className="mt-6 space-y-10">
              <QuestionBlock label="Which of these describe you?">
                <ChoiceCards
                  legend="Your situation"
                  options={situationOptions}
                  value={profile.studentSituation}
                  onSelect={toggle("studentSituation")}
                  multiple
                  columns={2}
                />
              </QuestionBlock>

              <QuestionBlock label="Target study year" hint="For example 2027, or leave blank.">
                <Input
                  value={profile.targetEntryYear}
                  onChange={(e) => set("targetEntryYear", e.target.value)}
                  inputMode="numeric"
                  placeholder="2027"
                  aria-label="Target study year"
                />
              </QuestionBlock>

              <QuestionBlock label="Notes" hint="Anything you'd like an adviser to know.">
                <Textarea
                  rows={4}
                  value={profile.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  aria-label="Additional notes"
                />
              </QuestionBlock>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="outline" size="lg" onClick={back} disabled={step === 0}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back
        </Button>
        <Button variant="cta" size="lg" onClick={next} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Building your pathway…
            </>
          ) : (
            <>
              {step === LAST_STEP - 1 ? "See my pathway" : "Continue"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

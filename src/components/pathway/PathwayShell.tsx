"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const stepLabels = [
  "Interests",
  "Subjects",
  "Your studies",
  "Destinations",
  "Preferences",
  "About you",
  "Your pathway",
];

export function ProgressBar({ current }: { current: number }) {
  const total = stepLabels.length;
  const pct = Math.round(((current + 1) / total) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Step {current + 1} of {total}
        </p>
        <p className="text-xs font-semibold text-navy">{stepLabels[current]}</p>
      </div>
      <div
        className="mt-3 h-2 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Pathway advisor progress"
      >
        <div
          className="h-full rounded-full bg-linear-to-r from-blue to-green transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function StepHeader({
  question,
  helper,
}: {
  question: string;
  helper?: string | undefined;
}) {
  return (
    <div className="mt-8">
      <h2 className="text-h3 text-navy">{question}</h2>
      {helper && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{helper}</p>}
    </div>
  );
}

export function ChoiceCards({
  legend,
  options,
  value,
  onSelect,
  multiple = false,
  columns = 2,
}: {
  legend: string;
  options: readonly string[];
  value: string | string[];
  onSelect: (option: string) => void;
  multiple?: boolean;
  columns?: 1 | 2 | 3;
}) {
  const isSelected = (opt: string) => (Array.isArray(value) ? value.includes(opt) : value === opt);

  return (
    <fieldset className="mt-6">
      <legend className="sr-only">{legend}</legend>
      <div
        className={cn(
          "grid gap-3",
          columns === 1 && "grid-cols-1",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {options.map((opt) => {
          const selected = isSelected(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              aria-pressed={selected}
              className={cn(
                "flex min-h-14 items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-150",
                selected
                  ? "border-blue bg-blue/8 text-navy shadow-card"
                  : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-blue/40 hover:shadow-card",
              )}
            >
              <span>{opt}</span>
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex size-5 shrink-0 items-center justify-center border transition-colors",
                  multiple ? "rounded-md" : "rounded-full",
                  selected ? "border-blue bg-blue text-white" : "border-border bg-surface",
                )}
              >
                {selected && <Check className="size-3.5" />}
              </span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function QuestionBlock({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-bold text-navy">{label}</p>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

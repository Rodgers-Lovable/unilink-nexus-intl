import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const stepLabels = ["Goal", "Education", "Destination", "Profile", "Assessment"];

export function ProgressIndicator({ current }: { current: number }) {
  return (
    <nav aria-label="Assessment progress">
      <ol className="flex flex-wrap gap-2 sm:gap-3">
        {stepLabels.map((label, i) => {
          const state = i < current ? "done" : i === current ? "active" : "todo";
          return (
            <li key={label} className="flex-1 min-w-[92px]">
              <div
                className={cn(
                  "h-1.5 w-full rounded-full",
                  state === "done" ? "bg-green" : state === "active" ? "bg-blue" : "bg-border",
                )}
              />
              <p
                className={cn(
                  "mt-2 text-xs font-semibold",
                  state === "todo" ? "text-muted-foreground" : "text-navy",
                )}
              >
                <span className="sr-only">Step </span>
                {i + 1}. {label}
                {state === "active" && <span className="sr-only"> (current step)</span>}
              </p>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor?: string | undefined;
  hint?: string | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-navy">
        {label}
      </label>
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

export function OptionGrid({
  name,
  options,
  value,
  onChange,
  multiple = false,
  legend,
}: {
  name: string;
  options: string[];
  value: string | string[];
  onChange: (value: string) => void;
  multiple?: boolean;
  legend: string;
}) {
  const selected = (opt: string) => (Array.isArray(value) ? value.includes(opt) : value === opt);

  return (
    <fieldset>
      <legend className="mb-3 block text-sm font-semibold text-navy">{legend}</legend>
      <div className="grid gap-2.5 sm:grid-cols-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={cn(
              "flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
              selected(opt)
                ? "border-blue bg-blue/6 text-navy"
                : "border-border bg-card text-foreground hover:border-blue/40",
            )}
          >
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              value={opt}
              checked={selected(opt)}
              onChange={() => onChange(opt)}
              className="size-4 accent-[var(--blue)]"
            />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

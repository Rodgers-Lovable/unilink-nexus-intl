import { useId, useState, type ReactNode } from "react";
import { AlertCircle, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export function FieldShell({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
  hint?: string | undefined;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-navy">
        {label}
        {required && (
          <span className="ml-1 text-orange" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </Label>
      {hint && (
        <p id={`${id}-hint`} className="text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-xs font-medium text-destructive"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

type BaseProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean | undefined;
  hint?: string | undefined;
  error?: string | undefined;
  placeholder?: string | undefined;
};

export function TextField({
  type = "text",
  inputMode,
  autoComplete,
  ...props
}: BaseProps & {
  type?: string;
  inputMode?: "text" | "email" | "tel" | "numeric";
  autoComplete?: string;
}) {
  const id = useId();
  const { label, value, onChange, required, hint, error, placeholder } = props;
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <Input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && `${id}-hint`, error && `${id}-error`) || undefined}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 bg-background"
      />
    </FieldShell>
  );
}

export function TextAreaField(props: BaseProps & { rows?: number }) {
  const id = useId();
  const { label, value, onChange, required, hint, error, placeholder, rows = 5 } = props;
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <Textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && `${id}-hint`, error && `${id}-error`) || undefined}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-32 bg-background"
      />
    </FieldShell>
  );
}

/** Native select — reliable, accessible and comfortable on mobile. */
export function SelectField({
  options,
  ...props
}: BaseProps & { options: readonly string[] }) {
  const id = useId();
  const { label, value, onChange, required, hint, error, placeholder = "Select an option" } = props;
  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <select
        id={id}
        value={value}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={cn(hint && `${id}-hint`, error && `${id}-error`) || undefined}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

/** Searchable single-select, used for country fields. */
export function ComboboxField({
  options,
  ...props
}: BaseProps & { options: readonly string[] }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const { label, value, onChange, required, hint, error, placeholder = "Search and select" } = props;

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-invalid={error ? true : undefined}
            aria-describedby={cn(hint && `${id}-hint`, error && `${id}-error`) || undefined}
            className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 text-left text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <span className={cn(!value && "text-muted-foreground")}>{value || placeholder}</span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" aria-hidden="true" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}…`} />
            <CommandList>
              <CommandEmpty>No match found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn("mr-2 size-4", value === option ? "opacity-100" : "opacity-0")}
                      aria-hidden="true"
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FieldShell>
  );
}

/** Accessible multi-select rendered as toggleable chips. */
export function MultiSelectField({
  label,
  options,
  values,
  onToggle,
  required,
  hint,
  error,
}: {
  label: string;
  options: readonly string[];
  values: string[];
  onToggle: (value: string) => void;
  required?: boolean | undefined;
  hint?: string | undefined;
  error?: string | undefined;
}) {
  const id = useId();
  return (
    <fieldset
      aria-describedby={cn(hint && `${id}-hint`, error && `${id}-error`) || undefined}
      aria-invalid={error ? true : undefined}
    >
      <legend className="text-sm font-semibold text-navy">
        {label}
        {required && (
          <span className="ml-1 text-orange" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="sr-only"> (required)</span>}
      </legend>
      {hint && (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {hint}
        </p>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(option)}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                selected
                  ? "border-blue bg-blue/10 text-blue"
                  : "border-border bg-background text-foreground hover:border-blue/50 hover:text-blue",
              )}
            >
              {selected && <Check className="size-3.5" aria-hidden="true" />}
              {option}
            </button>
          );
        })}
      </div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs font-medium text-destructive"
        >
          <AlertCircle className="mt-px size-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function ErrorSummary({ errors }: { errors: Record<string, string> }) {
  const messages = Object.values(errors);
  if (messages.length === 0) return null;
  return (
    <div
      role="alert"
      className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
    >
      <p className="font-semibold">Please check the following before continuing:</p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export function StepNav({
  onBack,
  backLabel = "Back",
  nextLabel = "Continue",
  submitting,
}: {
  onBack?: () => void;
  backLabel?: string;
  nextLabel?: string;
  submitting?: boolean;
}) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
      {onBack ? (
        <Button type="button" variant="outline" size="lg" className="w-full sm:w-auto" onClick={onBack}>
          {backLabel}
        </Button>
      ) : (
        <span />
      )}
      <Button type="submit" variant="cta" size="lg" className="w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Submitting…" : nextLabel}
      </Button>
    </div>
  );
}

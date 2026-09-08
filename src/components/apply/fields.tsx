"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { AlertCircle, Check, ChevronsUpDown, FileText, Paperclip, X } from "lucide-react";
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
import {
  ACCEPTED_ATTACHMENT_EXTENSIONS,
  ACCEPTED_ATTACHMENT_TYPES,
  formatBytes,
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENTS,
  readApplicationDocument,
  totalEncodedBytes,
  type ApplicationDocument,
} from "@/lib/application/attachments";

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
export function SelectField({ options, ...props }: BaseProps & { options: readonly string[] }) {
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
export function ComboboxField({ options, ...props }: BaseProps & { options: readonly string[] }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const {
    label,
    value,
    onChange,
    required,
    hint,
    error,
    placeholder = "Search and select",
  } = props;

  return (
    <FieldShell id={id} label={label} required={required} hint={hint} error={error}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            role="combobox"
            aria-expanded={open}
            aria-controls={`${id}-listbox`}
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
            <CommandList id={`${id}-listbox`}>
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

function ChipGroup({
  options,
  values,
  onToggle,
}: {
  options: readonly string[];
  values: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
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
  );
}

/** Accessible multi-select rendered as toggleable chips, optionally grouped under labelled sections. */
export function MultiSelectField({
  label,
  options,
  groups,
  values,
  onToggle,
  required,
  hint,
  error,
}: {
  label: string;
  options?: readonly string[];
  groups?: { label: string; options: readonly string[] }[];
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
      {groups ? (
        <div className="mt-3 space-y-4">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
              <ChipGroup options={group.options} values={values} onToggle={onToggle} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-3">
          <ChipGroup options={options ?? []} values={values} onToggle={onToggle} />
        </div>
      )}
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

/** Optional document upload — client-side only, base64-attached to the EmailJS notification. */
export function FileUploadField({
  label,
  hint,
  documents,
  onChange,
  error,
  onError,
}: {
  label: string;
  hint?: string | undefined;
  documents: ApplicationDocument[];
  onChange: (documents: ApplicationDocument[]) => void;
  error?: string | undefined;
  onError: (message: string | null) => void;
}) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [reading, setReading] = useState(false);
  const usedBytes = totalEncodedBytes(documents);

  const addFiles = async (fileList: FileList) => {
    onError(null);
    const files = Array.from(fileList);
    if (documents.length + files.length > MAX_ATTACHMENTS) {
      onError(`You can attach up to ${MAX_ATTACHMENTS} files.`);
      return;
    }

    setReading(true);
    try {
      let running = usedBytes;
      const accepted: ApplicationDocument[] = [];
      for (const file of files) {
        if (!ACCEPTED_ATTACHMENT_TYPES.includes(file.type)) {
          onError(`"${file.name}" isn't a supported file type. Use PDF, JPG, PNG or WEBP.`);
          continue;
        }
        const doc = await readApplicationDocument(file);
        if (running + doc.encodedBytes > MAX_ATTACHMENT_BYTES) {
          onError(
            `Adding "${file.name}" would go over the ${formatBytes(MAX_ATTACHMENT_BYTES)} attachment limit. Remove a file or attach a smaller one.`,
          );
          continue;
        }
        running += doc.encodedBytes;
        accepted.push(doc);
      }
      if (accepted.length > 0) onChange([...documents, ...accepted]);
    } finally {
      setReading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeDocument = (docId: string) => {
    onError(null);
    onChange(documents.filter((d) => d.id !== docId));
  };

  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => inputRef.current?.click()}
            disabled={reading || documents.length >= MAX_ATTACHMENTS}
          >
            <Paperclip className="mr-1.5 size-4" aria-hidden="true" />
            {reading ? "Adding…" : "Attach document"}
          </Button>
          <p className="text-xs text-muted-foreground">
            {formatBytes(usedBytes)} of {formatBytes(MAX_ATTACHMENT_BYTES)} used · up to{" "}
            {MAX_ATTACHMENTS} files
          </p>
        </div>
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple
          accept={ACCEPTED_ATTACHMENT_EXTENSIONS}
          className="sr-only"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) void addFiles(e.target.files);
          }}
        />
        {documents.length > 0 && (
          <ul className="space-y-2">
            {documents.map((doc) => (
              <li
                key={doc.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="truncate text-foreground">{doc.file.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatBytes(doc.encodedBytes)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => removeDocument(doc.id)}
                  className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  aria-label={`Remove ${doc.file.name}`}
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </FieldShell>
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
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
          onClick={onBack}
        >
          {backLabel}
        </Button>
      ) : (
        <span />
      )}
      <Button
        type="submit"
        variant="cta"
        size="lg"
        className="w-full sm:w-auto"
        disabled={submitting}
      >
        {submitting ? "Submitting…" : nextLabel}
      </Button>
    </div>
  );
}

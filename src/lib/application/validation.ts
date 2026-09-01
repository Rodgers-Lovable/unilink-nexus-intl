import { z } from "zod";
import type { ApplicationDraft } from "./types";

const currentYear = new Date().getFullYear();

export const personalSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name." })
    .max(100, { message: "Name must be under 100 characters." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Please enter your email address." })
    .email({ message: "Enter a valid email address, for example name@example.com." })
    .max(255),
  phone: z
    .string()
    .trim()
    .min(7, { message: "Enter a phone or WhatsApp number with at least 7 digits." })
    .max(25, { message: "Phone number is too long." })
    .regex(/^[+]?[\d\s().-]{7,25}$/, {
      message: "Use digits only, optionally starting with + and including spaces or dashes.",
    }),
  nationality: z.string().trim().min(1, { message: "Select your nationality." }),
  countryOfResidence: z
    .string()
    .trim()
    .min(1, { message: "Select the country you currently live in." }),
});

export const academicSchema = z.object({
  highestAcademicLevel: z
    .string()
    .trim()
    .min(1, { message: "Select your highest academic level." }),
  institution: z
    .string()
    .trim()
    .min(2, { message: "Enter the last school, college or university you attended." })
    .max(150),
  qualification: z.string().trim().max(150).optional().or(z.literal("")),
  completionYear: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => {
        if (!value) return true;
        if (!/^\d{4}$/.test(value)) return false;
        const year = Number(value);
        return year >= 1950 && year <= currentYear + 10;
      },
      { message: `Enter a four-digit year between 1950 and ${currentYear + 10}.` },
    ),
  performance: z.string().trim().optional().or(z.literal("")),
});

export const studyPlanSchema = z.object({
  targetLevel: z.string().trim().min(1, { message: "Select the level you would like to study." }),
  preferredCourse: z
    .string()
    .trim()
    .min(2, { message: "Tell us the course or subject area you have in mind." })
    .max(150),
  preferredDestinations: z
    .array(z.string())
    .min(1, { message: "Select at least one destination, or choose “I'm not sure yet”." }),
  preferredIntake: z.string().trim().optional().or(z.literal("")),
});

export const submissionSchema = z.object({
  additionalInformation: z
    .string()
    .trim()
    .max(2000, { message: "Please keep this under 2000 characters." })
    .optional()
    .or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm your consent before submitting." }),
  }),
});

export type FieldErrors = Record<string, string>;

function collect(result: z.SafeParseReturnType<unknown, unknown>): FieldErrors {
  if (result.success) return {};
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join(".");
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}

/** Validates a single step and returns inline field errors keyed by field name. */
export function validateStep(step: string, draft: ApplicationDraft): FieldErrors {
  switch (step) {
    case "personal":
      return collect(personalSchema.safeParse(draft.personal));
    case "academic":
      return collect(academicSchema.safeParse(draft.academic));
    case "studyPlan":
      return collect(studyPlanSchema.safeParse(draft.studyPlan));
    case "review":
      return collect(
        submissionSchema.safeParse({
          additionalInformation: draft.additionalInformation,
          consent: draft.consent,
        }),
      );
    default:
      return {};
  }
}

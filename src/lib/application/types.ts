/**
 * Student application intake — domain model.
 *
 * Layer 1: option data + record shape (this file)
 * Layer 2: validation (validation.ts)
 * Layer 3: persistence / lifecycle (applicationService.ts)
 *
 * The record shape is deliberately CRM-friendly so it can later back draft
 * applications, status tracking, document uploads and adviser assignment
 * without a rewrite.
 */

export const academicLevelOptions = [
  "Secondary school",
  "Completed high school",
  "Certificate",
  "Diploma",
  "Bachelor's degree",
  "Master's degree",
  "Doctorate",
  "Vocational / technical qualification",
  "Other",
] as const;

export const performanceOptions = [
  "Excellent",
  "Very good",
  "Good",
  "Developing",
  "Prefer to discuss with an adviser",
] as const;

export const targetLevelOptions = [
  "Foundation / Pathway",
  "Diploma / Certificate",
  "Bachelor's",
  "Master's",
  "PhD",
  "Not sure yet",
] as const;

export const applicationDestinationOptions = [
  "Malaysia",
  "Malta",
  "Mauritius",
  "UAE",
  "United Kingdom",
  "Canada",
  "United States",
  "Australia",
  "Germany",
  "France",
  "Netherlands",
  "Ireland",
  "Türkiye",
  "India",
  "China",
  "South Africa",
  "I'm not sure yet",
] as const;

/** Intake windows are generated rather than hardcoded so the list never ages. */
export function getIntakeOptions(now: Date = new Date()): string[] {
  const month = now.getMonth();
  const year = now.getFullYear();
  const windows = [
    { label: "January", month: 0 },
    { label: "May", month: 4 },
    { label: "September", month: 8 },
  ];

  const options: string[] = [];
  for (let offset = 0; offset <= 2 && options.length < 4; offset += 1) {
    for (const w of windows) {
      const intakeYear = year + offset;
      // Keep roughly six months of lead time before an intake is offered.
      if (offset === 0 && w.month <= month + 5) continue;
      if (options.length < 4) options.push(`${w.label} ${intakeYear}`);
    }
  }
  options.push(`${year + 3}`);
  options.push("Not sure yet");
  return options;
}

export type ApplicationSource = "direct_application" | "pathway_advisor" | "advisor_referral";
export type ApplicationStatus = "draft" | "submitted" | "under_review" | "contacted";

export type ApplicationPersonal = {
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  countryOfResidence: string;
};

export type ApplicationAcademic = {
  highestAcademicLevel: string;
  institution: string;
  qualification: string;
  completionYear: string;
  performance: string;
};

export type ApplicationStudyPlan = {
  targetLevel: string;
  preferredCourse: string;
  preferredDestinations: string[];
  preferredIntake: string;
};

export type StudentApplication = {
  id: string;
  reference: string;
  personal: ApplicationPersonal;
  academic: ApplicationAcademic;
  studyPlan: ApplicationStudyPlan;
  additionalInformation: string;
  consent: boolean;
  source: ApplicationSource;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
};

/** Everything the form edits, without lifecycle metadata. */
export type ApplicationDraft = {
  personal: ApplicationPersonal;
  academic: ApplicationAcademic;
  studyPlan: ApplicationStudyPlan;
  additionalInformation: string;
  consent: boolean;
};

export const emptyApplicationDraft: ApplicationDraft = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    nationality: "",
    countryOfResidence: "",
  },
  academic: {
    highestAcademicLevel: "",
    institution: "",
    qualification: "",
    completionYear: "",
    performance: "",
  },
  studyPlan: {
    targetLevel: "",
    preferredCourse: "",
    preferredDestinations: [],
    preferredIntake: "",
  },
  additionalInformation: "",
  consent: false,
};

export const applicationSteps = [
  { key: "personal", label: "About You" },
  { key: "academic", label: "Academic Background" },
  { key: "studyPlan", label: "Study Plans" },
  { key: "review", label: "Review & Submit" },
] as const;

export type ApplicationStepKey = (typeof applicationSteps)[number]["key"];

import type { EligibilityAssessment, EligibilityProfile } from "./eligibility/types";

export type ContactMethod = "WhatsApp" | "Phone call" | "Email";
export type LeadStatus = "New" | "Contacted" | "In progress" | "Closed";
export type LeadSource = "eligibility-assessment" | "book-consultation" | "contact-form";

/** Shape a future CRM / admin dashboard can render directly. */
export type Lead = {
  id: string;
  createdAt: string;
  source: LeadSource;
  status: LeadStatus;
  fullName: string;
  email: string;
  phone: string;
  preferredContactMethod: ContactMethod;
  consent: boolean;
  currentCountry?: string;
  destinationInterest?: string[];
  studyLevel?: string;
  field?: string;
  qualification?: string;
  grade?: string;
  englishStatus?: string;
  budget?: string;
  intake?: string;
  notes?: string;
  profile?: EligibilityProfile;
  assessmentSummary?: string;
};

const STORAGE_KEY = "unilink.leads";

/**
 * Mock persistence layer. Replace `saveLead` with a server function backed by
 * Lovable Cloud when the CRM is introduced — the call site stays identical.
 */
export async function saveLead(lead: Omit<Lead, "id" | "createdAt" | "status">): Promise<Lead> {
  const record: Lead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "New",
  };

  try {
    if (typeof window !== "undefined") {
      const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]") as Lead[];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([record, ...existing]));
    }
  } catch {
    // Storage is a convenience only; never block the enquiry on it.
  }

  return record;
}

export function leadFromAssessment(
  profile: EligibilityProfile,
  assessment: EligibilityAssessment,
  contact: {
    fullName: string;
    email: string;
    phone: string;
    preferredContactMethod: ContactMethod;
  },
): Omit<Lead, "id" | "createdAt" | "status"> {
  return {
    source: "eligibility-assessment",
    ...contact,
    consent: true,
    currentCountry: profile.currentCountry,
    destinationInterest: profile.preferredDestinations,
    studyLevel: profile.targetStudyLevel,
    field: profile.targetField,
    qualification: profile.highestQualification,
    grade: `${profile.qualificationGrade} ${profile.gradeScale}`.trim(),
    englishStatus: `${profile.englishTestType} ${profile.englishTestScore}`.trim(),
    budget: profile.budgetRange,
    intake: profile.targetIntake,
    notes: profile.additionalContext,
    profile,
    assessmentSummary: assessment.narrative,
  };
}

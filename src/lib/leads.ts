import type { PathwayProfile, PathwayResult } from "./pathway/types";

export type ContactMethod = "WhatsApp" | "Phone call" | "Email";
export type LeadStatus = "New" | "Contacted" | "In progress" | "Closed";
export type LeadSource =
  | "pathway-advisor"
  | "book-consultation"
  | "contact-form"
  | "school-programmes"
  | "parent-guidance";

/** Shape a future CRM / adviser dashboard can render directly. */
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
  interests?: string[];
  subjects?: string[];
  budget?: string;
  entryYear?: string;
  notes?: string;
  profile?: PathwayProfile;
  pathwaySummary?: string;
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

export function leadFromPathway(
  profile: PathwayProfile,
  result: PathwayResult,
  contact: {
    fullName: string;
    email: string;
    phone: string;
    preferredContactMethod: ContactMethod;
  },
): Omit<Lead, "id" | "createdAt" | "status"> {
  return {
    source: "pathway-advisor",
    ...contact,
    consent: true,
    currentCountry: profile.country,
    destinationInterest: profile.preferredDestinations,
    studyLevel: profile.level,
    interests: profile.interests,
    subjects: profile.subjects,
    budget: profile.budgetRange,
    entryYear: profile.targetEntryYear,
    notes: profile.notes,
    profile,
    pathwaySummary: result.narrative,
  };
}

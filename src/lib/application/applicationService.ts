import type { PathwayProfile } from "@/lib/pathway/types";
import {
  emptyApplicationDraft,
  type ApplicationDraft,
  type ApplicationSource,
  type StudentApplication,
} from "./types";

const DRAFT_KEY = "unilink.application.draft";
const HANDOFF_KEY = "unilink.application.handoff";
const RECORDS_KEY = "unilink.applications";

export const APPLICATION_DISCLAIMER =
  "Submitting this form starts an advisory review with UniLink Nexus International. It is not an application to a university and does not guarantee admission, scholarships or visa approval.";

export const CONSENT_STATEMENT =
  "I agree that UniLink Nexus International may use the information I provide to review my education enquiry, contact me regarding my study plans, and provide relevant guidance.";

function safeRead<T>(key: string): T | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown, session = false) {
  try {
    if (typeof window === "undefined") return;
    const store = session ? window.sessionStorage : window.localStorage;
    store.setItem(key, JSON.stringify(value));
  } catch {
    // Storage is a convenience only; never block the student on it.
  }
}

/** Maps a completed Pathway Advisor profile onto application fields. */
export function draftFromPathwayProfile(profile: PathwayProfile): Partial<ApplicationDraft> {
  const levelMap: Record<string, string> = {
    "Lower secondary": "Secondary school",
    "Upper secondary": "Secondary school",
    "Final year of high school": "Secondary school",
    "Completed high school": "Completed high school",
    "Diploma / vocational": "Diploma",
    "University student": "Bachelor's degree",
    "Mature / returning to education": "Other",
  };

  const performanceMap: Record<string, string> = {
    Excellent: "Excellent",
    "Very good": "Very good",
    Good: "Good",
    Developing: "Developing",
    "Needs support": "Prefer to discuss with an adviser",
    "Not sure yet": "Prefer to discuss with an adviser",
  };

  const destinations = profile.preferredDestinations.filter(
    (d) => !["Show me everything", "Europe", "Asia", "Africa"].includes(d),
  );

  return {
    personal: {
      ...emptyApplicationDraft.personal,
      countryOfResidence: profile.country || "",
      nationality: profile.country || "",
    },
    academic: {
      ...emptyApplicationDraft.academic,
      highestAcademicLevel: levelMap[profile.level] ?? "",
      performance: performanceMap[profile.performance] ?? "",
    },
    studyPlan: {
      ...emptyApplicationDraft.studyPlan,
      preferredDestinations: destinations,
      preferredIntake: profile.targetEntryYear || "",
    },
    additionalInformation: profile.notes || "",
  };
}

/** Stores a pathway handoff so /apply can pre-fill without repeating questions. */
export function storeApplicationHandoff(profile: PathwayProfile) {
  safeWrite(HANDOFF_KEY, draftFromPathwayProfile(profile), true);
}

export function readApplicationHandoff(): Partial<ApplicationDraft> | null {
  return safeRead<Partial<ApplicationDraft>>(HANDOFF_KEY);
}

export function clearApplicationHandoff() {
  try {
    window.sessionStorage.removeItem(HANDOFF_KEY);
  } catch {
    /* ignore */
  }
}

export function mergeDraft(
  base: ApplicationDraft,
  patch: Partial<ApplicationDraft> | null,
): ApplicationDraft {
  if (!patch) return base;
  return {
    personal: { ...base.personal, ...(patch.personal ?? {}) },
    academic: { ...base.academic, ...(patch.academic ?? {}) },
    studyPlan: { ...base.studyPlan, ...(patch.studyPlan ?? {}) },
    additionalInformation: patch.additionalInformation ?? base.additionalInformation,
    consent: base.consent,
  };
}

export function saveDraft(draft: ApplicationDraft) {
  safeWrite(DRAFT_KEY, { ...draft, consent: false });
}

export function readDraft(): ApplicationDraft | null {
  return safeRead<ApplicationDraft>(DRAFT_KEY);
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

function buildReference(date: Date): string {
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 90000) + 10000;
  return `UNX-${year}-${random}`;
}

/**
 * Mock persistence. Replace the storage block with a server function backed by
 * a real backend when the adviser dashboard is introduced — the signature and
 * the returned record stay identical.
 */
export async function submitApplication(
  draft: ApplicationDraft,
  source: ApplicationSource = "direct_application",
): Promise<StudentApplication> {
  const now = new Date();
  const record: StudentApplication = {
    id: crypto.randomUUID(),
    reference: buildReference(now),
    personal: draft.personal,
    academic: draft.academic,
    studyPlan: draft.studyPlan,
    additionalInformation: draft.additionalInformation,
    consent: draft.consent,
    source,
    status: "submitted",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  try {
    if (typeof window !== "undefined") {
      const existing = safeRead<StudentApplication[]>(RECORDS_KEY) ?? [];
      safeWrite(RECORDS_KEY, [record, ...existing]);
    }
  } catch {
    /* ignore */
  }

  clearDraft();
  return record;
}

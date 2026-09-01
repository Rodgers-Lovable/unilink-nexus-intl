import { evaluateProfile } from "./rules";
import { localNarrativeGenerator, type NarrativeGenerator } from "./narrative";
import type { EligibilityAssessment, EligibilityProfile } from "./types";

export const ASSESSMENT_DISCLAIMER =
  "This assessment provides preliminary guidance based on the information you submit. It does not guarantee university admission, scholarship eligibility, or visa approval. Requirements vary between countries, institutions, and programmes.";

/**
 * The single entry point used by the UI. Business logic never lives in
 * components — swap `narrativeGenerator` for an AI-backed implementation
 * without touching the wizard.
 */
export const eligibilityService = {
  evaluateProfile,

  async generateAssessmentSummary(
    profile: EligibilityProfile,
    narrativeGenerator: NarrativeGenerator = localNarrativeGenerator,
  ): Promise<EligibilityAssessment> {
    const evaluation = evaluateProfile(profile);
    const narrative = await narrativeGenerator(profile, evaluation);

    return {
      ...evaluation,
      narrative,
      disclaimer: ASSESSMENT_DISCLAIMER,
      generatedAt: new Date().toISOString(),
    };
  },
};

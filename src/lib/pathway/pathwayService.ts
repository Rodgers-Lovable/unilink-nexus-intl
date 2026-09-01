import { evaluatePathway } from "./rules";
import { localNarrativeGenerator, type NarrativeGenerator } from "./narrative";
import type { PathwayProfile, PathwayResult } from "./types";

export const PATHWAY_DISCLAIMER =
  "UniLink pathway recommendations are designed to support exploration and planning. University admission requirements, tuition fees, deadlines, accreditation, scholarship availability and visa requirements should always be verified using current authoritative information.";

/**
 * The single entry point the UI uses. Business logic never lives in components —
 * swap `narrativeGenerator` for an AI-backed implementation without touching the wizard.
 */
export const pathwayService = {
  evaluatePathway,

  async generatePathway(
    profile: PathwayProfile,
    narrativeGenerator: NarrativeGenerator = localNarrativeGenerator,
  ): Promise<PathwayResult> {
    const evaluation = evaluatePathway(profile);
    const narrative = await narrativeGenerator(profile, evaluation);

    return {
      ...evaluation,
      narrative,
      disclaimer: PATHWAY_DISCLAIMER,
      generatedAt: new Date().toISOString(),
    };
  },
};

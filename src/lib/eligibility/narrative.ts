import type { EligibilityEvaluation, EligibilityProfile } from "./types";

/**
 * Narrative layer.
 *
 * Currently deterministic and generated locally from the structured answers.
 * This is the single seam to replace with an LLM provider (OpenAI, Anthropic,
 * Gemini, or the Lovable AI Gateway) later — the signature stays the same.
 */
export type NarrativeGenerator = (
  profile: EligibilityProfile,
  evaluation: EligibilityEvaluation,
) => Promise<string>;

export const localNarrativeGenerator: NarrativeGenerator = async (profile, evaluation) => {
  const level = profile.targetStudyLevel || "your intended study level";
  const qualification = profile.highestQualification || "your current qualification";
  const field = profile.targetField ? ` in ${profile.targetField}` : "";
  const destinations =
    profile.preferredDestinations.length > 0
      ? profile.preferredDestinations.join(", ")
      : "the destinations you are considering";

  const find = (key: string) => evaluation.criteria.find((c) => c.key === key);
  const academic = find("academicReadiness");
  const language = find("languagePreparation");
  const timeline = find("timeline");

  const parts: string[] = [];

  parts.push(
    `Based on ${qualification.toLowerCase()} and an interest in studying at ${level.toLowerCase()} level${field}, your academic progression appears ${
      academic?.status === "Strong" ? "reasonable" : "worth reviewing in more detail"
    }.`,
  );

  parts.push(
    `${destinations} may have different language and admission requirements, so each should be reviewed individually rather than assumed to be equivalent.`,
  );

  parts.push(
    language?.status === "Strong"
      ? "Your recorded language result supports applications where English evidence is requested, although each institution sets its own minimum."
      : "Language evidence is one of the most common causes of delay, so confirming what each institution accepts early is worthwhile.",
  );

  parts.push(
    timeline?.status === "Strong"
      ? "Your intended intake leaves reasonable time to prepare documents and complete any outstanding requirements."
      : "Your timeline is tight enough that preparation should begin in parallel rather than sequentially.",
  );

  if (profile.additionalContext.trim()) {
    parts.push(
      "The additional context you shared has been recorded and will be reviewed by an advisor alongside this assessment.",
    );
  }

  parts.push(
    "A consultation is the most reliable next step: an advisor can confirm requirements for the specific institutions on your shortlist.",
  );

  return parts.join(" ");
};

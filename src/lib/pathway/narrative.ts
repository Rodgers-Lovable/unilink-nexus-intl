import type { PathwayEvaluation, PathwayProfile } from "./types";

export type NarrativeGenerator = (
  profile: PathwayProfile,
  evaluation: PathwayEvaluation,
) => Promise<string> | string;

const list = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? "")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/**
 * Deterministic narrative layer. Swap this for an AI-backed generator later —
 * the signature is the only contract the UI depends on.
 */
export const localNarrativeGenerator: NarrativeGenerator = (profile, evaluation) => {
  const parts: string[] = [];

  const interests = evaluation.interests.length
    ? list(evaluation.interests)
    : "a broad set of directions";
  const stage = profile.level ? profile.level.toLowerCase() : "your current stage of study";

  parts.push(
    `You described yourself as being at ${stage}${profile.country ? ` in ${profile.country}` : ""}, with an interest in ${interests}.`,
  );

  if (profile.subjects.length) {
    parts.push(
      `The subjects you enjoy — ${list(profile.subjects.slice(0, 5))} — connect naturally to ${list(
        evaluation.careerFamilies.slice(0, 3).map((c) => c.title),
      )}.`,
    );
  } else {
    parts.push(
      `Based on your interests, ${list(evaluation.careerFamilies.slice(0, 3).map((c) => c.title))} are sensible areas to look at first.`,
    );
  }

  if (evaluation.degreeFamilies.length) {
    parts.push(
      `Degree families worth investigating include ${list(evaluation.degreeFamilies.slice(0, 4).map((d) => d.title))}. These are starting points for research, not recommendations to commit to.`,
    );
  }

  if (evaluation.destinations.length) {
    parts.push(
      `Given your budget, language and travel preferences, ${list(evaluation.destinations.slice(0, 3).map((d) => d.name))} are reasonable destinations to compare first.`,
    );
  }

  if (profile.scholarshipImportance === "Essential") {
    parts.push(
      "Because funding is essential for you, it is worth shaping your shortlist around routes where support is realistically available, and preparing early.",
    );
  }

  parts.push(
    "A UniLink adviser can review this with you and turn it into a practical, step-by-step education plan.",
  );

  return parts.join(" ");
};

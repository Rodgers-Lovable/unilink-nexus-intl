import type {
  CriterionResult,
  CriterionStatus,
  EligibilityEvaluation,
  EligibilityProfile,
} from "./types";

const levelRank: Record<string, number> = {
  "Secondary school": 1,
  Diploma: 2,
  "Bachelor's degree": 3,
  "Master's degree": 4,
  Other: 0,
};

const targetRank: Record<string, number> = {
  "Diploma / Certificate": 2,
  "Bachelor's": 3,
  "Master's": 4,
  PhD: 5,
  "Not sure yet": 0,
};

function academicReadiness(p: EligibilityProfile): CriterionResult {
  const from = levelRank[p.highestQualification] ?? 0;
  const to = targetRank[p.targetStudyLevel] ?? 0;
  let status: CriterionStatus = "More Information Needed";
  let detail = "Add your highest completed qualification and intended study level for a clearer view.";

  if (from && to) {
    if (to - from <= 1 && to >= from) {
      status = "Strong";
      detail = "Your intended study level follows logically from your highest completed qualification.";
    } else if (to > from + 1) {
      status = "Needs Review";
      detail =
        "The gap between your current qualification and intended level usually requires a bridging or pathway option.";
    } else {
      status = "Needs Review";
      detail =
        "You are applying at or below your current level, which is possible but worth discussing with an advisor.";
    }
  }

  if (status === "Strong" && !p.qualificationGrade) {
    status = "Needs Review";
    detail = "Progression looks reasonable, but your results are needed to assess entry requirements.";
  }

  return { key: "academicReadiness", label: "Academic Readiness", status, detail };
}

function languagePreparation(p: EligibilityProfile): CriterionResult {
  let status: CriterionStatus = "More Information Needed";
  let detail = "Tell us about your English test status so language requirements can be considered.";

  if (p.englishTestType === "Not required") {
    status = "Needs Review";
    detail =
      "You indicated a test is not required. Institutions define their own evidence rules, so this should be confirmed individually.";
  } else if (p.englishTestType === "Not taken yet") {
    status = "Needs Review";
    detail = "A recognised language test is often required. Booking one early keeps your timeline flexible.";
  } else if (p.englishTestType && p.englishTestScore) {
    status = "Strong";
    detail = `You have a ${p.englishTestType} result recorded, which supports applications where language evidence is required.`;
  } else if (p.englishTestType) {
    status = "More Information Needed";
    detail = `Add your ${p.englishTestType} score so language readiness can be assessed.`;
  }

  return { key: "languagePreparation", label: "Language Preparation", status, detail };
}

function destinationAlignment(p: EligibilityProfile): CriterionResult {
  const n = p.preferredDestinations.length;
  let status: CriterionStatus = "More Information Needed";
  let detail = "Select at least one preferred destination, or ask us to help you decide.";

  if (n === 1) {
    status = "Strong";
    detail = `A single focused destination (${p.preferredDestinations[0]}) makes requirements easier to plan against.`;
  } else if (n >= 2 && n <= 3) {
    status = "Strong";
    detail = `Comparing ${n} destinations gives useful flexibility while keeping requirements manageable.`;
  } else if (n > 3) {
    status = "Needs Review";
    detail = "A wider list is fine early on, but narrowing it will make requirements and costs clearer.";
  }

  return { key: "destinationAlignment", label: "Destination Alignment", status, detail };
}

function timeline(p: EligibilityProfile): CriterionResult {
  let status: CriterionStatus = "More Information Needed";
  let detail = "Add your preferred intake so preparation time can be assessed.";

  if (p.targetIntake) {
    const soon = /(next|3|three|immediate|as soon)/i.test(p.targetIntake);
    status = soon ? "Needs Review" : "Strong";
    detail = soon
      ? "A near-term intake is possible, but document preparation and testing will need to move quickly."
      : "Your intended intake allows reasonable time for preparation, testing and documentation.";
  }

  const year = parseInt(p.graduationYear, 10);
  const now = new Date().getFullYear();
  if (status === "Strong" && year && now - year > 8) {
    status = "Needs Review";
    detail =
      "There is a notable gap since your last qualification, which some institutions review case by case.";
  }

  return { key: "timeline", label: "Timeline", status, detail };
}

function budgetConsideration(p: EligibilityProfile): CriterionResult {
  let status: CriterionStatus = "More Information Needed";
  let detail = "Share an approximate budget range so realistic options can be identified.";

  if (p.budgetRange && p.budgetRange !== "Not sure yet") {
    const low = p.budgetRange.startsWith("Under");
    status = low ? "Needs Review" : "Strong";
    detail = low
      ? "Your indicated range narrows the field. Lower-cost destinations and funding routes should be explored. [Costs to be confirmed]"
      : "Your indicated range keeps a reasonable set of options open, subject to the specific institutions you choose.";
  }

  return { key: "budgetConsideration", label: "Budget Consideration", status, detail };
}

export function evaluateProfile(profile: EligibilityProfile): EligibilityEvaluation {
  const criteria = [
    academicReadiness(profile),
    languagePreparation(profile),
    destinationAlignment(profile),
    timeline(profile),
    budgetConsideration(profile),
  ];

  const strong = criteria.filter((c) => c.status === "Strong").length;
  const missing = criteria.filter((c) => c.status === "More Information Needed").length;

  let overall: CriterionStatus = "Needs Review";
  let headline = "Your profile has a workable foundation with some areas to review";

  if (strong >= 4) {
    overall = "Strong";
    headline = "Your profile shows promising study-abroad potential";
  } else if (missing >= 3) {
    overall = "More Information Needed";
    headline = "We need a little more information to assess your profile";
  }

  const recommendations: string[] = [];
  criteria
    .filter((c) => c.status !== "Strong")
    .forEach((c) => recommendations.push(`${c.label}: ${c.detail}`));
  if (recommendations.length === 0) {
    recommendations.push(
      "Discuss your shortlist with an advisor to confirm institution-specific requirements.",
    );
  }

  return { headline, overall, criteria, recommendations };
}

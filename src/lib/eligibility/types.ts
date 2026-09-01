/**
 * Structured eligibility domain model.
 * Layer 1: user inputs (this file)
 * Layer 2: deterministic rule evaluation (rules.ts)
 * Layer 3: narrative assessment (narrative.ts — replaceable by an LLM provider)
 */

export type StudyLevel = "Bachelor's" | "Master's" | "PhD" | "Diploma / Certificate" | "Not sure yet";

export type Qualification =
  | "Secondary school"
  | "Diploma"
  | "Bachelor's degree"
  | "Master's degree"
  | "Other";

export type GradeScale = "Percentage" | "GPA (4.0)" | "Letter grade" | "Classification" | "Other";

export type EnglishTestType = "IELTS" | "TOEFL" | "PTE" | "Duolingo" | "Not taken yet" | "Not required";

export type BudgetRange =
  | "Under 10,000 USD / year"
  | "10,000 – 20,000 USD / year"
  | "20,000 – 35,000 USD / year"
  | "Over 35,000 USD / year"
  | "Not sure yet";

export type EligibilityProfile = {
  currentCountry: string;
  highestQualification: Qualification | "";
  qualificationName: string;
  qualificationInstitution: string;
  qualificationField: string;
  qualificationGrade: string;
  gradeScale: GradeScale | "";
  graduationYear: string;
  targetStudyLevel: StudyLevel | "";
  targetField: string;
  preferredDestinations: string[];
  englishTestType: EnglishTestType | "";
  englishTestScore: string;
  budgetRange: BudgetRange | "";
  targetIntake: string;
  additionalContext: string;
};

export const emptyProfile: EligibilityProfile = {
  currentCountry: "",
  highestQualification: "",
  qualificationName: "",
  qualificationInstitution: "",
  qualificationField: "",
  qualificationGrade: "",
  gradeScale: "",
  graduationYear: "",
  targetStudyLevel: "",
  targetField: "",
  preferredDestinations: [],
  englishTestType: "",
  englishTestScore: "",
  budgetRange: "",
  targetIntake: "",
  additionalContext: "",
};

export type CriterionStatus = "Strong" | "Needs Review" | "More Information Needed";

export type CriterionKey =
  | "academicReadiness"
  | "languagePreparation"
  | "destinationAlignment"
  | "timeline"
  | "budgetConsideration";

export type CriterionResult = {
  key: CriterionKey;
  label: string;
  status: CriterionStatus;
  detail: string;
};

export type EligibilityEvaluation = {
  headline: string;
  overall: CriterionStatus;
  criteria: CriterionResult[];
  recommendations: string[];
};

export type EligibilityAssessment = EligibilityEvaluation & {
  narrative: string;
  disclaimer: string;
  generatedAt: string;
};

/**
 * UniLink Pathway Advisor — domain model.
 *
 * Layer 1: student inputs (this file)
 * Layer 2: deterministic rules engine (rules.ts)
 * Layer 3: narrative layer (narrative.ts — replaceable by an LLM provider)
 * Layer 4: human adviser review (CTA in the UI)
 */

export const interestOptions = [
  "Science & Health",
  "Technology & AI",
  "Engineering",
  "Business & Finance",
  "Law & Politics",
  "Art, Design & Media",
  "Aviation & Hospitality",
  "Environment & Agriculture",
  "Psychology & Social Sciences",
  "Education",
  "Other",
  "I'm not sure yet",
] as const;

export const subjectOptions = [
  "Mathematics",
  "Advanced Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Business",
  "Economics",
  "Accounting",
  "English",
  "French",
  "History",
  "Geography",
  "Psychology",
  "Art & Design",
  "Other",
] as const;

export const countryOptions = [
  "Burundi",
  "Rwanda",
  "Uganda",
  "Kenya",
  "Tanzania",
  "Other East Africa",
  "Other",
] as const;

export const stageOptions = [
  "Lower secondary",
  "Upper secondary",
  "Final year of high school",
  "Completed high school",
  "Diploma / vocational",
  "University student",
  "Mature / returning to education",
] as const;

export const curriculumOptions = [
  "Not sure",
  "National curriculum",
  "Pearson Edexcel",
  "Cambridge",
  "IB",
  "American / AP",
  "French / Baccalauréat",
  "Belgian curriculum",
  "Cogni / SAT",
  "Vocational / technical",
  "Other",
] as const;

export const performanceOptions = [
  "Excellent",
  "Very good",
  "Good",
  "Developing",
  "Needs support",
  "Not sure yet",
] as const;

export const destinationOptions = [
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
  "Europe",
  "Asia",
  "Africa",
  "Show me everything",
] as const;

export const budgetOptions = [
  "Under $15,000",
  "$15,000–$25,000",
  "$25,000–$40,000",
  "$40,000–$60,000",
  "$60,000+",
  "I'm not sure yet",
] as const;

export const scholarshipOptions = [
  "Essential",
  "Important",
  "Helpful",
  "Not essential",
  "Not sure",
] as const;

export const languageOptions = [
  "English",
  "French",
  "English or French",
  "Open to learning another language",
  "Not sure",
] as const;

export const travelOptions = [
  "Prefer closer to East Africa",
  "Open to international travel",
  "Anywhere that fits me",
] as const;

export const situationOptions = [
  "Traditional school pathway",
  "First-generation university applicant",
  "Changing career or degree direction",
  "Gap year",
  "Vocational / technical pathway",
  "Mature student",
  "Returning to education",
  "Other",
] as const;

export type Interest = (typeof interestOptions)[number];
export type Subject = (typeof subjectOptions)[number];
export type StudyStage = (typeof stageOptions)[number];
export type Curriculum = (typeof curriculumOptions)[number];
export type Performance = (typeof performanceOptions)[number];
export type BudgetRange = (typeof budgetOptions)[number];
export type ScholarshipImportance = (typeof scholarshipOptions)[number];
export type LanguagePreference = (typeof languageOptions)[number];
export type TravelPreference = (typeof travelOptions)[number];

/** Clean, serialisable student profile — the contract for any future API/CRM. */
export type PathwayProfile = {
  country: string;
  level: string;
  curriculum: string;
  performance: string;
  subjects: string[];
  interests: string[];
  preferredDestinations: string[];
  budgetRange: string;
  scholarshipImportance: string;
  languagePreference: string;
  travelPreference: string;
  studentSituation: string[];
  targetEntryYear: string;
  notes: string;
};

export const emptyPathwayProfile: PathwayProfile = {
  country: "",
  level: "",
  curriculum: "",
  performance: "",
  subjects: [],
  interests: [],
  preferredDestinations: [],
  budgetRange: "",
  scholarshipImportance: "",
  languagePreference: "",
  travelPreference: "",
  studentSituation: [],
  targetEntryYear: "",
  notes: "",
};

export type CareerFamily = {
  key: string;
  title: string;
  description: string;
  exampleRoles: string[];
};

export type DegreeFamily = {
  key: string;
  title: string;
  description: string;
  relatedTo: string;
};

export type DestinationSuggestion = {
  name: string;
  why: string;
  budget: string;
  language: string;
  distance: string;
};

export type NextStep = {
  title: string;
  description: string;
};

export type PathwayEvaluation = {
  headline: string;
  interests: string[];
  inferredInterests: string[];
  careerFamilies: CareerFamily[];
  degreeFamilies: DegreeFamily[];
  destinations: DestinationSuggestion[];
  nextSteps: NextStep[];
};

export type PathwayResult = PathwayEvaluation & {
  narrative: string;
  disclaimer: string;
  generatedAt: string;
};

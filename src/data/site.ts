export const unilinkJourney = [
  {
    key: "discover",
    title: "Discover",
    description: "Understand your interests, strengths and academic direction.",
    icon: "compass" as const,
  },
  {
    key: "explore",
    title: "Explore",
    description: "Explore careers, degree pathways and international study options.",
    icon: "map" as const,
  },
  {
    key: "plan",
    title: "Plan",
    description: "Create a realistic pathway based on your goals, academics and circumstances.",
    icon: "route" as const,
  },
  {
    key: "prepare",
    title: "Prepare",
    description: "Get ready for applications, requirements, timelines and international study.",
    icon: "clipboard" as const,
  },
  {
    key: "connect",
    title: "Connect",
    description: "Work with UniLink advisers and relevant education opportunities.",
    icon: "link" as const,
  },
];

export const journeyEntryCards = [
  {
    title: "I'm still figuring things out",
    copy: "I want to understand my strengths, interests, subjects, careers or possible future directions.",
    cta: "Discover My Pathway",
    to: "/explore/pathway-advisor",
  },
  {
    title: "I have some ideas",
    copy: "I know some subjects, careers or courses I'm interested in and want help comparing pathways and destinations.",
    cta: "Explore My Options",
    to: "/explore",
  },
  {
    title: "I'm ready to apply",
    copy: "I have a clearer idea of what I want to study and need support preparing my next steps.",
    cta: "Start My Application",
    to: "/apply",
  },
] as const;

export const audienceCards = [
  {
    title: "Students",
    copy: "Explore careers, subjects, degree pathways, destinations and international education opportunities.",
    cta: "Start Exploring",
    to: "/explore/pathway-advisor",
    icon: "graduation" as const,
  },
  {
    title: "Parents",
    copy: "Understand education pathways, timelines, destination choices and the decisions that matter.",
    cta: "Explore Parent Guidance",
    to: "/parents",
    icon: "users" as const,
  },
  {
    title: "Schools",
    copy: "Bring career guidance, pathway planning and international education programmes to your students.",
    cta: "Explore School Programmes",
    to: "/schools",
    icon: "school" as const,
  },
] as const;

export const howItWorksStages = [
  {
    title: "Tell us where you are",
    description:
      "Share your stage of study, subjects, interests and circumstances so guidance starts from your real position.",
  },
  {
    title: "Explore possible directions",
    description:
      "Look at career families, degree pathways and study destinations that connect to what you enjoy.",
  },
  {
    title: "Narrow your options",
    description:
      "Compare routes on academic fit, cost, language and lifestyle rather than reputation alone.",
  },
  {
    title: "Build your pathway",
    description:
      "Turn the shortlist into a sequence with timelines, prerequisites and decision points.",
  },
  {
    title: "Prepare properly",
    description:
      "Assemble documents, understand requirements and prepare academically and practically.",
  },
  {
    title: "Talk to an adviser",
    description: "Review the plan with a UniLink adviser and adjust it as your situation changes.",
  },
  {
    title: "Move forward with support",
    description:
      "Take the next step: applications, preparation or departure, with guidance in place.",
  },
];

export const applicationStages = [
  {
    title: "Initial conversation",
    description: "A first discussion about your direction, timeline and questions.",
  },
  {
    title: "Academic profile review",
    description: "A structured review of your qualifications and results.",
  },
  {
    title: "Destination and course exploration",
    description: "Comparison of realistic destinations and programmes against your profile.",
  },
  {
    title: "Document preparation",
    description: "Collecting, organising and reviewing required documents.",
  },
  {
    title: "Application submission",
    description: "Submitting applications and tracking their progress.",
  },
  {
    title: "Offer review",
    description: "Understanding conditions attached to offers and deciding next steps.",
  },
  {
    title: "Visa preparation",
    description: "Preparing documentation according to the destination's process.",
  },
  {
    title: "Pre-departure",
    description: "Final preparation for travel, accommodation and arrival.",
  },
];

export const documentChecklist = [
  "Academic transcripts and certificates",
  "Valid travel document / identification",
  "English or other language test results, where applicable",
  "Personal statement or motivation letter, where required",
  "References or recommendation letters, where required",
  "Curriculum vitae, where required",
  "Financial documentation, where required",
];

export const preparationTopics = [
  {
    title: "Academic preparation",
    description:
      "Understand the prerequisites for the degree families you are considering and where gaps may need work.",
  },
  {
    title: "Language preparation",
    description:
      "Language expectations differ by destination and programme. Confirm requirements from official sources.",
  },
  {
    title: "Financial planning",
    description:
      "Plan tuition, living costs and travel in ranges, and revisit as your shortlist narrows.",
  },
  {
    title: "Documentation",
    description:
      "Keep clearly named digital copies of transcripts, certificates and identification in one place.",
  },
  {
    title: "Practical readiness",
    description: "Accommodation, transport, insurance and the first weeks after arrival.",
  },
  {
    title: "Personal readiness",
    description:
      "Living independently in a new environment takes preparation as much as paperwork.",
  },
];

export const whyUnilink = [
  {
    title: "Start Where You Are",
    description:
      "You do not need a decided plan. Guidance begins with your interests, strengths and current stage.",
  },
  {
    title: "Exploration Before Applications",
    description:
      "We help you investigate directions properly before committing to a course or country.",
  },
  {
    title: "Honest, Student-First Advice",
    description:
      "Recommendations are based on suitability, not on what is popular or easiest to place.",
  },
  {
    title: "Support for Families and Schools",
    description: "Parents and schools are part of the decision, so they are part of the guidance.",
  },
];

export const studyAbroadFaqs = [
  {
    q: "Do I need to know exactly what I want to study?",
    a: "No. Many students start with a general direction. The UniLink Pathway Advisor and a guidance conversation help narrow the field before you commit to applications.",
  },
  {
    q: "When should I start planning?",
    a: "Earlier planning generally provides more options, particularly around subject choices, testing and document preparation. Timelines vary by destination and intake.",
  },
  {
    q: "Is the Pathway Advisor a guarantee of anything?",
    a: "No. It is an exploration tool. It suggests directions worth investigating and does not guarantee admission, scholarships or visa approval.",
  },
  {
    q: "Which destinations can I explore?",
    a: "A range of destinations across Africa, Europe, Asia, the Middle East, North America and Oceania are included as exploratory options. Supported destinations are listed on the Destinations page.",
  },
  {
    q: "What does a conversation with an adviser involve?",
    a: "A structured discussion about your interests, strengths, options and circumstances, followed by clear next steps.",
  },
  {
    q: "What if my grades are not strong?",
    a: "Pathway, foundation and vocational options exist in several destinations. Suitability depends on your specific profile.",
  },
];

/** Organisation details live in company.ts; re-exported for existing imports. */
export { contactInfo, socialLinks, company } from "./company";

/** Audience programme content lives in programmes.ts. */
export {
  parentTopics,
  parentQuestions,
  schoolProgrammeFormats,
  schoolOutcomes,
} from "./programmes";

/** Student stories live in testimonials.ts. */
export { testimonials as successStories, hasUnverifiedTestimonials } from "./testimonials";

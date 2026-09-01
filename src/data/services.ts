export type ServiceIcon =
  "compass" | "route" | "globe" | "fileText" | "banknote" | "users" | "school";

export type ServiceAudience = "Students" | "Parents" | "Schools";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: ServiceIcon;
  audience: ServiceAudience;
  stage: "Discover" | "Explore" | "Plan" | "Prepare" | "Connect";
  intro: string;
  expect: string[];
};

export const services: Service[] = [
  {
    slug: "career-guidance",
    title: "Career & Subject Guidance",
    short:
      "Help students explore their strengths, subject combinations and possible career directions.",
    icon: "compass",
    audience: "Students",
    stage: "Discover",
    intro:
      "Before choosing a course or a country, it helps to understand what you enjoy, what you are good at and where those strengths can lead.",
    expect: [
      "A structured conversation about interests, strengths and subjects",
      "Discussion of career families connected to what you enjoy",
      "Guidance on subject combinations and what they keep open",
      "A shortlist of directions worth exploring further",
    ],
  },
  {
    slug: "pathway-planning",
    title: "Education Pathway Planning",
    short:
      "Build a realistic roadmap from current studies to future qualifications and career opportunities.",
    icon: "route",
    audience: "Students",
    stage: "Plan",
    intro:
      "A pathway is a sequence, not a single decision. We map the steps between where you are now and where you would like to be.",
    expect: [
      "A review of your current stage, curriculum and performance",
      "Options for degree, diploma and vocational routes",
      "A realistic timeline with decision points",
      "Alternative routes if your first choice does not work out",
    ],
  },
  {
    slug: "international-education",
    title: "International Education Guidance",
    short: "Explore countries, degree options and the practical realities of studying abroad.",
    icon: "globe",
    audience: "Students",
    stage: "Explore",
    intro:
      "Studying internationally involves academic, financial and personal considerations. We help you compare them honestly.",
    expect: [
      "Comparison of destinations against your profile and budget",
      "Language, cost and distance considerations",
      "An overview of study levels and entry expectations",
      "Guidance on verifying requirements from official sources",
    ],
  },
  {
    slug: "application-support",
    title: "Application Support",
    short: "Prepare documents, understand timelines and navigate the application process.",
    icon: "fileText",
    audience: "Students",
    stage: "Prepare",
    intro:
      "Applications are assessed on completeness and clarity. We help you assemble and review each element before submission.",
    expect: [
      "A document checklist tailored to your applications",
      "Support with personal statements and supporting materials",
      "Review before submission",
      "Guidance on timelines and tracking responses",
    ],
  },
  {
    slug: "funding-guidance",
    title: "Funding & Scholarship Guidance",
    short:
      "Explore potential funding routes and understand how to prepare for scholarship opportunities.",
    icon: "banknote",
    audience: "Students",
    stage: "Plan",
    intro:
      "Funding rarely arrives late in the process. Understanding what exists, and what it asks of applicants, changes how you plan.",
    expect: [
      "An overview of common funding routes to investigate",
      "How to build a profile that supports funding applications",
      "Budget planning beyond tuition",
      "Guidance on verifying availability directly with providers [Content to be confirmed]",
    ],
  },
  {
    slug: "parent-guidance",
    title: "Parent Guidance",
    short:
      "Help families understand academic pathways, destinations, costs and important decisions.",
    icon: "users",
    audience: "Parents",
    stage: "Connect",
    intro:
      "Families make these decisions together. We give parents the same clarity the student receives, in practical terms.",
    expect: [
      "A plain explanation of pathways and qualifications",
      "Cost and timeline considerations",
      "Questions worth asking before committing",
      "A shared plan the whole family understands",
    ],
  },
  {
    slug: "school-programmes",
    title: "School Programmes",
    short:
      "Career guidance, student profiling, future planning and international education programmes for schools.",
    icon: "school",
    audience: "Schools",
    stage: "Connect",
    intro:
      "Structured pathway sessions delivered with schools, designed around the questions students and parents actually ask.",
    expect: [
      "Career discovery and subject-selection workshops",
      "University readiness and pathway sessions",
      "International education seminars",
      "Parent information sessions and school visits",
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Old URLs kept working after the repositioning. */
export const legacyServiceSlugs: Record<string, string> = {
  "study-counselling": "career-guidance",
  "course-selection": "pathway-planning",
  "visa-guidance": "international-education",
  "pre-departure": "application-support",
};

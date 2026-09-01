export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: "compass" | "layers" | "fileText" | "shieldCheck" | "luggage";
  intro: string;
  expect: string[];
};

export const services: Service[] = [
  {
    slug: "study-counselling",
    title: "Study & Career Counselling",
    short: "Clarify your goals and understand which study pathways realistically fit your profile.",
    icon: "compass",
    intro:
      "A structured conversation about your academic background, interests and long-term direction, so decisions are made with context rather than guesswork.",
    expect: [
      "A review of your qualifications and study history",
      "Discussion of study levels and fields that align with your goals",
      "Honest feedback on where more preparation may be needed",
      "A shortlist of directions worth exploring further",
    ],
  },
  {
    slug: "course-selection",
    title: "Course & University Selection",
    short: "Compare programmes and institutions against your goals, budget and entry profile.",
    icon: "layers",
    intro:
      "Choosing where to apply matters as much as how you apply. We help you compare options on the criteria that affect your outcome.",
    expect: [
      "A comparison of programmes across your preferred destinations",
      "Guidance on entry requirements for each option",
      "Consideration of budget, intake timing and location",
      "A prioritised application shortlist",
    ],
  },
  {
    slug: "application-support",
    title: "Application Support",
    short: "Prepare complete, well-presented applications with the right supporting documents.",
    icon: "fileText",
    intro:
      "Applications are assessed on completeness and clarity. We help you assemble and review each element before submission.",
    expect: [
      "A document checklist tailored to your applications",
      "Support with personal statements and supporting materials",
      "Review before submission",
      "Tracking of application progress and responses",
    ],
  },
  {
    slug: "visa-guidance",
    title: "Visa Guidance",
    short: "Understand the student visa process and prepare your documentation carefully.",
    icon: "shieldCheck",
    intro:
      "Visa rules differ by country and change over time. We help you understand the process and prepare, while requirements are always verified against official sources.",
    expect: [
      "An overview of the process for your destination",
      "Support organising required documentation",
      "Preparation for interviews where applicable",
      "Guidance on timelines and sequencing",
    ],
  },
  {
    slug: "pre-departure",
    title: "Pre-departure Support",
    short: "Get practically ready for travel, accommodation and your first weeks abroad.",
    icon: "luggage",
    intro:
      "The period between an offer and arrival involves many small decisions. We help you plan them in the right order.",
    expect: [
      "A pre-departure checklist",
      "Guidance on accommodation options",
      "Orientation on daily life, budgeting and student services",
      "A point of contact as your departure approaches",
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

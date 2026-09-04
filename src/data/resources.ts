export const resourceCategories = [
  "Study Guides",
  "Applications",
  "Visa Guidance",
  "Financial Planning",
  "Student Life",
] as const;

export type ResourceCategory = (typeof resourceCategories)[number];

export type Resource = {
  slug: string;
  title: string;
  category: ResourceCategory;
  excerpt: string;
  readTime: string;
  date: string;
  body: { heading: string; paragraphs: string[] }[];
};

/** Sample editorial content — replace with verified articles before launch. */
export const resources: Resource[] = [
  {
    slug: "how-to-start-planning-your-study-abroad-journey",
    title: "How to Start Planning Your Study Abroad",
    category: "Study Guides",
    excerpt:
      "A calm, step-by-step way to move from a general idea about studying abroad to a realistic plan.",
    readTime: "6 min read",
    date: "2026-01-14",
    body: [
      {
        heading: "Begin with your goal, not the destination",
        paragraphs: [
          "It is tempting to start by choosing a country. In practice, the clearest plans start with the outcome you want from your studies: the level you intend to reach, the field you want to work in, and the timeframe you are working with.",
          "Once those are defined, destinations become a comparison exercise rather than a guess.",
        ],
      },
      {
        heading: "Map your current position honestly",
        paragraphs: [
          "List your highest completed qualification, your results, and any language tests you have taken. This is the profile institutions will assess, and knowing it early prevents wasted applications.",
        ],
      },
      {
        heading: "Set a working timeline",
        paragraphs: [
          "Work backwards from your intended intake. Document preparation, testing and visa processing all take time, and timelines vary by destination.",
        ],
      },
    ],
  },
  {
    slug: "documents-you-may-need-when-applying-abroad",
    title: "Documents You May Need When Applying Abroad",
    category: "Applications",
    excerpt:
      "A general checklist of the documents commonly requested during international applications.",
    readTime: "5 min read",
    date: "2026-01-22",
    body: [
      {
        heading: "Core academic documents",
        paragraphs: [
          "Most applications request transcripts and certificates for your highest completed qualification. Requirements for certification and translation vary by institution.",
        ],
      },
      {
        heading: "Identity and supporting documents",
        paragraphs: [
          "A valid travel document is usually required, along with any programme-specific supporting materials such as a personal statement or references.",
        ],
      },
      {
        heading: "Keep one organised folder",
        paragraphs: [
          "Storing clearly named digital copies in a single place makes each subsequent application significantly faster.",
        ],
      },
    ],
  },
  {
    slug: "how-to-compare-study-destinations",
    title: "How to Compare Study Destinations",
    category: "Study Guides",
    excerpt:
      "Five practical criteria that make destination comparison objective instead of emotional.",
    readTime: "7 min read",
    date: "2026-02-03",
    body: [
      {
        heading: "Compare on criteria, not reputation",
        paragraphs: [
          "Entry requirements, language expectations, intake timing, total cost and post-study context are the criteria that most affect your experience.",
        ],
      },
      {
        heading: "Build a simple comparison table",
        paragraphs: [
          "Score each destination against your own priorities. The right answer is the one that fits your profile, not the one most commonly discussed.",
        ],
      },
    ],
  },
  {
    slug: "questions-to-ask-before-choosing-a-university",
    title: "Questions to Ask Before Choosing a University",
    category: "Applications",
    excerpt:
      "The questions that reveal whether an institution genuinely fits your goals and circumstances.",
    readTime: "5 min read",
    date: "2026-02-18",
    body: [
      {
        heading: "About the programme",
        paragraphs: [
          "What is the structure of the programme, how is it assessed, and what does progression look like across each year of study?",
        ],
      },
      {
        heading: "About support and cost",
        paragraphs: [
          "What student support exists for international students, and what is the realistic total cost of studying and living there?",
        ],
      },
    ],
  },
  {
    slug: "planning-the-cost-of-studying-abroad",
    title: "Planning the Cost of Studying Abroad",
    category: "Financial Planning",
    excerpt: "How to build a realistic budget that covers more than tuition alone.",
    readTime: "6 min read",
    date: "2026-03-02",
    body: [
      {
        heading: "Beyond tuition",
        paragraphs: [
          "Accommodation, transport, insurance, study materials and everyday living costs all belong in your plan. Figures differ significantly by city.",
        ],
      },
      {
        heading: "Plan in ranges",
        paragraphs: [
          "Budget in ranges rather than exact figures, and revisit the plan as your shortlist narrows.",
        ],
      },
    ],
  },
  {
    slug: "settling-into-student-life-abroad",
    title: "Settling Into Student Life Abroad",
    category: "Student Life",
    excerpt: "Practical guidance for the first weeks after arrival.",
    readTime: "4 min read",
    date: "2026-03-15",
    body: [
      {
        heading: "The first two weeks",
        paragraphs: [
          "Registration, banking, transport and orientation events usually happen quickly. Handling them in sequence reduces pressure later in the term.",
        ],
      },
      {
        heading: "Build a support network early",
        paragraphs: [
          "Student services, societies and international student offices exist precisely for this period. Using them early makes a measurable difference.",
        ],
      },
    ],
  },
];

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);

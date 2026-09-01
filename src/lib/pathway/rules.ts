import type {
  CareerFamily,
  DegreeFamily,
  DestinationSuggestion,
  NextStep,
  PathwayEvaluation,
  PathwayProfile,
} from "./types";

/* ------------------------------------------------------------------ */
/* Reference tables — deterministic, easy to extend or replace later.  */
/* ------------------------------------------------------------------ */

const careerCatalogue: Record<string, CareerFamily> = {
  computing: {
    key: "computing",
    title: "Computing & AI",
    description: "Building software, working with data and applying artificial intelligence.",
    exampleRoles: [
      "Software developer",
      "Data analyst",
      "AI/ML practitioner",
      "Cybersecurity analyst",
    ],
  },
  engineering: {
    key: "engineering",
    title: "Engineering & Technology",
    description: "Designing, testing and improving physical systems and infrastructure.",
    exampleRoles: [
      "Civil engineer",
      "Mechanical engineer",
      "Electrical engineer",
      "Project engineer",
    ],
  },
  business: {
    key: "business",
    title: "Business & Finance",
    description: "Managing organisations, money, markets and commercial decisions.",
    exampleRoles: ["Financial analyst", "Accountant", "Marketing specialist", "Operations manager"],
  },
  health: {
    key: "health",
    title: "Healthcare & Life Sciences",
    description: "Clinical, laboratory and public-health work focused on wellbeing.",
    exampleRoles: ["Nurse", "Biomedical scientist", "Public health officer", "Pharmacist"],
  },
  creative: {
    key: "creative",
    title: "Creative Industries",
    description: "Design, media, communication and visual storytelling.",
    exampleRoles: ["Graphic designer", "Architect", "Content producer", "UX designer"],
  },
  law: {
    key: "law",
    title: "Law, Policy & Governance",
    description: "Legal practice, public policy, diplomacy and international affairs.",
    exampleRoles: ["Legal adviser", "Policy analyst", "Diplomatic service", "Compliance officer"],
  },
  social: {
    key: "social",
    title: "Psychology & Social Sciences",
    description: "Understanding people, behaviour, communities and social systems.",
    exampleRoles: [
      "Psychologist",
      "Social researcher",
      "HR specialist",
      "Community programme lead",
    ],
  },
  environment: {
    key: "environment",
    title: "Environment & Agriculture",
    description: "Food systems, climate, natural resources and sustainable development.",
    exampleRoles: [
      "Agronomist",
      "Environmental officer",
      "Sustainability analyst",
      "Food scientist",
    ],
  },
  hospitality: {
    key: "hospitality",
    title: "Aviation, Travel & Hospitality",
    description: "Aviation operations, tourism, events and service management.",
    exampleRoles: [
      "Aviation management",
      "Hospitality manager",
      "Travel operations",
      "Events lead",
    ],
  },
  education: {
    key: "education",
    title: "Education & Training",
    description: "Teaching, learning design and education leadership.",
    exampleRoles: ["Teacher", "Learning designer", "Education administrator", "Trainer"],
  },
};

const interestToCareer: Record<string, string[]> = {
  "Science & Health": ["health", "environment"],
  "Technology & AI": ["computing", "engineering"],
  Engineering: ["engineering", "computing"],
  "Business & Finance": ["business"],
  "Law & Politics": ["law", "social"],
  "Art, Design & Media": ["creative"],
  "Aviation & Hospitality": ["hospitality", "business"],
  "Environment & Agriculture": ["environment"],
  "Psychology & Social Sciences": ["social", "health"],
  Education: ["education", "social"],
};

const subjectToCareer: Record<string, string[]> = {
  Mathematics: ["computing", "engineering", "business"],
  "Advanced Mathematics": ["computing", "engineering"],
  Physics: ["engineering", "computing"],
  Chemistry: ["health", "environment"],
  Biology: ["health", "environment"],
  "Computer Science": ["computing"],
  Business: ["business"],
  Economics: ["business", "law"],
  Accounting: ["business"],
  English: ["creative", "law"],
  French: ["law", "creative"],
  History: ["law", "social"],
  Geography: ["environment", "social"],
  Psychology: ["social", "health"],
  "Art & Design": ["creative"],
};

const degreesByCareer: Record<string, DegreeFamily[]> = {
  computing: [
    {
      key: "cs",
      title: "Computer Science",
      description: "Core computing, algorithms and software foundations.",
      relatedTo: "Computing & AI",
    },
    {
      key: "ai",
      title: "Artificial Intelligence",
      description: "Machine learning, intelligent systems and applied AI.",
      relatedTo: "Computing & AI",
    },
    {
      key: "ds",
      title: "Data Science",
      description: "Statistics, analytics and data-driven decision making.",
      relatedTo: "Computing & AI",
    },
    {
      key: "se",
      title: "Software Engineering",
      description: "Building and maintaining large-scale software systems.",
      relatedTo: "Computing & AI",
    },
  ],
  engineering: [
    {
      key: "civil",
      title: "Civil Engineering",
      description: "Infrastructure, construction and the built environment.",
      relatedTo: "Engineering & Technology",
    },
    {
      key: "mech",
      title: "Mechanical Engineering",
      description: "Machines, materials, energy and manufacturing.",
      relatedTo: "Engineering & Technology",
    },
    {
      key: "eee",
      title: "Electrical & Electronic Engineering",
      description: "Power, electronics and control systems.",
      relatedTo: "Engineering & Technology",
    },
  ],
  business: [
    {
      key: "bba",
      title: "Business Administration",
      description: "Management, strategy and organisational operations.",
      relatedTo: "Business & Finance",
    },
    {
      key: "fin",
      title: "Finance & Accounting",
      description: "Financial analysis, reporting and investment.",
      relatedTo: "Business & Finance",
    },
    {
      key: "econ",
      title: "Economics",
      description: "Markets, policy and quantitative economic analysis.",
      relatedTo: "Business & Finance",
    },
  ],
  health: [
    {
      key: "nursing",
      title: "Nursing & Health Sciences",
      description: "Clinical care and applied health practice.",
      relatedTo: "Healthcare & Life Sciences",
    },
    {
      key: "biomed",
      title: "Biomedical Science",
      description: "Laboratory science underpinning diagnosis and treatment.",
      relatedTo: "Healthcare & Life Sciences",
    },
    {
      key: "pubhealth",
      title: "Public Health",
      description: "Population health, epidemiology and health systems.",
      relatedTo: "Healthcare & Life Sciences",
    },
  ],
  creative: [
    {
      key: "design",
      title: "Design & Visual Communication",
      description: "Graphic, product and digital design practice.",
      relatedTo: "Creative Industries",
    },
    {
      key: "media",
      title: "Media & Communication",
      description: "Journalism, digital media and storytelling.",
      relatedTo: "Creative Industries",
    },
    {
      key: "arch",
      title: "Architecture",
      description: "Spatial design combining creativity and technical skill.",
      relatedTo: "Creative Industries",
    },
  ],
  law: [
    {
      key: "law",
      title: "Law",
      description: "Legal systems, reasoning and professional practice.",
      relatedTo: "Law, Policy & Governance",
    },
    {
      key: "ir",
      title: "International Relations",
      description: "Diplomacy, global politics and policy.",
      relatedTo: "Law, Policy & Governance",
    },
    {
      key: "pubadmin",
      title: "Public Administration",
      description: "Governance, public services and institutions.",
      relatedTo: "Law, Policy & Governance",
    },
  ],
  social: [
    {
      key: "psych",
      title: "Psychology",
      description: "Human behaviour, cognition and applied psychology.",
      relatedTo: "Psychology & Social Sciences",
    },
    {
      key: "socio",
      title: "Sociology & Social Policy",
      description: "Communities, institutions and social change.",
      relatedTo: "Psychology & Social Sciences",
    },
    {
      key: "hr",
      title: "Human Resource Management",
      description: "People, organisations and workplace development.",
      relatedTo: "Psychology & Social Sciences",
    },
  ],
  environment: [
    {
      key: "envsci",
      title: "Environmental Science",
      description: "Climate, ecosystems and resource management.",
      relatedTo: "Environment & Agriculture",
    },
    {
      key: "agri",
      title: "Agriculture & Food Systems",
      description: "Crop, livestock and food-supply science.",
      relatedTo: "Environment & Agriculture",
    },
    {
      key: "sustain",
      title: "Sustainable Development",
      description: "Policy and practice for long-term development.",
      relatedTo: "Environment & Agriculture",
    },
  ],
  hospitality: [
    {
      key: "aviation",
      title: "Aviation Management",
      description: "Airline, airport and aviation operations.",
      relatedTo: "Aviation, Travel & Hospitality",
    },
    {
      key: "hosp",
      title: "Hospitality & Tourism Management",
      description: "Service operations, tourism and events.",
      relatedTo: "Aviation, Travel & Hospitality",
    },
  ],
  education: [
    {
      key: "edu",
      title: "Education",
      description: "Teaching practice, curriculum and learning.",
      relatedTo: "Education & Training",
    },
    {
      key: "edtech",
      title: "Educational Technology",
      description: "Digital learning design and delivery.",
      relatedTo: "Education & Training",
    },
  ],
};

type DestinationFacts = {
  name: string;
  region: "Africa" | "Europe" | "Asia" | "North America" | "Oceania" | "Middle East";
  language: string;
  costBand: "lower" | "moderate" | "higher";
  distance: "closer" | "medium" | "far";
  why: string;
};

const destinationFacts: DestinationFacts[] = [
  {
    name: "Mauritius",
    region: "Africa",
    language: "English and French are widely used.",
    costBand: "lower",
    distance: "closer",
    why: "An English- and French-friendly island option relatively close to East Africa.",
  },
  {
    name: "South Africa",
    region: "Africa",
    language: "English is widely used in teaching.",
    costBand: "lower",
    distance: "closer",
    why: "A regional option with a broad range of study areas.",
  },
  {
    name: "Malaysia",
    region: "Asia",
    language: "English is widely used in international programmes.",
    costBand: "lower",
    distance: "medium",
    why: "Often explored for lower living costs and English-taught programmes.",
  },
  {
    name: "Malta",
    region: "Europe",
    language: "English is widely used.",
    costBand: "moderate",
    distance: "medium",
    why: "A small English-speaking European base worth comparing.",
  },
  {
    name: "Türkiye",
    region: "Europe",
    language: "English-taught programmes exist alongside Turkish.",
    costBand: "lower",
    distance: "medium",
    why: "Frequently explored for cost and a wide programme range.",
  },
  {
    name: "India",
    region: "Asia",
    language: "English is widely used in teaching.",
    costBand: "lower",
    distance: "medium",
    why: "Large higher-education sector with English-taught options.",
  },
  {
    name: "UAE",
    region: "Middle East",
    language: "English is widely used.",
    costBand: "moderate",
    distance: "medium",
    why: "Regional hub with international branch campuses.",
  },
  {
    name: "China",
    region: "Asia",
    language: "English-taught programmes exist alongside Mandarin.",
    costBand: "moderate",
    distance: "far",
    why: "Worth exploring for technology and engineering directions.",
  },
  {
    name: "Germany",
    region: "Europe",
    language: "German and some English-taught programmes.",
    costBand: "moderate",
    distance: "far",
    why: "Strong engineering and applied-science tradition.",
  },
  {
    name: "France",
    region: "Europe",
    language: "French, with some English-taught programmes.",
    costBand: "moderate",
    distance: "far",
    why: "A natural option if you study or prefer French.",
  },
  {
    name: "Netherlands",
    region: "Europe",
    language: "Many English-taught programmes.",
    costBand: "higher",
    distance: "far",
    why: "Known for internationally oriented, English-taught degrees.",
  },
  {
    name: "Ireland",
    region: "Europe",
    language: "English.",
    costBand: "higher",
    distance: "far",
    why: "English-speaking European option with a technology sector.",
  },
  {
    name: "United Kingdom",
    region: "Europe",
    language: "English.",
    costBand: "higher",
    distance: "far",
    why: "Widely explored for shorter, focused degree structures.",
  },
  {
    name: "Canada",
    region: "North America",
    language: "English and French.",
    costBand: "higher",
    distance: "far",
    why: "Bilingual environment with broad programme choice.",
  },
  {
    name: "United States",
    region: "North America",
    language: "English.",
    costBand: "higher",
    distance: "far",
    why: "Flexible degree structures and wide subject choice.",
  },
  {
    name: "Australia",
    region: "Oceania",
    language: "English.",
    costBand: "higher",
    distance: "far",
    why: "Large international student community.",
  },
];

const budgetRank: Record<string, number> = {
  "Under $15,000": 1,
  "$15,000–$25,000": 2,
  "$25,000–$40,000": 3,
  "$40,000–$60,000": 4,
  "$60,000+": 5,
};

const costBandRank: Record<DestinationFacts["costBand"], number> = {
  lower: 1,
  moderate: 3,
  higher: 4,
};

const budgetLabel: Record<DestinationFacts["costBand"], string> = {
  lower: "Often explored by students working with a lower budget.",
  moderate: "Costs vary widely — plan in ranges. [Content to be confirmed]",
  higher: "Typically a higher-cost option; funding planning matters.",
};

const distanceLabel: Record<DestinationFacts["distance"], string> = {
  closer: "Relatively close to East Africa.",
  medium: "A medium-distance move.",
  far: "A long-distance move — plan travel and settling-in time.",
};

/* ------------------------------------------------------------------ */
/* Modular evaluation functions                                        */
/* ------------------------------------------------------------------ */

export function evaluateCareerFamilies(profile: PathwayProfile): CareerFamily[] {
  const scores = new Map<string, number>();
  const add = (key: string, weight: number) => scores.set(key, (scores.get(key) ?? 0) + weight);

  profile.interests.forEach((interest) => {
    (interestToCareer[interest] ?? []).forEach((key, i) => add(key, i === 0 ? 3 : 2));
  });
  profile.subjects.forEach((subject) => {
    (subjectToCareer[subject] ?? []).forEach((key, i) => add(key, i === 0 ? 2 : 1));
  });

  const ranked = [...scores.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => careerCatalogue[key])
    .filter((c): c is CareerFamily => Boolean(c));

  if (ranked.length === 0) {
    // Nothing selected, or "not sure yet" — offer a broad, neutral starting set.
    return [
      careerCatalogue["business"],
      careerCatalogue["computing"],
      careerCatalogue["health"],
      careerCatalogue["creative"],
    ].filter((c): c is CareerFamily => Boolean(c));
  }

  return ranked.slice(0, 5);
}

export function evaluateDegreeFamilies(
  profile: PathwayProfile,
  careers: CareerFamily[] = evaluateCareerFamilies(profile),
): DegreeFamily[] {
  const seen = new Set<string>();
  const result: DegreeFamily[] = [];

  careers.forEach((career) => {
    (degreesByCareer[career.key] ?? []).forEach((degree) => {
      if (!seen.has(degree.key)) {
        seen.add(degree.key);
        result.push(degree);
      }
    });
  });

  return result.slice(0, 8);
}

export function evaluateDestinationPreferences(profile: PathwayProfile): DestinationSuggestion[] {
  const chosen = profile.preferredDestinations;
  const wantsEverything = chosen.includes("Show me everything") || chosen.length === 0;

  const regionSelections: Record<string, DestinationFacts["region"][]> = {
    Europe: ["Europe"],
    Asia: ["Asia"],
    Africa: ["Africa"],
  };

  const scored = destinationFacts.map((dest) => {
    let score = 0;

    if (chosen.includes(dest.name)) score += 6;
    Object.entries(regionSelections).forEach(([label, regions]) => {
      if (chosen.includes(label) && regions.includes(dest.region)) score += 3;
    });
    if (wantsEverything) score += 1;

    const budget = budgetRank[profile.budgetRange];
    if (budget) {
      const gap = costBandRank[dest.costBand] - budget;
      if (gap <= 0) score += 2;
      else if (gap === 1) score += 1;
      else score -= 2;
    }

    if (profile.scholarshipImportance === "Essential" && dest.costBand === "higher") score -= 1;

    if (profile.languagePreference === "English" && dest.language.includes("English")) score += 2;
    if (profile.languagePreference === "French" && dest.language.includes("French")) score += 2;
    if (profile.languagePreference === "English or French" && /English|French/.test(dest.language))
      score += 1;
    if (profile.languagePreference === "Open to learning another language") score += 1;

    if (profile.travelPreference === "Prefer closer to East Africa") {
      if (dest.distance === "closer") score += 3;
      if (dest.distance === "far") score -= 2;
    }
    if (profile.travelPreference === "Anywhere that fits me") score += 1;

    return { dest, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ dest }) => ({
      name: dest.name,
      why: dest.why,
      budget: budgetLabel[dest.costBand],
      language: dest.language,
      distance: distanceLabel[dest.distance],
    }));
}

export function generateNextSteps(profile: PathwayProfile): NextStep[] {
  const steps: NextStep[] = [
    {
      title: "Explore",
      description:
        "Choose 2–4 degree areas that genuinely interest you and read about what they involve.",
    },
    {
      title: "Compare",
      description: "Compare destinations based on academic fit, cost, language and lifestyle.",
    },
    {
      title: "Prepare",
      description:
        "Understand academic prerequisites, language requirements and application timelines for the routes you like.",
    },
    {
      title: "Get personalised advice",
      description:
        "A UniLink adviser can help turn this initial pathway into a practical education plan.",
    },
  ];

  if (
    profile.scholarshipImportance === "Essential" ||
    profile.scholarshipImportance === "Important"
  ) {
    steps.splice(2, 0, {
      title: "Plan funding early",
      description:
        "Funding routes usually have earlier deadlines than admissions. Start mapping options as you shortlist.",
    });
  }

  if (profile.level === "Lower secondary" || profile.level === "Upper secondary") {
    steps.unshift({
      title: "Focus your subjects",
      description:
        "Subject choices now shape which degrees stay open later. Review them against the directions below.",
    });
  }

  return steps;
}

function inferInterests(profile: PathwayProfile, careers: CareerFamily[]): string[] {
  const explicit = new Set(profile.interests);
  return careers
    .map((c) => c.title)
    .filter((title) => !explicit.has(title))
    .slice(0, 4);
}

export function evaluatePathway(profile: PathwayProfile): PathwayEvaluation {
  const careerFamilies = evaluateCareerFamilies(profile);
  const degreeFamilies = evaluateDegreeFamilies(profile, careerFamilies);

  return {
    headline: "Here are some directions worth exploring based on what you've told us.",
    interests: profile.interests.filter((i) => i !== "I'm not sure yet"),
    inferredInterests: inferInterests(profile, careerFamilies),
    careerFamilies,
    degreeFamilies,
    destinations: evaluateDestinationPreferences(profile),
    nextSteps: generateNextSteps(profile),
  };
}

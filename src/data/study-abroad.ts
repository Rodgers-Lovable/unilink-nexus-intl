import { destinations } from "./destinations";

/**
 * The six interconnected decisions behind a study-abroad plan, shown in the
 * Decision Compass. Adapted from the page's previous "essentials" copy —
 * "Why Study Abroad" becomes the compass's intro rather than a seventh node.
 */
export const compassIntro = {
  eyebrow: "The essentials",
  title: "Every study-abroad plan comes down to a few connected decisions",
  description:
    "Studying internationally can open doors you won't find at home, but only if the decisions behind it fit you. Explore each one below.",
};

export const compassDimensions = [
  {
    key: "destination",
    title: "Destination",
    question: "Where should you study?",
    description:
      "Compare destinations on entry requirements, language expectations, intake timing and total cost rather than reputation alone.",
  },
  {
    key: "study-level",
    title: "Study Level",
    question: "What qualification fits where you are academically?",
    description:
      "Your highest completed qualification usually determines which levels you can enter directly, and where a pathway or bridging option may be needed.",
  },
  {
    key: "requirements",
    title: "Entry Requirements",
    question: "What will institutions require from you?",
    description:
      "Requirements are set by each institution and programme. Two universities in the same country can assess the same profile differently.",
  },
  {
    key: "finances",
    title: "Finances",
    question: "What will the full study journey realistically cost?",
    description:
      "Plan in ranges covering tuition, accommodation, transport, insurance and living costs. Figures vary by city and institution.",
  },
  {
    key: "timing",
    title: "Timing",
    question: "When should planning and applications begin?",
    description:
      "Work backwards from your intended intake. Testing, documents and processing all need time before submission deadlines.",
  },
  {
    key: "visa",
    title: "Visa & Preparation",
    question: "What will you need after receiving an offer?",
    description:
      "Student visa processes differ by country and change over time. Requirements should always be verified against official government sources.",
  },
] as const;

/** Large typographic statement between the compass and the destination explorer. */
export const breathingStatement =
  "The best destination isn't necessarily the most popular one. It's the one that fits your goals, qualifications, finances and circumstances.";

/**
 * Coarse hand-placed land-mass blocks driving the dot-matrix world map.
 * This is a stylised approximation, not geographic data — each block is a
 * {row, col} rectangle on a GRID_COLS x GRID_ROWS grid, unioned to fake a
 * tapered coastline per continent.
 */
export const GRID_COLS = 44;
export const GRID_ROWS = 22;

export const worldMapLandBlocks: { rows: [number, number]; cols: [number, number] }[] = [
  // North America
  { rows: [1, 4], cols: [2, 11] },
  { rows: [5, 7], cols: [3, 11] },
  { rows: [8, 9], cols: [6, 10] },
  { rows: [10, 10], cols: [8, 10] },
  // Greenland
  { rows: [0, 2], cols: [18, 21] },
  // South America
  { rows: [11, 13], cols: [13, 18] },
  { rows: [14, 17], cols: [14, 17] },
  { rows: [18, 21], cols: [15, 16] },
  // Europe
  { rows: [2, 6], cols: [20, 27] },
  // Africa
  { rows: [6, 9], cols: [19, 29] },
  { rows: [10, 14], cols: [20, 28] },
  { rows: [15, 18], cols: [21, 26] },
  // Middle East
  { rows: [6, 8], cols: [28, 31] },
  // Russia / Northern Asia
  { rows: [1, 4], cols: [26, 40] },
  // Central Asia
  { rows: [5, 7], cols: [27, 34] },
  // China / East Asia
  { rows: [5, 8], cols: [33, 39] },
  // Japan
  { rows: [5, 7], cols: [39, 40] },
  // India
  { rows: [9, 11], cols: [30, 34] },
  // Southeast Asia
  { rows: [10, 12], cols: [33, 38] },
  // Indonesia archipelago
  { rows: [12, 14], cols: [35, 41] },
  // Australia
  { rows: [16, 19], cols: [35, 41] },
  // New Zealand
  { rows: [19, 20], cols: [42, 43] },
];

/**
 * Every destination from destinations.ts, positioned on the grid above plus
 * a couple of "considerations" bullets pulled from each destination's
 * existing data (studyLevels / popularAreas / intakes) — nothing invented
 * here. Marker positions are a stylised approximation, not survey data.
 */
export const worldMapDestinations = destinations.map((d) => {
  const position: Record<string, { row: number; col: number }> = {
    malaysia: { row: 11, col: 36 },
    uae: { row: 7, col: 30 },
    mauritius: { row: 17, col: 30 },
    malta: { row: 6, col: 24 },
    hungary: { row: 4, col: 25 },
    "united-kingdom": { row: 3, col: 21 },
    canada: { row: 3, col: 9 },
    australia: { row: 16, col: 38 },
    "united-states": { row: 6, col: 10 },
    germany: { row: 4, col: 23 },
  };
  return {
    slug: d.slug,
    name: d.name,
    region: d.region,
    intro: d.intro,
    ...position[d.slug]!,
    considerations: [
      `Study levels: ${d.studyLevels.slice(0, 3).join(", ")}`,
      `Popular areas: ${d.popularAreas.slice(0, 3).join(", ")}`,
      `Intakes: ${d.intakes.join(" · ")}`,
    ],
  };
});

/**
 * The study-abroad journey, six stages from first considering it to
 * departure — reframed from the existing `applicationStages`/`howItWorksStages`
 * process descriptions into the brief's Explore→Go shape.
 */
export const studyAbroadJourney = [
  {
    stage: "01",
    title: "Explore",
    description: "Understand your possibilities — careers, subjects and study destinations.",
  },
  {
    stage: "02",
    title: "Compare",
    description: "Compare destinations, courses, requirements and realistic costs.",
  },
  {
    stage: "03",
    title: "Plan",
    description: "Build a realistic study and application strategy around your profile.",
  },
  {
    stage: "04",
    title: "Apply",
    description: "Prepare documents and submit applications, tracking progress as offers arrive.",
  },
  {
    stage: "05",
    title: "Prepare",
    description: "Handle offer conditions, visa requirements and pre-departure planning.",
  },
  {
    stage: "06",
    title: "Go",
    description: "Begin your international study journey with a plan already in place.",
  },
] as const;

/**
 * Planning-stage calendar — deliberately dateless, since intakes vary by
 * university, country, programme and year. Communicates sequence, not dates.
 */
export const calendarStages = [
  {
    title: "Explore",
    description: "Research destinations and programmes that fit your direction.",
  },
  {
    title: "Shortlist",
    description: "Compare requirements, costs and intakes across your options.",
  },
  {
    title: "Prepare",
    description: "Gather academic records and any supporting documents.",
  },
  {
    title: "Apply",
    description: "Submit applications according to each institution's own timeline.",
  },
  {
    title: "Offer",
    description: "Review decisions and conditions, then confirm your next step.",
  },
  {
    title: "Prepare to Travel",
    description: "Visa preparation and pre-departure planning.",
  },
] as const;

/**
 * Parallel student/UniLink support track — reuses the same guidance points
 * already shown in the page's checklist, paired with the moment a student
 * would be at when each becomes relevant.
 */
export const supportTrack = [
  {
    student: "Unsure where to begin",
    support: "A structured review of your academic profile",
  },
  {
    student: "Comparing destinations and programmes",
    support: "Destination and programme comparison against your goals",
  },
  {
    student: "Getting applications ready",
    support: "Document preparation and application review",
  },
  {
    student: "Holding an offer, getting ready to leave",
    support: "Guidance through visa preparation and pre-departure planning",
  },
] as const;

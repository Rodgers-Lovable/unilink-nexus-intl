/**
 * Editable destination data.
 * NOTE: — supported destinations and all
 * requirement/cost details must be verified before publication.
 */

export type Destination = {
  slug: string;
  name: string;
  region: string;
  intro: string;
  overview: string;
  whyStudy: string[];
  educationSystem: string;
  popularAreas: string[];
  studyLevels: string[];
  entryRequirements: string[];
  costsPlaceholder: string;
  intakes: string[];
  visaOverview: string;
  studentLife: string;
  faqs: { q: string; a: string }[];
};

export const destinations: Destination[] = [
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "Europe",
    intro:
      "Compact, well-structured degrees and a long tradition of internationally recognised universities.",
    overview:
      "The United Kingdom hosts a wide range of universities across England, Scotland, Wales and Northern Ireland, with programmes designed to be completed in a relatively short time.",
    whyStudy: [
      "Shorter programme durations at several study levels",
      "Wide subject choice across universities and colleges",
      "English-language teaching environment",
      "Strong international student communities",
    ],
    educationSystem:
      "Undergraduate, taught postgraduate and research pathways, with entry usually assessed on prior qualifications and English proficiency.",
    popularAreas: [
      "Business & Management",
      "Computing & Data",
      "Engineering",
      "Health Sciences",
      "Law",
    ],
    studyLevels: ["Foundation", "Bachelor's", "Master's", "PhD"],
    entryRequirements: [
      "Recognised prior qualification for the intended study level",
      "Evidence of English proficiency where required",
      "Supporting documents such as transcripts and identification",
    ],
    costsPlaceholder: "Tuition and living costs vary by institution, city and programme.",
    intakes: ["September / October", "January (selected programmes)"],
    visaOverview:
      "Student visa requirements are set by the UK government and change over time. Requirements should be checked against official sources at the time of application.",
    studentLife:
      "Campus life ranges from large city universities to smaller campus towns, with student unions, societies and part-time work rules that vary by visa type.",
    faqs: [
      {
        q: "How long do programmes usually take?",
        a: "Programme length varies by level and institution. Your advisor can outline options relevant to your profile.",
      },
      {
        q: "Do I need an English test?",
        a: "Requirements differ by institution and programme. Some applicants may qualify for alternative evidence.",
      },
    ],
  },
  {
    slug: "canada",
    name: "Canada",
    region: "North America",
    intro:
      "A broad mix of universities and colleges, with study options in both large cities and smaller communities.",
    overview:
      "Canada offers university and college pathways across provinces, each with its own institutions and admission practices.",
    whyStudy: [
      "University and college pathways at several levels",
      "Multicultural student communities",
      "Programmes with applied and co-operative components",
      "Study options across a range of city sizes",
    ],
    educationSystem:
      "Provincially regulated institutions offering diplomas, bachelor's, master's and doctoral programmes.",
    popularAreas: [
      "Computing & IT",
      "Business",
      "Engineering Technology",
      "Healthcare",
      "Hospitality",
    ],
    studyLevels: ["Diploma", "Bachelor's", "Master's", "PhD"],
    entryRequirements: [
      "Academic transcripts for your highest completed qualification",
      "Language proficiency evidence where required",
      "Programme-specific documents",
    ],
    costsPlaceholder: "Costs differ by province, institution and programme.",
    intakes: ["September", "January", "May (selected programmes)"],
    visaOverview:
      "Study permit requirements are determined by Canadian immigration authorities and should be verified directly.",
    studentLife:
      "Student services, housing options and work rules vary between institutions and provinces.",
    faqs: [
      {
        q: "Are colleges different from universities?",
        a: "Institution types differ in focus and programme structure. An advisor can help you compare them against your goals.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    region: "Oceania",
    intro:
      "Universities spread across coastal and inland cities, with a strong focus on research and applied study.",
    overview:
      "Australia's higher education sector includes universities and vocational providers with nationally regulated qualifications.",
    whyStudy: [
      "Nationally regulated qualification framework",
      "Research-active universities",
      "Vocational and higher education pathways",
      "Established international student support services",
    ],
    educationSystem:
      "Qualifications are mapped to a national framework covering certificates, diplomas, bachelor's and postgraduate awards.",
    popularAreas: [
      "Nursing & Health",
      "Information Technology",
      "Engineering",
      "Education",
      "Business",
    ],
    studyLevels: ["Diploma", "Bachelor's", "Master's", "PhD"],
    entryRequirements: [
      "Prior qualification at an accepted level",
      "English proficiency evidence where required",
      "Genuine study intention documentation",
    ],
    costsPlaceholder: "Tuition and living costs vary widely by city and provider.",
    intakes: ["February", "July"],
    visaOverview:
      "Student visa conditions are set by Australian authorities and should be reviewed at the time of application.",
    studentLife:
      "Student life differs between metropolitan and regional campuses, including housing and transport.",
    faqs: [
      {
        q: "When should I start my application?",
        a: "Timelines depend on the intake you target. Earlier preparation generally allows more options.",
      },
    ],
  },
  {
    slug: "united-states",
    name: "United States",
    region: "North America",
    intro:
      "A large and varied higher education landscape, from liberal arts colleges to major research universities.",
    overview:
      "The United States has thousands of accredited institutions with differing admission processes and academic structures.",
    whyStudy: [
      "Very wide choice of institutions and programmes",
      "Flexible curriculum structures at undergraduate level",
      "Research opportunities across disciplines",
      "Large, diverse student populations",
    ],
    educationSystem:
      "Associate, bachelor's, master's and doctoral degrees offered by public and private institutions.",
    popularAreas: [
      "Computer Science",
      "Business & Finance",
      "Engineering",
      "Public Health",
      "Media",
    ],
    studyLevels: ["Associate", "Bachelor's", "Master's", "PhD"],
    entryRequirements: [
      "Academic records and, for some institutions, standardised tests",
      "English proficiency evidence where required",
      "Essays or recommendation letters at some institutions",
    ],
    costsPlaceholder: "Costs vary substantially between institutions and states.",
    intakes: ["Fall (August / September)", "Spring (January)"],
    visaOverview:
      "Student visa categories and interview processes are administered by US authorities.",
    studentLife:
      "Campus culture, housing and student support differ considerably between institutions.",
    faqs: [
      {
        q: "Do all universities require standardised tests?",
        a: "Requirements differ by institution and have changed in recent years. Each institution should be checked individually.",
      },
    ],
  },
  {
    slug: "germany",
    name: "Germany",
    region: "Europe",
    intro:
      "Strong engineering and applied science traditions, with public and private institutions across the country.",
    overview:
      "Germany has universities and universities of applied sciences, with programmes taught in German and, in some cases, English.",
    whyStudy: [
      "Established engineering and applied science provision",
      "Public and private institution options",
      "Some English-taught programmes at postgraduate level",
      "Central location within Europe",
    ],
    educationSystem:
      "Bachelor's, master's and doctoral degrees, with applied-science institutions offering practice-oriented study.",
    popularAreas: [
      "Mechanical Engineering",
      "Computer Science",
      "Renewable Energy",
      "Business",
      "Architecture",
    ],
    studyLevels: ["Bachelor's", "Master's", "PhD"],
    entryRequirements: [
      "Recognised secondary or tertiary qualification",
      "Language evidence in German or English depending on programme",
      "Documented academic records",
    ],
    costsPlaceholder: "Tuition arrangements differ between federal states and institution types.",
    intakes: ["Winter semester", "Summer semester (selected programmes)"],
    visaOverview:
      "National student visa and residence requirements apply and should be verified officially.",
    studentLife: "Student housing, transport passes and city living costs vary between regions.",
    faqs: [
      {
        q: "Do I need to speak German?",
        a: "It depends on the programme's language of instruction. Some programmes are taught in English.",
      },
    ],
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);

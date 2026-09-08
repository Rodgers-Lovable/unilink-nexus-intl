/**
 * Editable destination data.
 * Flagship destinations (Malaysia, UAE, Mauritius, Malta, Hungary) carry
 * researched figures current as of September 2026 — tuition, living costs,
 * visa processing times and scholarship terms all shift year to year, so
 * reconfirm specifics with the relevant institution or embassy before
 * quoting them to a student. Legacy destinations are kept for reference and
 * demoted in ordering; remove them outright only if the client asks for it.
 */

export type Destination = {
  slug: string;
  name: string;
  region: string;
  tier: "flagship" | "legacy";
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
    slug: "malaysia",
    name: "Malaysia",
    region: "Asia",
    tier: "flagship",
    intro:
      "Twin-degree pathways to UK and Australian universities, taught largely in English, at a fraction of what those degrees cost overseas.",
    overview:
      "Malaysia's higher education system runs public universities, private universities and international branch campuses side by side, many linked to partner institutions abroad through twinning arrangements. More than 170,000 international students currently study there, drawn by strong-value English-taught programmes and an established Muslim-friendly student community.",
    whyStudy: [
      "Twinning programmes (for example “1+2” or “2+1”) let you study most of a UK or Australian degree in Malaysia, then transfer, at a much lower total cost.",
      "Overall living and tuition costs run well below the UK, Australia or the US for a comparable degree.",
      "Consistently ranked among the safest countries in Southeast Asia.",
      "Halal food and prayer facilities are standard on most campuses, and English is the main language of instruction.",
    ],
    educationSystem:
      "Public universities, private universities and branch campuses of UK and Australian institutions operate alongside 35 polytechnics offering technical diplomas, all regulated by the Malaysian Qualifications Agency.",
    popularAreas: [
      "Engineering",
      "Business & Accounting",
      "Medicine & Health Sciences",
      "Computer Science & IT",
      "Hospitality & Creative Arts",
    ],
    studyLevels: ["Foundation", "Diploma", "Bachelor's", "Master's", "PhD"],
    entryRequirements: [
      "Completed secondary schooling (or equivalent) for your intended level",
      "English proficiency, typically IELTS 5.5-6.5 depending on programme",
      "Passport, certified transcripts and passport photos for your application",
    ],
    costsPlaceholder:
      "Tuition runs roughly USD 3,000-7,000 a year at public universities for programmes like business or engineering, more for medicine. Add around USD 320-540 a month for living costs. Most students budget USD 6,000-16,000 a year all in.",
    intakes: ["January / February", "June / July", "September (largest intake)"],
    visaOverview:
      "All student visa applications go through Education Malaysia Global Services (EMGS), the Ministry of Higher Education's centralised visa body. Once you hold an offer, EMGS issues a Visa Approval Letter before you travel, then a visa sticker is added on arrival. The full process usually takes four to eight weeks, so it pays to start early.",
    studentLife:
      "Cost of living is a fraction of what you'd pay in the UK or Australia, and halal food is easy to find almost anywhere. Students on a valid pass can work part-time, up to 20 hours a week, during semester breaks.",
    faqs: [
      {
        q: "How long does the Malaysian student visa take?",
        a: "Budget four to eight weeks from your Visa Approval Letter application through to a visa sticker on arrival, so apply as soon as you have an offer.",
      },
      {
        q: "Can I get a UK or Australian degree without paying UK or Australian fees the whole way through?",
        a: "Yes. Twinning programmes let you complete part of the degree in Malaysia under Malaysian Qualifications Agency oversight, then transfer to the partner university to finish it.",
      },
    ],
  },
  {
    slug: "uae",
    name: "United Arab Emirates",
    region: "Middle East",
    tier: "flagship",
    intro:
      "Branch campuses of well-known Western universities, tax-free earnings once you graduate, and one of the safest countries in the world to live in.",
    overview:
      "Dubai and Abu Dhabi host dozens of international branch campuses inside dedicated education free zones, alongside the UAE's own federal universities. It's a genuinely multicultural base, with expatriates making up close to 90% of the population.",
    whyStudy: [
      "Dozens of branch campuses of UK, Australian and other international universities operate inside Dubai's education free zones, so you study for a recognised foreign degree without leaving the region.",
      "No personal income tax on your salary once you start working, during study or after graduation.",
      "Graduates from top-ranked or highly accredited UAE universities with a strong GPA can apply for a long-term Golden Visa, letting them stay and work without a sponsor.",
      "Consistently rated among the safest countries in the world, with a genuinely multicultural population.",
    ],
    educationSystem:
      "Free zones such as Dubai International Academic City house branch campuses regulated separately from the UAE's federal and local universities, which fall under the Ministry of Education and the Commission for Academic Accreditation.",
    popularAreas: [
      "Business & Management",
      "Engineering",
      "Computer Science & IT",
      "Hospitality & Tourism",
      "Architecture",
    ],
    studyLevels: ["Foundation", "Bachelor's", "Master's", "PhD"],
    entryRequirements: [
      "Secondary school certificate, or a prior degree for postgraduate study",
      "English proficiency, typically IELTS 5.0-5.5 or equivalent",
      "Valid passport, admission letter and proof of financial support for your visa",
    ],
    costsPlaceholder:
      "Tuition typically runs USD 8,000-40,000 a year depending on the university and programme, with branch campuses usually toward the higher end. Living costs are lower outside Dubai and Abu Dhabi; Sharjah and Ajman, for example, can cut your monthly budget significantly.",
    intakes: ["September (main intake)", "January", "Some universities admit year-round"],
    visaOverview:
      "Your university sponsors a student visa once you accept an offer, usually valid for a year and renewable while you're enrolled. Processing typically takes three to five weeks, and the visa lapses if you're outside the UAE for six months or more.",
    studentLife:
      "Dubai and Abu Dhabi are consistently ranked among the world's safest cities. Costs are lower in Sharjah, Ajman or Ras Al Khaimah if Dubai's rents feel steep. Halal food and prayer spaces are standard, with well over 200 nationalities on campus.",
    faqs: [
      {
        q: "Is there a direct flight from Burundi to the UAE?",
        a: "Not currently. Most routes connect through Nairobi, Addis Ababa or Kigali, usually with one stop.",
      },
      {
        q: "Will I pay tax on my first UAE salary after graduating?",
        a: "No personal income tax applies to salary, bonuses or allowances, though 5% VAT applies to everyday purchases.",
      },
    ],
  },
  {
    slug: "mauritius",
    name: "Mauritius",
    region: "Africa",
    tier: "flagship",
    intro:
      "One of the most affordable places to earn a degree, taught in English and French, and a fellow African Union member state.",
    overview:
      "Mauritius runs two public universities, several private institutions and a handful of branch campuses, all working within a national qualifications framework. It has long positioned itself as a regional education hub, particularly for other African and Indian Ocean students.",
    whyStudy: [
      "Tuition and living costs sit well below the UK, Europe or India for an equivalent degree.",
      "Both English and French are used day to day, which eases the transition if you're coming from a Francophone education system.",
      "A member of the African Union, SADC, COMESA and La Francophonie, with strong regional ties across the continent.",
      "A stable, multicultural country with a solid reputation for safety.",
    ],
    educationSystem:
      "Degrees follow a national qualifications framework running from diploma through bachelor's, bachelor's honours, master's and doctorate, with the University of Mauritius and the University of Technology, Mauritius as the main public providers.",
    popularAreas: [
      "Business Administration",
      "Financial Services",
      "Law",
      "Information Technology",
      "Tourism & Hospitality",
    ],
    studyLevels: ["Diploma", "Bachelor's", "Bachelor's Honours", "Master's"],
    entryRequirements: [
      "Admission letter from a recognised institution",
      "Proof of financial support, usually bank statements",
      "Medical certificate, including standard health screening, ahead of arrival",
    ],
    costsPlaceholder:
      "Public university tuition for international students runs roughly USD 4,000-7,000 a year for most programmes. Add around USD 600-750 a month for accommodation, food and transport, one of the more affordable combinations on this list.",
    intakes: ["August / September (main intake)", "January / February (mostly postgraduate)"],
    visaOverview:
      "Your host institution submits your student visa application to the Passport and Immigration Office on your behalf, along with your admission letter, financial proof and medical certificate. Processing typically takes around two weeks once your file is complete.",
    studentLife:
      "Mauritius combines an English/French bilingual environment with a genuinely multicultural, safe setting, and its African Union membership means closer ties, and sometimes scholarship access, for students from the continent.",
    faqs: [
      {
        q: "Is Mauritius really cheaper than studying in Europe?",
        a: "Yes. Tuition of USD 4,000-7,000 a year plus living costs of USD 600-750 a month puts it well under typical UK or EU budgets.",
      },
      {
        q: "Do I need fluent English if I've studied in French?",
        a: "Not necessarily. French is widely spoken day to day, which softens the transition, though most higher education teaching is in English.",
      },
    ],
  },
  {
    slug: "malta",
    name: "Malta",
    region: "Europe",
    tier: "flagship",
    intro:
      "An English-speaking EU country in the Mediterranean, small enough to get around easily and a straightforward route to a Europe-recognised degree.",
    overview:
      "Malta's higher education centres on the public University of Malta and MCAST for vocational and technical study, alongside a few private institutions and branch campuses, including Queen Mary University of London's Malta campus.",
    whyStudy: [
      "English is an official language and the primary language of instruction, so there's no separate language barrier to studying there.",
      "As an EU and Schengen member, your degree is recognised across Europe and you can travel the Schengen area freely while you study.",
      "Ranks among the safer countries in Europe, with a compact, walkable capital and free student bus travel.",
      "A warm Mediterranean climate and a small island footprint that makes settling in quick.",
    ],
    educationSystem:
      "Malta follows the EU's Bologna Process and ECTS credit system, structured as bachelor's, master's and doctoral degrees, with MCAST covering vocational diplomas and technical routes.",
    popularAreas: [
      "Business Management",
      "Information Technology",
      "Tourism & Hospitality Management",
      "Maritime Studies & Engineering",
      "Health Sciences",
    ],
    studyLevels: ["Diploma", "Bachelor's", "Master's", "PhD"],
    entryRequirements: [
      "Secondary school certificate equivalent to Malta's own Matriculation Certificate",
      "English proficiency, typically IELTS 6.0 or higher for undergraduate study",
      "Acceptance letter, proof of funds and health insurance for your visa application",
    ],
    costsPlaceholder:
      "Non-EU tuition typically runs EUR 6,000-12,000 a year for most bachelor's programmes, more for master's or medicine. Living costs add roughly EUR 800-1,200 a month; renting away from the more popular coastal towns usually saves 30-40% on accommodation. Budget EUR 15,000-25,000 a year all in.",
    intakes: ["October (main intake)", "February"],
    visaOverview:
      "Non-EU students need a national long-stay visa to enter for courses over three months, then apply for a residence permit within 90 days of arrival. Between the visa and the permit, expect the process to take around eight to fourteen weeks, so start three to six months ahead of your intake.",
    studentLife:
      "Malta's small size makes it easy to get around, with free student bus travel and low commute times. Renting inland rather than in coastal towns like Sliema keeps accommodation costs down.",
    faqs: [
      {
        q: "Is a Malta degree recognised across the EU?",
        a: "Yes. As an EU and Bologna Process member, Malta's degrees use the same ECTS credit system recognised throughout Europe.",
      },
      {
        q: "Do I need to learn Maltese to study there?",
        a: "No. English is an official language and the main language of instruction at both the University of Malta and MCAST.",
      },
    ],
  },
  {
    slug: "hungary",
    name: "Hungary",
    region: "Europe",
    tier: "flagship",
    intro:
      "An EU country known for strong, affordable medicine and engineering programmes, and one of the few destinations offering a fully funded government scholarship open to Burundian students.",
    overview:
      "Hungary's universities, Semmelweis, Debrecen, Szeged and Eötvös Loránd among them, run close to 900 English-taught programmes between them, drawing over 28,000 international students from more than 130 countries. Its Stipendium Hungaricum scholarship covers tuition and living costs in full, and Burundi is a confirmed partner country.",
    whyStudy: [
      "EU-recognised, Bologna-compliant degrees, with credits that transfer across Europe.",
      "Tuition and living costs run well below Western Europe, even before any scholarship.",
      "A strong, internationally recognised pipeline for medicine, dentistry and veterinary science, with several universities ranked among the world's top 500-600 for medicine.",
      "The Stipendium Hungaricum scholarship covers tuition, a monthly stipend, accommodation and health insurance in full, and Burundi is a confirmed partner country through its Ministry of National Education and Scientific Research.",
    ],
    educationSystem:
      "Hungary follows the EU's Bologna three-cycle system: bachelor's degrees (six to eight semesters), master's (typically two years), and doctorates (up to four years), with a handful of one-tier master's programmes in fields like medicine and law.",
    popularAreas: [
      "Medicine",
      "Dentistry",
      "Veterinary Science",
      "Engineering",
      "Business & Economics",
    ],
    studyLevels: [
      "Bachelor's",
      "Master's",
      "One-tier Master's (medicine, dentistry, veterinary, law)",
      "PhD",
    ],
    entryRequirements: [
      "Recognised secondary school diploma or transcript qualifying you for higher education at home",
      "English proficiency, though IELTS or TOEFL isn't always mandatory if your prior schooling was fully in English",
      "Proof of financial means for your visa, roughly EUR 500 a month, plus health insurance",
    ],
    costsPlaceholder:
      "Outside a scholarship, tuition runs roughly EUR 1,200-10,000 a year for most programmes, and EUR 6,000-18,000 for English-taught medicine. Living costs add EUR 400-800 a month. Stipendium Hungaricum recipients pay no tuition and receive a monthly stipend on top.",
    intakes: ["September (main intake)", "February (limited programmes)"],
    visaOverview:
      "Non-EU students need a Type D long-stay national visa, applied for at a Hungarian embassy before travel, then converted into a residence permit within 30 days of arrival. Visa fees run roughly EUR 60-110, and processing takes around a month, sometimes up to two.",
    studentLife:
      "As a Schengen country, Hungary makes it easy to travel across most of Europe with no internal border checks, and Budapest is two to three hours by air from much of the continent. With students from over 130 countries, there's a solid peer network to plug into.",
    faqs: [
      {
        q: "Is the Stipendium Hungaricum scholarship open to students from Burundi?",
        a: "Yes. Burundi is listed as a confirmed sending-partner country, administered through its Ministry of National Education and Scientific Research. It covers full tuition, a monthly stipend, accommodation and health insurance. Deadlines are set annually, so confirm the current cycle's dates with an adviser.",
      },
      {
        q: "Do I need IELTS or TOEFL to study in English in Hungary?",
        a: "Not always. Many universities accept an official letter confirming your prior schooling was delivered entirely in English instead of a standardised test score.",
      },
    ],
  },
  {
    slug: "united-kingdom",
    name: "United Kingdom",
    region: "Europe",
    tier: "legacy",
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
    tier: "legacy",
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
    tier: "legacy",
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
    tier: "legacy",
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
    tier: "legacy",
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

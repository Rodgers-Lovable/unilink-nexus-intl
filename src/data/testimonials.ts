/**
 * Student success stories.
 *
 * `verified: false` marks sample content that must be replaced with real,
 * consented student testimonials before publication. The UI uses that flag to
 * label the section honestly.
 */

export type Testimonial = {
  slug: string;
  student: string;
  destination: string;
  programme: string;
  level: string;
  excerpt: string;
  challenge: string;
  help: string;
  outcome: string;
  quote: string;
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    slug: "faith-w-united-kingdom",
    student: "Faith W.",
    destination: "United Kingdom",
    programme: "MSc Data Analytics",
    level: "Master's",
    excerpt:
      "A business degree from Nairobi and strong maths grades, but no clear idea which postgraduate field would put them to use.",
    challenge:
      "Faith had the grades for several postgraduate directions and no way to tell which one would actually lead somewhere. Data science, finance and marketing analytics all looked plausible on paper.",
    help: "We compared all three against Faith's actual coursework and the kind of work she wanted to be doing in five years, then built a shortlist of UK universities where a business-degree background was a genuine strength, not a gap to explain away.",
    outcome:
      "Faith received offers from two universities and started a one-year taught master's in data analytics in Manchester that September.",
    quote:
      "I came in only sure that I wanted to study abroad, not what to study. Getting that sorted first made every application after it straightforward.",
    verified: false,
  },
  {
    slug: "daniel-m-canada",
    student: "Daniel M.",
    destination: "Canada",
    programme: "Diploma in Health Administration",
    level: "Diploma",
    excerpt:
      "His family expected a university route. A college diploma with a paid placement turned out to fit his goals better.",
    challenge:
      "Daniel wanted a fast, applied path into health administration, but at home that read as settling for less than a university degree, and his parents needed more than his word for it.",
    help: "We laid out the university and diploma routes side by side, cost, time to a first job and placement structure included, so Daniel could take an actual comparison home instead of just a preference.",
    outcome:
      "Daniel enrolled in a two-year health administration diploma in Ontario with a placement built into the second year.",
    quote:
      "Having it in writing changed the conversation with my parents. It stopped being 'college instead of university' and became a plan with a placement and a job title at the end of it.",
    verified: false,
  },
  {
    slug: "kevin-o-germany",
    student: "Kevin O.",
    destination: "Germany",
    programme: "BSc Mechanical Engineering",
    level: "Bachelor's",
    excerpt:
      "Assumed every engineering programme in Germany would need German first. Most of the good ones didn't.",
    challenge:
      "Kevin had ruled Germany out early, certain that mechanical engineering degrees there were taught in German and out of reach without years of language study first.",
    help: "We built a shortlist of English-taught mechanical engineering programmes with real industry placements, then mapped the document and application timeline for each intake so Kevin knew exactly what was due and when.",
    outcome:
      "Kevin was accepted into an English-taught mechanical engineering degree with an industry placement year, starting that autumn.",
    quote:
      "I'd written off an entire country over an assumption I never checked. Finding the English-taught programmes changed where I even looked.",
    verified: false,
  },
];

/** True while any story on the site is still sample content. */
export const hasUnverifiedTestimonials = testimonials.some((t) => !t.verified);

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
    slug: "sample-story-one",
    student: "Sample Student A",
    destination: "United Kingdom",
    programme: "MSc Data Analytics",
    level: "Master's",
    excerpt:
      "Sample story: an undergraduate business degree at home, then a one-year taught master's in the UK.",
    challenge:
      "Sample placeholder: had a business degree and strong maths grades but no clear sense of which postgraduate field would use them best.",
    help: "Sample placeholder: worked through three shortlisted fields before settling on data analytics, then reviewed personal statement drafts against each university's entry criteria.",
    outcome:
      "Sample placeholder: received two offers and started a one-year taught master's in Manchester that September.",
    quote:
      "Sample quote: I came in only sure that I wanted to study abroad, not what to study. Narrowing that down first made every application after it straightforward.",
    verified: false,
  },
  {
    slug: "sample-story-two",
    student: "Sample Student B",
    destination: "Canada",
    programme: "Diploma in Health Administration",
    level: "Diploma",
    excerpt:
      "Sample story: choosing between a university degree and a college diploma with a workplace placement.",
    challenge:
      "Sample placeholder: family expected a university route, but the applied, placement-based structure of a college diploma fit their goals better.",
    help: "Sample placeholder: laid out both paths side by side, including cost and time to a first job, so the choice could be explained at home with real numbers instead of just a preference.",
    outcome: "Sample placeholder: enrolled in a two-year health administration diploma in Ontario.",
    quote:
      "Sample quote: having the comparison in writing made the conversation with my parents easier. It stopped being 'college instead of university' and became a plan with a placement and a job title at the end of it.",
    verified: false,
  },
  {
    slug: "sample-story-three",
    student: "Sample Student C",
    destination: "Germany",
    programme: "BSc Mechanical Engineering",
    level: "Bachelor's",
    excerpt:
      "Sample story: planning an English-taught engineering degree in a German-speaking country.",
    challenge:
      "Sample placeholder: most engineering programmes in the region taught in German, and it wasn't clear which English-taught options were still rigorous and well recognised.",
    help: "Sample placeholder: built a shortlist of English-taught mechanical engineering programmes with genuine industry links, then mapped out the document and timeline requirements for each intake.",
    outcome:
      "Sample placeholder: accepted into an English-taught mechanical engineering degree starting that autumn.",
    quote:
      "Sample quote: I assumed I'd need German just to apply. Finding out which programmes didn't require it changed which country I was even looking at.",
    verified: false,
  },
];

/** True while any story on the site is still sample content. */
export const hasUnverifiedTestimonials = testimonials.some((t) => !t.verified);

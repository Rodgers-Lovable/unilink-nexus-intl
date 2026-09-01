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
      "Sample story content: moving from an undergraduate degree at home to a taught postgraduate programme abroad.",
    challenge: "Sample placeholder: uncertainty about which postgraduate field to pursue.",
    help: "Sample placeholder: pathway exploration, shortlisting and application review support.",
    outcome: "Sample placeholder: enrolled in a taught postgraduate programme.",
    quote: "Sample quote placeholder, to be replaced with a verified student testimonial.",
    verified: false,
  },
  {
    slug: "sample-story-two",
    student: "Sample Student B",
    destination: "Canada",
    programme: "Diploma in Health Administration",
    level: "Diploma",
    excerpt: "Sample story content: choosing a college pathway with an applied component.",
    challenge: "Sample placeholder: comparing college and university pathways.",
    help: "Sample placeholder: destination comparison and document preparation.",
    outcome: "Sample placeholder: commenced a diploma programme.",
    quote: "Sample quote placeholder, to be replaced with a verified student testimonial.",
    verified: false,
  },
  {
    slug: "sample-story-three",
    student: "Sample Student C",
    destination: "Germany",
    programme: "BSc Mechanical Engineering",
    level: "Bachelor's",
    excerpt: "Sample story content: planning an undergraduate engineering pathway in Europe.",
    challenge: "Sample placeholder: language of instruction and entry requirements.",
    help: "Sample placeholder: pathway planning and timeline preparation.",
    outcome: "Sample placeholder: began an undergraduate programme.",
    quote: "Sample quote placeholder, to be replaced with a verified student testimonial.",
    verified: false,
  },
];

/** True while any story on the site is still sample content. */
export const hasUnverifiedTestimonials = testimonials.some((t) => !t.verified);

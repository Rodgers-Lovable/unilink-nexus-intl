import heroExplore from "@/assets/hero-explore.jpg";
import heroStudyAbroad from "@/assets/hero-study-abroad.jpg";
import heroResources from "@/assets/hero-resources.jpg";
import heroAbout from "@/assets/hero-about.jpg";
import heroParents from "@/assets/hero-parents.jpg";
import heroSchools from "@/assets/hero-schools.jpg";
import heroSuccess from "@/assets/hero-success.jpg";
import heroApply from "@/assets/hero-apply.jpg";
import heroDestinations from "@/assets/hero-destinations.jpg";
import counselling from "@/assets/counselling.jpg";

export const heroImages = {
  explore: {
    src: heroExplore,
    alt: "A student and advisor reviewing glowing study pathways on a world map",
  },
  "study-abroad": {
    src: heroStudyAbroad,
    alt: "Graduates celebrating outside a historic university building",
  },
  resources: {
    src: heroResources,
    alt: "A tidy desk with university brochures, a checklist and a passport",
  },
  about: {
    src: heroAbout,
    alt: "The UniLink advisory team in discussion around a table",
  },
  parents: {
    src: heroParents,
    alt: "A parent and student reviewing university options together at home",
  },
  schools: {
    src: heroSchools,
    alt: "A careers advisor presenting to students in a bright classroom",
  },
  success: {
    src: heroSuccess,
    alt: "A smiling graduate holding a diploma on a university campus",
  },
  apply: {
    src: heroApply,
    alt: "A student completing an online application form on a laptop",
  },
  destinations: {
    src: heroDestinations,
    alt: "A traveller with a passport watching an airplane through airport windows at dawn",
  },
  counselling: {
    src: counselling,
    alt: "A one-to-one advising session between a student and a UniLink counsellor",
  },
} as const;

export type HeroImageKey = keyof typeof heroImages;

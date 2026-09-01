export type NavLink = { label: string; to: string };
export type NavItem = { label: string; to: string; children?: NavLink[] };

export const navItems: NavItem[] = [
  {
    label: "Explore",
    to: "/explore",
    children: [
      { label: "Explore Overview", to: "/explore" },
      { label: "UniLink Pathway Advisor", to: "/explore/pathway-advisor" },
      { label: "Career & Subject Guidance", to: "/explore/career-subject-guidance" },
      { label: "Destination Explorer", to: "/explore/destinations" },
      { label: "How It Works", to: "/explore/how-it-works" },
    ],
  },
  {
    label: "Study Abroad",
    to: "/study-abroad",
    children: [
      { label: "Overview", to: "/study-abroad" },
      { label: "How It Works", to: "/study-abroad/how-it-works" },
      { label: "Application Process", to: "/study-abroad/application-process" },
      { label: "Preparation & Requirements", to: "/study-abroad/preparation" },
      { label: "Destinations", to: "/destinations" },
      { label: "FAQs", to: "/study-abroad/faq" },
    ],
  },
  {
    label: "How We Help",
    to: "/services",
    children: [
      { label: "All Services", to: "/services" },
      { label: "For Students", to: "/explore" },
      { label: "For Parents", to: "/parents" },
      { label: "For Schools", to: "/schools" },
    ],
  },
  { label: "Resources", to: "/resources" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "About UniLink", to: "/about" },
      { label: "Our Approach", to: "/about/approach" },
      { label: "Success Stories", to: "/success-stories" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

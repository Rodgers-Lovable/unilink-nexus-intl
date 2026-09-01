export type NavLink = { label: string; to: string };
export type NavItem = { label: string; to: string; children?: NavLink[] };

export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  {
    label: "Study Abroad",
    to: "/study-abroad",
    children: [
      { label: "Overview", to: "/study-abroad" },
      { label: "Check Your Eligibility", to: "/study-abroad/eligibility" },
      { label: "How It Works", to: "/study-abroad/how-it-works" },
      { label: "Application Process", to: "/study-abroad/application-process" },
      { label: "FAQs", to: "/study-abroad/faq" },
    ],
  },
  { label: "Destinations", to: "/destinations" },
  {
    label: "How We Help",
    to: "/services",
    children: [
      { label: "Study Counselling", to: "/services/study-counselling" },
      { label: "Course & University Selection", to: "/services/course-selection" },
      { label: "Application Support", to: "/services/application-support" },
      { label: "Visa Guidance", to: "/services/visa-guidance" },
      { label: "Pre-departure Support", to: "/services/pre-departure" },
    ],
  },
  { label: "Resources", to: "/resources" },
  {
    label: "About",
    to: "/about",
    children: [
      { label: "About Unilink", to: "/about" },
      { label: "Our Team", to: "/about/team" },
      { label: "Success Stories", to: "/success-stories" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

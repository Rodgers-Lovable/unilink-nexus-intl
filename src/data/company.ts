/**
 * Single source of truth for organisation details.
 *
 * Every value the client has not yet confirmed is left as a clearly bracketed
 * placeholder. Filling a value in here updates the legal pages, the contact
 * page and the footer at once — do not hardcode these anywhere else.
 */
export interface IAddress {
  city: string;
  country: string;
  address: string;
  phone: string;
}

export const company = {
  legalName: "UniLink Nexus International",
  shortName: "UniLink",
  tagline: "Your Link to Global Opportunities",

  /** Contact channels. */
  email: "info@unilink-nexus.com",
  legalEmail: "info@unilink-nexus.com",
  privacyEmail: "info@unilink-nexus.com",
  phone: "+257 66 518 377, +254 717 425 553",
  whatsapp: "25766518377",
  address:
    "Burundi: Patrice Lumumba Ave. Opp KCB Siege, Nairobi: Westlands, Waiyaki Way. Dunhill Towers",
  hours: "Mon - Fri: 9:00AM - 6:00PM, Sat & Sun: 11:00AM - 4:00PM",

  /** Registration / jurisdiction. */
  registrationNumber: "[company registration number]",
  foundedYear: "[founding year]",
  jurisdiction: "[jurisdiction to be confirmed]",

  /** Policy dates. */
  privacyPolicyUpdated: "01/09/2026",
  termsUpdated: "01/09/2026",
  cookiePolicyUpdated: "01/09/2026",
  disclaimerUpdated: "01/09/2026",
} as const;

/** True when a field still holds a bracketed placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}

/** Back-compatible contact shape used by the consultation form's short summary. */
export const contactInfo = {
  phone: company.phone,
  whatsapp: company.whatsapp,
  email: company.email,
  hours: company.hours,
  address: company.address,
};

export const offices: IAddress[] = [
  {
    city: "Bujumbura",
    country: "Burundi",
    address: "Patrice Lumumba Ave, Opp KCB Siege",
    phone: "+257 66 518 377",
  },
  {
    city: "Nairobi",
    country: "Kenya",
    address: "Westlands, Waiyaki Way, Dunhill Towers",
    phone: "+254 717 425 553",
  },
] as const;

/** Same opening hours across offices, split into rows instead of one dense sentence. */
export const officeHours = [
  { days: "Mon – Fri", time: "9:00 AM – 6:00 PM" },
  { days: "Sat – Sun", time: "11:00 AM – 4:00 PM" },
] as const;

/** `tel:`-safe version of a formatted phone number. */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

/** `wa.me`-safe version of a formatted phone number (digits only, no leading +). */
export function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/unilink_nexus_international",
    icon: "instagram" as const,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100076369803778",
    icon: "facebook" as const,
  },
];

/** Service lines referenced by both the Privacy Policy and the Terms of Use. */
export const serviceLines = [
  "career and subject guidance",
  "education pathway planning",
  "international education guidance",
  "destination exploration",
  "application support",
  "funding and scholarship guidance",
  "parent guidance",
  "school programmes",
  "digital education-planning tools such as the UniLink Pathway Advisor",
];

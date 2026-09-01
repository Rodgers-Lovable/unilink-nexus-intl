/**
 * Single source of truth for organisation details.
 *
 * Every value the client has not yet confirmed is left as a clearly bracketed
 * placeholder. Filling a value in here updates the legal pages, the contact
 * page and the footer at once — do not hardcode these anywhere else.
 */

export const company = {
  legalName: "UniLink Nexus International",
  shortName: "UniLink",
  tagline: "Your Link to Global Opportunities",

  /** Contact channels. */
  email: "[general email]",
  legalEmail: "[general/legal email]",
  privacyEmail: "[privacy email]",
  phone: "[telephone number]",
  whatsapp: "[WhatsApp number]",
  address: "[registered/business address]",
  hours: "[opening hours]",

  /** Registration / jurisdiction. */
  registrationNumber: "[company registration number]",
  foundedYear: "[founding year]",
  jurisdiction: "[jurisdiction to be confirmed]",

  /** Policy dates. */
  privacyPolicyUpdated: "[Date]",
  termsUpdated: "[Date]",
  cookiePolicyUpdated: "[Date]",
  disclaimerUpdated: "[Date]",
} as const;

/** True when a field still holds a bracketed placeholder. */
export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}

/** Back-compatible contact shape used by the footer and contact page. */
export const contactInfo = {
  phone: company.phone,
  whatsapp: company.whatsapp,
  email: company.email,
  hours: company.hours,
  address: company.address,
};

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

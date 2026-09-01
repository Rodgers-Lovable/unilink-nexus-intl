import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | UniLink Nexus International",
  description:
    "Get in touch with UniLink Nexus International to discuss your study plans. Reach us by phone, WhatsApp or email, or send an enquiry.",
  openGraph: {
    title: "Contact UniLink Nexus International",
    description: "Talk to us about your study plans.",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}

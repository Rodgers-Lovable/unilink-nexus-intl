import type { Metadata } from "next";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";

export const metadata: Metadata = {
  title: "Book a Free Consultation | Unilink Nexus International",
  description:
    "Book a consultation with Unilink Nexus International to discuss your study abroad goals, options and next steps.",
  openGraph: {
    title: "Book a Free Consultation",
    description: "A structured conversation about your study goals and realistic options.",
    url: "/book-consultation",
  },
  alternates: {
    canonical: "/book-consultation",
  },
};

export default function BookConsultationPage() {
  return <ConsultationForm />;
}

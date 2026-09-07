import type { Metadata } from "next";
import { PageHero, CTABanner } from "@/components/site/primitives";
import { OurStory } from "@/components/about/OurStory";
import { MissionStatement } from "@/components/about/MissionStatement";
import { Philosophy } from "@/components/about/Philosophy";
import { FrameworkStrip } from "@/components/about/FrameworkStrip";
import { TeamSection } from "@/components/about/TeamSection";
import { CredibilityStrip } from "@/components/about/CredibilityStrip";

export const metadata: Metadata = {
  title: "About Unilink Nexus International",
  description:
    "International education guidance built around the student — how UniLink Nexus International supports students navigating study abroad decisions.",
  openGraph: {
    title: "About Unilink Nexus International",
    description:
      "International education guidance built around the student, from first questions to departure.",
    url: "/about",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="about"
        eyebrow="About us"
        title="International education guidance built around the student."
        description="UniLink Nexus helps students navigate international education decisions with greater clarity, confidence and personal guidance — from understanding their options to choosing a pathway that genuinely fits them."
      />

      <OurStory />
      <MissionStatement />
      <Philosophy />
      <FrameworkStrip />
      <TeamSection />
      <CredibilityStrip />

      <CTABanner
        title="Ready to explore your options?"
        description="Speak with a UniLink advisor and take the next step toward an international education pathway that fits you."
      />
    </>
  );
}

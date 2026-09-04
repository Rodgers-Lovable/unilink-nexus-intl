import { Section, Text } from "@react-email/components";
import { EmailShell } from "./layout/EmailShell";
import { DetailsTable, type EmailDetails } from "./layout/DetailsTable";

interface ApplicationEmailProps {
  fromName: string;
  details: EmailDetails;
}

export default function ApplicationEmail({ fromName, details }: ApplicationEmailProps) {
  const { Reference: reference, ...rest } = details;

  return (
    <EmailShell
      previewText={`New student application profile from ${fromName}`}
      title="New student application profile"
    >
      <Text style={{ fontSize: "14px", color: "#334155", margin: "0 0 20px" }}>
        A new application profile has been submitted.
      </Text>
      {reference ? (
        <Section style={styles.reference}>
          <Text style={styles.referenceLabel}>Reference</Text>
          <Text style={styles.referenceValue}>{reference}</Text>
        </Section>
      ) : null}
      <DetailsTable details={rest} />
    </EmailShell>
  );
}

ApplicationEmail.PreviewProps = {
  fromName: "Jane Doe",
  details: {
    Reference: "APP-2026-0001",
    Source: "pathway-advisor",
    "Full name": "Jane Doe",
    Email: "jane@example.com",
    "Phone / WhatsApp": "+254 700 000 000",
    Nationality: "Kenyan",
    "Country of residence": "Kenya",
    "Highest academic level": "High school",
    Institution: "Nairobi Academy",
    Qualification: "A-Levels",
    "Completion year": "2025",
    Performance: "A grades",
    "Target level": "Undergraduate",
    "Preferred course": "Computer Science",
    "Preferred destinations": ["Canada", "United Kingdom"],
    "Preferred intake": "September 2026",
    "Additional information": "Would like guidance on scholarship applications.",
    "Consent given": "Yes",
    Submitted: new Date().toLocaleString(),
  },
} satisfies ApplicationEmailProps;

const styles = {
  reference: {
    backgroundColor: "#eff6ff",
    borderRadius: "6px",
    padding: "12px 16px",
    margin: "0 0 20px",
  },
  referenceLabel: {
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "#2563eb",
    margin: "0 0 2px",
  },
  referenceValue: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1b2a4a",
    margin: 0,
    fontFamily: "monospace",
  },
};

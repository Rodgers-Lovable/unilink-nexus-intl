import { Section, Text } from "@react-email/components";
import { EmailShell } from "./layout/EmailShell";
import { DetailsTable, type EmailDetails } from "./layout/DetailsTable";

interface PathwayEmailProps {
  fromName: string;
  details: EmailDetails;
}

export default function PathwayEmail({ fromName, details }: PathwayEmailProps) {
  const { "Pathway headline": headline, "Pathway summary": summary, ...rest } = details;

  return (
    <EmailShell
      previewText={`New Pathway Advisor enquiry from ${fromName}`}
      title="New Pathway Advisor enquiry"
    >
      <Text style={{ fontSize: "14px", color: "#334155", margin: "0 0 20px" }}>
        Someone completed the Pathway Advisor and asked to be contacted.
      </Text>
      {headline ? (
        <Section style={styles.highlight}>
          <Text style={styles.highlightLabel}>Recommended pathway</Text>
          <Text style={styles.highlightHeadline}>{headline}</Text>
          {summary ? <Text style={styles.highlightSummary}>{summary}</Text> : null}
        </Section>
      ) : null}
      <DetailsTable details={rest} />
    </EmailShell>
  );
}

PathwayEmail.PreviewProps = {
  fromName: "Jane Doe",
  details: {
    "Full name": "Jane Doe",
    Email: "jane@example.com",
    "Phone / WhatsApp": "+254 700 000 000",
    "Preferred contact method": "WhatsApp",
    Country: "Kenya",
    "Academic stage": "High school",
    Curriculum: "British (A-Levels)",
    Performance: "A grades",
    Subjects: ["Math", "Physics", "Chemistry"],
    Interests: ["Engineering", "Technology"],
    "Preferred destinations": ["Canada", "United Kingdom"],
    Budget: "$20,000 - $30,000 / year",
    "Scholarship importance": "Very important",
    "Language preference": "English",
    "Travel preference": "Open to any region",
    "Target entry year": "2026",
    "Pathway headline": "Canada — Computer Science",
    "Pathway summary":
      "Based on your profile, Canada is a strong fit for a Computer Science degree.",
    Notes: "Would like to discuss scholarship options.",
    Submitted: new Date().toLocaleString(),
  },
} satisfies PathwayEmailProps;

const styles = {
  highlight: {
    backgroundColor: "#eff6ff",
    borderRadius: "6px",
    padding: "16px",
    margin: "0 0 20px",
  },
  highlightLabel: {
    fontSize: "11px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.06em",
    color: "#2563eb",
    margin: "0 0 4px",
  },
  highlightHeadline: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#1b2a4a",
    margin: "0 0 6px",
  },
  highlightSummary: {
    fontSize: "13px",
    color: "#334155",
    margin: 0,
  },
};

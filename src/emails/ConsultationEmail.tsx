import { Text } from "@react-email/components";
import { EmailShell } from "./layout/EmailShell";
import { DetailsTable, type EmailDetails } from "./layout/DetailsTable";

interface ConsultationEmailProps {
  fromName: string;
  details: EmailDetails;
}

export default function ConsultationEmail({ fromName, details }: ConsultationEmailProps) {
  return (
    <EmailShell
      previewText={`New consultation request from ${fromName}`}
      title="New consultation request"
    >
      <Text style={{ fontSize: "14px", color: "#334155", margin: "0 0 20px" }}>
        Someone has asked to book a consultation.
      </Text>
      <DetailsTable details={details} />
    </EmailShell>
  );
}

ConsultationEmail.PreviewProps = {
  fromName: "Jane Doe",
  details: {
    "Full name": "Jane Doe",
    Email: "jane@example.com",
    "Phone / WhatsApp": "+254 700 000 000",
    "Intended study level": "Undergraduate",
    "Preferred destination": "Canada",
    Notes: "Looking to start in September 2026.",
    Submitted: new Date().toLocaleString(),
  },
} satisfies ConsultationEmailProps;

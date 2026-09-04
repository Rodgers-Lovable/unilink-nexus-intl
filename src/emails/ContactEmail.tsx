import { Text } from "@react-email/components";
import { EmailShell } from "./layout/EmailShell";
import { DetailsTable, type EmailDetails } from "./layout/DetailsTable";

interface ContactEmailProps {
  fromName: string;
  details: EmailDetails;
}

export default function ContactEmail({ fromName, details }: ContactEmailProps) {
  return (
    <EmailShell
      previewText={`New website contact form submission from ${fromName}`}
      title="New website contact form submission"
    >
      <Text style={{ fontSize: "14px", color: "#334155", margin: "0 0 20px" }}>
        You&apos;ve received a new enquiry from the contact page.
      </Text>
      <DetailsTable details={details} />
    </EmailShell>
  );
}

ContactEmail.PreviewProps = {
  fromName: "Jane Doe",
  details: {
    "Full name": "Jane Doe",
    Email: "jane@example.com",
    "Phone / WhatsApp": "+254 700 000 000",
    Message: "I'd like to know more about studying in Canada.",
    Submitted: new Date().toLocaleString(),
  },
} satisfies ContactEmailProps;

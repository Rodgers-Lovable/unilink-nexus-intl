import { Text } from "@react-email/components";
import { EmailShell } from "./layout/EmailShell";
import { DetailsTable, type EmailDetails } from "./layout/DetailsTable";
import { company, contactInfo } from "@/data/company";

interface AutoReplyEmailProps {
  fromName: string;
  formName: string;
  details: EmailDetails;
}

/** Generic confirmation sent back to whoever submitted a form, across all form types. */
export default function AutoReplyEmail({ fromName, formName, details }: AutoReplyEmailProps) {
  return (
    <EmailShell
      previewText={`We've received your submission to ${company.shortName}`}
      title={`Thanks for reaching out, ${fromName || "there"}`}
    >
      <Text style={{ fontSize: "14px", color: "#334155", margin: "0 0 16px" }}>
        We&apos;ve received your {formName.toLowerCase()} and a member of our team will be in touch
        shortly.
      </Text>
      <Text style={{ fontSize: "12px", color: "#64748b", margin: "0 0 8px" }}>
        For reference, here&apos;s a copy of what you submitted:
      </Text>
      <DetailsTable details={details} />
      <Text style={{ fontSize: "13px", color: "#334155", margin: "20px 0 0" }}>
        Need to reach us sooner? Call or WhatsApp {contactInfo.phone}, or reply to this email —
        we&apos;re available {contactInfo.hours}.
      </Text>
    </EmailShell>
  );
}

AutoReplyEmail.PreviewProps = {
  fromName: "Jane Doe",
  formName: "Website contact form",
  details: {
    "Full name": "Jane Doe",
    Email: "jane@example.com",
    "Phone / WhatsApp": "+254 700 000 000",
    Message: "I'd like to know more about studying in Canada.",
    Submitted: new Date().toLocaleString(),
  },
} satisfies AutoReplyEmailProps;

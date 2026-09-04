import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { ReactNode } from "react";
import { company } from "@/data/company";

const SITE_URL = process.env["SITE_URL"] || "https://example.com";
const LOGO_URL = `${SITE_URL}/unilink-logo.png`;

interface EmailShellProps {
  previewText: string;
  title: string;
  children: ReactNode;
}

/** Shared branded wrapper for all form-submission emails. */
export function EmailShell({ previewText, title, children }: EmailShellProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Img src={LOGO_URL} alt={company.legalName} width={40} height={40} style={styles.logo} />
          <Text style={styles.eyebrow}>{company.shortName}</Text>
          <Heading style={styles.heading}>{title}</Heading>
          <Section>{children}</Section>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            {company.legalName} · {company.email} · {company.phone}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  main: {
    backgroundColor: "#f4f6f8",
    fontFamily: "Helvetica, Arial, sans-serif",
    padding: "32px 0",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "32px",
    maxWidth: "560px",
    margin: "0 auto",
  },
  logo: {
    borderRadius: "8px",
    margin: "0 0 16px",
  },
  eyebrow: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    margin: "0 0 8px",
  },
  heading: {
    fontSize: "20px",
    color: "#1b2a4a",
    margin: "0 0 16px",
  },
  hr: {
    borderColor: "#e2e8f0",
    margin: "24px 0",
  },
  footer: {
    fontSize: "12px",
    color: "#64748b",
  },
};

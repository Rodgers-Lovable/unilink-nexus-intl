"use server";

import { z } from "zod";

/**
 * Server-only email delivery via Resend, called directly from client
 * components as a Server Action. `RESEND_API_KEY` has no `NEXT_PUBLIC_`
 * prefix, so it's never bundled into client-side JavaScript — that's the
 * point of this living behind "use server" instead of running in the browser.
 *
 * Until `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are set, `sendEmail`
 * resolves as "skipped" so every form keeps working against the
 * local-storage fallback instead of failing.
 */

export type EmailTemplateKey = "contact" | "consultation" | "pathway" | "application";

export type EmailSendResult =
  | { status: "sent" }
  | { status: "skipped"; reason: "not_configured" }
  | { status: "error"; message: string };

const TEMPLATE_KEYS = ["contact", "consultation", "pathway", "application"] as const;

const paramsSchema = z.object({
  form_name: z.string(),
  from_name: z.string(),
  reply_to: z.string(),
  phone: z.string().optional(),
  message: z.string().optional(),
  summary: z.string(),
});

const TEMPLATE_SUBJECTS: Record<(typeof TEMPLATE_KEYS)[number], string> = {
  contact: "New website contact form submission",
  consultation: "New consultation request",
  pathway: "New Pathway Advisor enquiry",
  application: "New student application profile",
};

function isConfigured(): boolean {
  return Boolean(process.env["RESEND_API_KEY"] && process.env["RESEND_FROM_EMAIL"]);
}

export async function sendEmail(
  template: EmailTemplateKey,
  params: Record<string, string>,
): Promise<EmailSendResult> {
  const parsedParams = paramsSchema.safeParse(params);
  if (!parsedParams.success) {
    return { status: "error", message: "Invalid form data." };
  }

  if (!isConfigured()) {
    return { status: "skipped", reason: "not_configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env["RESEND_API_KEY"]);

    const toEmail = process.env["RESEND_TO_EMAIL"] || "info@unilink-nexus.com";
    const subject = `${TEMPLATE_SUBJECTS[template]} — ${parsedParams.data.from_name}`;

    const result = await resend.emails.send({
      from: process.env["RESEND_FROM_EMAIL"]!,
      to: toEmail,
      replyTo: parsedParams.data.reply_to,
      subject,
      text: parsedParams.data.summary,
    });

    if (result.error) {
      return { status: "error", message: result.error.message };
    }

    return { status: "sent" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email delivery error.";
    return { status: "error", message };
  }
}

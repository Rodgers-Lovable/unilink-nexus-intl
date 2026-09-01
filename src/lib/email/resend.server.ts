import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Server-only email delivery via Resend. `RESEND_API_KEY` has no `VITE_` prefix,
 * so Vite never inlines it into the client bundle — that's the point of this
 * module living behind a server function instead of running in the browser.
 */

const TEMPLATE_KEYS = ["contact", "consultation", "pathway", "application"] as const;

const sendEmailInput = z.object({
  template: z.enum(TEMPLATE_KEYS),
  params: z.object({
    form_name: z.string(),
    from_name: z.string(),
    reply_to: z.string(),
    phone: z.string().optional(),
    message: z.string().optional(),
    summary: z.string(),
  }),
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

export const sendResendEmail = createServerFn({ method: "POST" })
  .validator(sendEmailInput)
  .handler(async ({ data }) => {
    if (!isConfigured()) {
      return { status: "skipped", reason: "not_configured" } as const;
    }

    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env["RESEND_API_KEY"]);

      const toEmail = process.env["RESEND_TO_EMAIL"] || "info@unilink-nexus.com";
      const subject = `${TEMPLATE_SUBJECTS[data.template]} — ${data.params.from_name}`;

      const result = await resend.emails.send({
        from: process.env["RESEND_FROM_EMAIL"]!,
        to: toEmail,
        replyTo: data.params.reply_to,
        subject,
        text: data.params.summary,
      });

      if (result.error) {
        return { status: "error", message: result.error.message } as const;
      }

      return { status: "sent" } as const;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown email delivery error.";
      return { status: "error", message } as const;
    }
  });

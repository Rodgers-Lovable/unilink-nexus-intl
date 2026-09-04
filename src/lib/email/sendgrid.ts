"use server";

import { z } from "zod";
import { render } from "@react-email/render";
import { formatEmailBody } from "./format";
import { company } from "@/data/company";
import ContactEmail from "@/emails/ContactEmail";
import ConsultationEmail from "@/emails/ConsultationEmail";
import PathwayEmail from "@/emails/PathwayEmail";
import ApplicationEmail from "@/emails/ApplicationEmail";
import AutoReplyEmail from "@/emails/AutoReplyEmail";
import type { EmailDetails } from "@/emails/layout/DetailsTable";

/**
 * Server-only email delivery via SendGrid, called directly from client
 * components.
 */

export type EmailTemplateKey = "contact" | "consultation" | "pathway" | "application";

export type EmailSendResult =
  | { status: "sent" }
  | { status: "skipped"; reason: "not_configured" }
  | { status: "error"; message: string };

const detailValueSchema = z.union([z.string(), z.array(z.string())]);

const paramsSchema = z.object({
  form_name: z.string(),
  from_name: z.string(),
  reply_to: z.string(),
  details: z.record(detailValueSchema.optional()),
});

const TEMPLATE_SUBJECTS: Record<EmailTemplateKey, string> = {
  contact: "New website contact form submission",
  consultation: "New consultation request",
  pathway: "New Pathway Advisor enquiry",
  application: "New student application profile",
};

const TEMPLATE_COMPONENTS: Record<
  EmailTemplateKey,
  (props: { fromName: string; details: EmailDetails }) => React.ReactElement
> = {
  contact: ContactEmail,
  consultation: ConsultationEmail,
  pathway: PathwayEmail,
  application: ApplicationEmail,
};

function isConfigured(): boolean {
  return Boolean(process.env["SENDGRID_API_KEY"] && process.env["SENDGRID_FROM_EMAIL"]);
}

export async function sendEmail(
  template: EmailTemplateKey,
  params: { form_name: string; from_name: string; reply_to: string; details: EmailDetails },
): Promise<EmailSendResult> {
  const parsedParams = paramsSchema.safeParse(params);
  if (!parsedParams.success) {
    return { status: "error", message: "Invalid form data." };
  }

  if (!isConfigured()) {
    return { status: "skipped", reason: "not_configured" };
  }

  try {
    const sgMail = (await import("@sendgrid/mail")).default;
    sgMail.setApiKey(process.env["SENDGRID_API_KEY"]!);

    const toEmail = process.env["SENDGRID_TO_EMAIL"] || "info@unilink-nexus.com";
    const subject = `${TEMPLATE_SUBJECTS[template]} — ${parsedParams.data.from_name}`;

    const Component = TEMPLATE_COMPONENTS[template];
    const html = await render(
      Component({ fromName: parsedParams.data.from_name, details: parsedParams.data.details }),
    );
    const text = formatEmailBody(parsedParams.data.details);

    await sgMail.send({
      to: toEmail,
      from: process.env["SENDGRID_FROM_EMAIL"]!,
      replyTo: parsedParams.data.reply_to,
      subject,
      text,
      html,
    });

    // Best-effort confirmation back to the submitter — a failure here doesn't
    // change the result, since the team has already been notified above.
    try {
      const autoReplyHtml = await render(
        AutoReplyEmail({
          fromName: parsedParams.data.from_name,
          formName: parsedParams.data.form_name,
          details: parsedParams.data.details,
        }),
      );
      await sgMail.send({
        to: parsedParams.data.reply_to,
        from: process.env["SENDGRID_FROM_EMAIL"]!,
        subject: `We've received your submission — ${company.shortName}`,
        text: `Thanks for reaching out. We've received your ${parsedParams.data.form_name.toLowerCase()} and will be in touch shortly.`,
        html: autoReplyHtml,
      });
    } catch (autoReplyError) {
      console.error("Auto-reply email failed to send:", autoReplyError);
    }

    return { status: "sent" };
  } catch (error) {
    const message = extractSendGridErrorMessage(error);
    return { status: "error", message };
  }
}

/** SendGrid throws on failure; the useful message is nested under response.body.errors. */
function extractSendGridErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { body?: { errors?: { message?: string }[] } } })
      .response;
    const firstMessage = response?.body?.errors?.[0]?.message;
    if (firstMessage) return firstMessage;
  }
  return error instanceof Error ? error.message : "Unknown email delivery error.";
}

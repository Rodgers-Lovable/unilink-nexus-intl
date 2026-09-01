import { sendResendEmail } from "./resend.server";

/**
 * Client-safe email delivery layer. Mirrors the old EmailJS module's public
 * shape (`sendEmail(template, params)` / `formatEmailBody`) so callers didn't
 * need to change beyond the import path — the actual send happens server-side
 * via `sendResendEmail`, so `RESEND_API_KEY` never reaches the browser.
 *
 * Until `RESEND_API_KEY` and `RESEND_FROM_EMAIL` are set, `sendEmail` resolves
 * as "skipped" so every form keeps working against the local-storage fallback
 * instead of failing.
 */

export type EmailTemplateKey = "contact" | "consultation" | "pathway" | "application";

export type EmailSendResult =
  | { status: "sent" }
  | { status: "skipped"; reason: "not_configured" }
  | { status: "error"; message: string };

/** Flattens a payload into readable `key: value` lines for the email body. */
export function formatEmailBody(sections: Record<string, unknown>): string {
  const lines: string[] = [];
  for (const [label, value] of Object.entries(sections)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      lines.push(`${label}: ${value.join(", ")}`);
    } else {
      lines.push(`${label}: ${String(value)}`);
    }
  }
  return lines.join("\n");
}

/**
 * Sends one form submission through Resend. Never throws — callers branch on
 * the returned status so a delivery failure can be surfaced with a retry.
 */
export async function sendEmail(
  template: EmailTemplateKey,
  params: Record<string, string>,
): Promise<EmailSendResult> {
  if (typeof window === "undefined") return { status: "skipped", reason: "not_configured" };

  return sendResendEmail({
    data: {
      template,
      params: {
        form_name: params["form_name"] ?? "",
        from_name: params["from_name"] ?? "",
        reply_to: params["reply_to"] ?? "",
        phone: params["phone"],
        message: params["message"],
        summary: params["summary"] ?? "",
      },
    },
  });
}

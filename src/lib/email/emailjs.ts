/**
 * EmailJS delivery layer.
 *
 * All values below are publishable EmailJS identifiers and are safe in the
 * client bundle. Add them to `.env` as VITE_ variables:
 *
 *   VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
 *   VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
 *   VITE_EMAILJS_TEMPLATE_CONTACT=template_xxxxxxx
 *   VITE_EMAILJS_TEMPLATE_CONSULTATION=template_xxxxxxx
 *   VITE_EMAILJS_TEMPLATE_PATHWAY=template_xxxxxxx
 *   VITE_EMAILJS_TEMPLATE_APPLICATION=template_xxxxxxx
 *
 * Until they are set, `sendEmail` resolves as "skipped" so every form keeps
 * working against the local-storage fallback instead of failing.
 */

const env = import.meta.env as Record<string, string | undefined>;

export const emailjsConfig = {
  serviceId: env["VITE_EMAILJS_SERVICE_ID"] ?? "",
  publicKey: env["VITE_EMAILJS_PUBLIC_KEY"] ?? "",
  templates: {
    contact: env["VITE_EMAILJS_TEMPLATE_CONTACT"] ?? "",
    consultation: env["VITE_EMAILJS_TEMPLATE_CONSULTATION"] ?? "",
    pathway: env["VITE_EMAILJS_TEMPLATE_PATHWAY"] ?? "",
    application: env["VITE_EMAILJS_TEMPLATE_APPLICATION"] ?? "",
  },
} as const;

export type EmailTemplateKey = keyof typeof emailjsConfig.templates;

export type EmailSendResult =
  | { status: "sent" }
  | { status: "skipped"; reason: "not_configured" }
  | { status: "error"; message: string };

/** True when the service, public key and the given template are all present. */
export function isEmailJsConfigured(template?: EmailTemplateKey): boolean {
  if (!emailjsConfig.serviceId || !emailjsConfig.publicKey) return false;
  if (!template) return true;
  return Boolean(emailjsConfig.templates[template]);
}

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
 * Sends one form submission through EmailJS. Never throws — callers branch on
 * the returned status so a delivery failure can be surfaced with a retry.
 */
export async function sendEmail(
  template: EmailTemplateKey,
  params: Record<string, string>,
): Promise<EmailSendResult> {
  if (typeof window === "undefined") return { status: "skipped", reason: "not_configured" };
  if (!isEmailJsConfigured(template)) return { status: "skipped", reason: "not_configured" };

  try {
    const emailjs = (await import("@emailjs/browser")).default;
    await emailjs.send(emailjsConfig.serviceId, emailjsConfig.templates[template], params, {
      publicKey: emailjsConfig.publicKey,
    });
    return { status: "sent" };
  } catch (error) {
    const message =
      error && typeof error === "object" && "text" in error
        ? String((error as { text: unknown }).text)
        : error instanceof Error
          ? error.message
          : "Unknown email delivery error.";
    return { status: "error", message };
  }
}

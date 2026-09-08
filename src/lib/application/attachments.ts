/**
 * Optional document uploads on the application form.
 *
 * The site is a static export with no backend — attachments ride along on
 * the same EmailJS notification the rest of the application uses. EmailJS
 * caps combined attachment size by account plan (Free: none, Personal:
 * 500KB, Professional: 2MB, Business: 30MB — see emailjs.com/pricing). This
 * account is on the Professional plan, so the limit below is 2MB with a 10%
 * safety margin for the base64 encoding overhead EmailJS measures against.
 *
 * NOTE: the EmailJS notification template must have a matching "File
 * Attachments" variable configured per attachment slot (attachment_1,
 * attachment_2, attachment_3) in the EmailJS dashboard, or files sent from
 * here will be silently dropped even though the request succeeds.
 */

export const MAX_ATTACHMENT_BYTES = Math.floor(2 * 1024 * 1024 * 0.9);
export const MAX_ATTACHMENTS = 3;
export const ACCEPTED_ATTACHMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const ACCEPTED_ATTACHMENT_EXTENSIONS = ".pdf,.jpg,.jpeg,.png,.webp";

export type ApplicationDocument = {
  id: string;
  file: File;
  dataUrl: string;
  encodedBytes: number;
};

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 1 : 0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

/** Byte size of the base64 payload EmailJS will actually count against the plan limit. */
function encodedByteSize(dataUrl: string): number {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

export async function readApplicationDocument(file: File): Promise<ApplicationDocument> {
  const dataUrl = await fileToDataUrl(file);
  return {
    id: crypto.randomUUID(),
    file,
    dataUrl,
    encodedBytes: encodedByteSize(dataUrl),
  };
}

export function totalEncodedBytes(documents: ApplicationDocument[]): number {
  return documents.reduce((sum, doc) => sum + doc.encodedBytes, 0);
}

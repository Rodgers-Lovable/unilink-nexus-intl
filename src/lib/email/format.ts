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

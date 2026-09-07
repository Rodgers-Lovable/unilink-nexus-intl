export type TeamMember = {
  name: string;
  role: string;
  /** Optional short descriptor — not a biography. */
  descriptor?: string;
  photo?: string;
  photoAlt?: string;
};

/**
 * TODO(unilink): populate with real, approved team/adviser profiles when
 * available. Do not add placeholder or invented names, titles or photos —
 * `TeamSection` renders nothing while this stays empty.
 */
export const team: TeamMember[] = [];

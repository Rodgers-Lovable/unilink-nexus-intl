/**
 * Audience programme content for the Parents and Schools pages.
 * Keep all editable copy here rather than inline in the route files.
 */

export type ProgrammeItem = { title: string; description: string };

export const parentTopics: ProgrammeItem[] = [
  {
    title: "Understanding your child's options",
    description:
      "Subjects, strengths and interests translate into a wider set of routes than most families expect.",
  },
  {
    title: "Career and degree pathways",
    description:
      "How subject choices connect to degree families, and how degrees connect to careers.",
  },
  {
    title: "Choosing study destinations",
    description:
      "Academic fit, language, cost and distance, compared plainly rather than by reputation.",
  },
  {
    title: "Understanding costs",
    description:
      "Tuition is only part of the picture. Living costs, travel and insurance belong in the plan from the start.",
  },
  {
    title: "Application timelines",
    description: "What happens when, and which decisions cannot be left late.",
  },
  {
    title: "Preparing for international study",
    description: "Practical and personal readiness for living and studying in a new country.",
  },
];

export const parentQuestions: string[] = [
  "What does my child actually enjoy studying, and what does that keep open?",
  "Which pathways are realistic given their current performance and curriculum?",
  "What is the total cost, not just tuition?",
  "What are the deadlines we cannot miss?",
  "What happens if the first choice does not work out?",
  "How will we verify requirements from official sources?",
];

export const schoolProgrammeFormats: ProgrammeItem[] = [
  {
    title: "Career discovery workshops",
    description: "Group sessions helping students connect strengths to career families.",
  },
  {
    title: "Subject-selection guidance",
    description: "Support for students choosing subject combinations.",
  },
  {
    title: "University readiness sessions",
    description: "What applications ask for, and how to prepare in advance.",
  },
  {
    title: "International education seminars",
    description: "An overview of studying abroad and what it involves.",
  },
  {
    title: "Student pathway assessments",
    description: "Structured profiling using the UniLink Pathway Advisor.",
  },
  {
    title: "Parent information sessions",
    description: "Practical briefings for families supporting decisions.",
  },
  {
    title: "School visits",
    description: "In-person sessions arranged around your school calendar.",
  },
  {
    title: "Group pathway programmes",
    description: "Multi-session programmes across a year group or cohort.",
  },
];

export const schoolOutcomes: string[] = [
  "Students understand how subject choices affect future options",
  "Career conversations start earlier and with better information",
  "Parents receive consistent, accurate guidance",
  "Staff have a structured framework to refer students to",
];

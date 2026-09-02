import type { StaticImageData } from "next/image";
import anmatLogo from "@/assets/logos/anmat.png";
import fengerLogo from "@/assets/logos/fenger.png";

export type ExperienceType = "work" | "leadership";

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  type: ExperienceType;
  summary?: string;
  highlights: string[];
  /** Company logo — omit and the timeline falls back to a monogram tile. */
  logo?: StaticImageData;
  /** Company site; the company name becomes an external link when set. */
  website?: string;
}

export const experience: Experience[] = [
  {
    company: "ANMAT",
    role: "Software Engineering Intern (On-Site)",
    location: "Cairo, Egypt · Egypt branch",
    period: "Sep 2026 – Present",
    type: "work",
    logo: anmatLogo,
    website: "https://anmat.sa/",
    summary:
      "On-site software engineering internship at the Egypt branch of ANMAT, a Saudi-headquartered technology group.",
    // TODO: add highlights once there's concrete work to describe.
    highlights: [],
  },
  {
    company: "Fenger Gruppe",
    role: "Software Engineering Intern (On-Site)",
    location: "Kemberg, Germany",
    period: "Sep 2025 – Oct 2025",
    type: "work",
    logo: fengerLogo,
    website: "https://www.fenger-gruppe.de/",
    summary:
      "Two-month on-site internship at a German mid-sized group in construction, raw materials, and logistics — contributing across operational and strategic functions.",
    highlights: [
      "Contributed to IT and digitalization initiatives, supporting management and control processes across the construction, raw materials, and logistics divisions",
      "Analyzed, structured, and optimized internal business processes, supporting cross-departmental coordination between logistics, operations, and administration",
      "Managed contract documentation (lease, loan, and service agreements) with accurate, structured document handling",
      "Prepared internal reports, analyses, and executive overviews to support senior management's strategic decisions",
      "Supported invoice verification and preparatory accounting tasks, contributing to financial accuracy and compliance",
    ],
  },
  {
    company: "CIB (Commercial International Bank)",
    role: "Summer Intern (Remote)",
    location: "Remote",
    period: "Aug 2024",
    type: "work",
    summary:
      'One-month remote summer internship in CIB\'s "Emerging Talent for the Future Workplace" program.',
    highlights: [],
  },
  {
    company: "RobEn",
    role: "PR & Marketing Member",
    location: "University · Egypt",
    period: "Oct 2022 – Mar 2025",
    type: "leadership",
    highlights: [
      "Interviewed and evaluated 50+ candidates across recruitment cycles",
      "Represented the university at an ICT event; supported PR and marketing campaigns",
      "Helped secure sponsors and promote events",
    ],
  },
];

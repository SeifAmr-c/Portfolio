import type { StaticImageData } from "next/image";
import type { LogoTone } from "@/components/ui/LogoMark";
import dukeLogo from "@/assets/logos/duke.png";
import googleLogo from "@/assets/logos/google.png";
import gucLogo from "@/assets/logos/guc.png";
import ibmLogo from "@/assets/logos/ibm.png";
import michiganLogo from "@/assets/logos/michigan.png";

/** A course inside a multi-course program certificate. */
export interface CertificateCourse {
  title: string;
  credentialUrl?: string; // per-course verification page
}

export interface Certificate {
  title: string;
  issuer: string; // platform or awarding body
  provider?: string; // offering institution — VERIFY these, they're best-guess
  date?: string;
  group?: string; // used to cluster related certs (e.g. a specializations)
  inProgress?: boolean;
  credentialUrl?: string; // if present, the card is a link (opens in new tab)
  /** Issuing institution mark — omit and the card falls back to a monogram. */
  logo?: StaticImageData;
  /** How the mark sits in its tile; defaults to a light plate. */
  logoTone?: LogoTone;
  /** Set on a program certificate — renders the big card with a course dropdown. */
  courses?: CertificateCourse[];
}

// NOTE: `provider` values are best-guess from the standard Coursera catalog.
// Seif — please confirm/adjust each one before publishing.
export const certificates: Certificate[] = [
  // --- Program certificate: rendered large, with its courses in a dropdown ---
  {
    title: "Google Data Analytics Professional Certificate",
    issuer: "Coursera",
    provider: "Google",
    logo: googleLogo,
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/WNTP75KFHQNI",
    courses: [
      { title: "Foundations: Data, Data, Everywhere" },
      { title: "Ask Questions to Make Data-Driven Decisions" },
      { title: "Prepare Data for Exploration" },
      { title: "Process Data from Dirty to Clean" },
      { title: "Analyze Data to Answer Questions" },
      { title: "Share Data Through the Art of Visualization" },
      { title: "Introduction to Data Analysis Using Python" },
      { title: "Google Data Analytics Capstone: Complete a Case Study" },
      { title: "Accelerate Your Job Search with AI" },
    ],
  },

  // --- Standalone certificates ---
  {
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "Coursera",
    provider: "University of Michigan",
    logo: michiganLogo,
    logoTone: "bleed",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/3PWNIUHXKJDS",
  },
  {
    title: "Python Data Structures",
    issuer: "Coursera",
    provider: "University of Michigan",
    logo: michiganLogo,
    logoTone: "bleed",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/J4M23G29USWZ",
  },
  {
    title: "Using Python to Access Web Data",
    issuer: "Coursera",
    provider: "University of Michigan",
    logo: michiganLogo,
    logoTone: "bleed",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/B8W1T0PI49MK",
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "Coursera",
    provider: "IBM",
    logo: ibmLogo,
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/LPNEKHX0MU5G",
  },
  {
    title: "What is Data Science?",
    issuer: "Coursera",
    provider: "IBM",
    logo: ibmLogo,
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/LQ1CZUQM8OHH",
  },
  {
    title: "Tools for Data Science",
    issuer: "Coursera",
    provider: "IBM",
    logo: ibmLogo,
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/H5Q3OITIWO4P",
  },
  {
    title: "Data Science Methodology",
    issuer: "Coursera",
    provider: "IBM",
    logo: ibmLogo,
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/C0JJKFJDRD5R",
  },
  {
    title: "Excel Basics for Data Analysis",
    issuer: "Coursera",
    provider: "IBM",
    logo: ibmLogo,
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/PGALMWN1XE4D",
  },
  {
    title: "Data Science Math Skills",
    issuer: "Coursera",
    provider: "Duke University",
    logo: dukeLogo,
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/LTJFR2IOQLHU",
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Coursera",
    provider: "Google",
    logo: googleLogo,
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/TXST1PXW9YJ0",
  },

  // --- Language ---
  {
    title: "German — A1 Language Certificate",
    issuer: "CEFR level A1",
    provider: "German University in Cairo",
    logo: gucLogo,
    credentialUrl:
      "https://drive.google.com/file/d/1AlG7oSglLxoDJU3TTsX9UYj1Agyl1N2v/view?usp=sharing",
  },
];

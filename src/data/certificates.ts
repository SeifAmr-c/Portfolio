export interface Certificate {
  title: string;
  issuer: string; // platform or awarding body
  provider?: string; // offering institution — VERIFY these, they're best-guess
  date?: string;
  group?: string; // used to cluster related certs (e.g. a specializations)
  inProgress?: boolean;
  credentialUrl?: string; // if present, the card is a link (opens in new tab)
}

// NOTE: `provider` values are best-guess from the standard Coursera catalog.
// Seif — please confirm/adjust each one before publishing.
export const certificates: Certificate[] = [
  // --- Google Data Analytics Professional Certificate (In Progress) ---
  {
    title: "Foundations: Data, Data, Everywhere",
    issuer: "Coursera",
    provider: "Google",
    group: "Google Data Analytics Professional Certificate",
    inProgress: true,
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/ZIG1AIVZT33U",
  },
  {
    title: "Ask Questions to Make Data-Driven Decisions",
    issuer: "Coursera",
    provider: "Google",
    group: "Google Data Analytics Professional Certificate",
    inProgress: true,
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/0816FXJMVVJP",
  },

  // --- Standalone certificates ---
  {
    title: "Programming for Everybody (Getting Started with Python)",
    issuer: "Coursera",
    provider: "University of Michigan",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/3PWNIUHXKJDS",
  },
  {
    title: "Python Data Structures",
    issuer: "Coursera",
    provider: "University of Michigan",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/J4M23G29USWZ",
  },
  {
    title: "Using Python to Access Web Data",
    issuer: "Coursera",
    provider: "University of Michigan",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/B8W1T0PI49MK",
  },
  {
    title: "Python for Data Science, AI & Development",
    issuer: "Coursera",
    provider: "IBM",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/LPNEKHX0MU5G",
  },
  {
    title: "What is Data Science?",
    issuer: "Coursera",
    provider: "IBM",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/LQ1CZUQM8OHH",
  },
  {
    title: "Tools for Data Science",
    issuer: "Coursera",
    provider: "IBM",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/H5Q3OITIWO4P",
  },
  {
    title: "Data Science Methodology",
    issuer: "Coursera",
    provider: "IBM",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/C0JJKFJDRD5R",
  },
  {
    title: "Excel Basics for Data Analysis",
    issuer: "Coursera",
    provider: "IBM",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/PGALMWN1XE4D",
  },
  {
    title: "Data Science Math Skills",
    issuer: "Coursera",
    provider: "Duke University",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/LTJFR2IOQLHU",
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Coursera",
    provider: "Google",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/verify/TXST1PXW9YJ0",
  },

  // --- Language ---
  {
    title: "German — A1 Language Certificate",
    issuer: "CEFR level A1",
    credentialUrl:
      "https://drive.google.com/file/d/1AlG7oSglLxoDJU3TTsX9UYj1Agyl1N2v/view?usp=sharing",
  },
];

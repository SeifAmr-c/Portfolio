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
    date: "2026",
    credentialUrl:
      "https://www.coursera.org/account/accomplishments/specialization/WNTP75KFHQNI",
    courses: [
      {
        title: "Foundations: Data, Data, Everywhere",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/ZIG1AIVZT33U",
      },
      {
        title: "Ask Questions to Make Data-Driven Decisions",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/0816FXJMVVJP",
      },
      {
        title: "Prepare Data for Exploration",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/LMYF0QJZJQN2",
      },
      {
        title: "Process Data from Dirty to Clean",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/HWA2UTK7AFDI",
      },
      {
        title: "Analyze Data to Answer Questions",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/DLPGA4TGBOZO",
      },
      {
        title: "Share Data Through the Art of Visualization",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/J67R2VUZQK8F",
      },
      {
        title: "Introduction to Data Analysis Using Python",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/Z3QRE87FZKIG",
      },
      {
        title: "Google Data Analytics Capstone: Complete a Case Study",
        credentialUrl:
          "https://www.coursera.org/account/accomplishments/verify/9G4K39WRJJ74",
      },
    ],
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

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  name: string;
  year: string;
  tagline: string;
  description: string;
  stack: string[];
  status?: string; // e.g. "Live · App Store", "Shipped"
  featured?: boolean;
  accent?: string; // optional per-project accent chip color
  links: ProjectLink[];
}

export const projects: Project[] = [
  {
    name: "RepSay",
    year: "2026",
    tagline: "AI-powered, voice-first workout logging — live on the iOS App Store",
    description:
      "A cross-platform Flutter fitness app that turns voice input (English and Egyptian Arabic) into structured workout data in real time. Automatically categorizes sessions (Strength & Conditioning, Hypertrophy, Endurance) by extracting exercises, sets, reps, and weights from transcribed audio. Backed by Supabase for auth, relational data, and scalable cloud storage.",
    stack: ["Flutter", "Dart", "Supabase", "AI Speech Recognition", "Firebase"],
    status: "Live · App Store",
    featured: true,
    accent: "#DBF756", // RepSay lime — only used on this featured card
    links: [
      { label: "App Store", url: "https://apps.apple.com/eg/app/repsay/id6759207937" },
    ],
  },
  {
    name: "Takhlees",
    year: "2026",
    tagline: "B2B2C marketplace digitizing port clearance across major Egyptian ports",
    description:
      "A full-stack MERN marketplace (React front end, Node/Express REST API, MongoDB) with secure auth and multi-tier payment workflows across three user roles, deployed on Vercel. Ships with two companion React Native apps: importers view submitted clearance applications and present a dynamic QR code; clearance companies get a real-time pipeline (Pending / In Progress / Completed) plus a scanner tab to advance shipment status. Authored full technical docs (BRD, SRS, ERD, UML) and the business model, revenue streams, and go-to-market.",
    stack: ["React", "Node.js", "Express", "MongoDB", "React Native", "Vercel"],
    status: "Shipped",
    links: [
      { label: "Live", url: "https://takhlees-ca.vercel.app/" },
    ],
  },
  {
    name: "Bitcoin Price Prediction",
    year: "2025",
    tagline: "Time-series ML on minute-level BTC data",
    description:
      "A machine-learning model predicting Bitcoin prices from historical minute-level data. Implemented and compared Random Forest and Gradient Boosting, with data cleaning, feature engineering, and model evaluation — applying time-series analysis and predictive modeling.",
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    links: [
      { label: "Repo", url: "https://github.com/SeifAmr-c/Bitcoin" },
    ],
  },
];

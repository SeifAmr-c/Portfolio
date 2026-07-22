// Site-wide config: SEO, navigation, socials, and the design token source of truth.

export const site = {
  seo: {
    title: "Seif Amr Attia — Data Analyst & Engineer",
    description:
      "Data analyst and full-stack engineer. Turning data into decisions — time-series ML, voice-first apps, and B2B marketplaces.",
    url: "TODO_DEPLOYED_URL", // e.g. https://seif.dev — fill after first deploy
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certifications" },
    { label: "Resume", href: "#resume" },
    { label: "Contact", href: "#contact" },
  ],

  contact: {
    email: "Seifamr5155@gmail.com",
    availability:
      "Data analyst & full-stack engineer, building data-driven products end to end.",
  },

  socials: [
    { label: "GitHub", url: "https://github.com/SeifAmr-c" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/seif-amr-077b34284" },
    { label: "App Store — RepSay", url: "https://apps.apple.com/eg/app/repsay/id6759207937" },
  ],

  resumePath: "/resume.pdf", // Seif drops MyResume.pdf into /public as resume.pdf

  // --- Design tokens (mirror these into globals.css as CSS variables) ---
  theme: {
    color: {
      ink: "#0F1115",
      surface: "#171A21",
      line: "#2A2E37",
      paper: "#ECEAE3",
      muted: "#8A8F98",
      accent: "#F5A524", // signal amber — CTAs / active state, one place only
      blueprint: "#5B7DB1", // cool annotation blue for mono metadata
      repsay: "#DBF756", // ONLY on the RepSay featured card
    },
    font: {
      display: "Clash Display", // Fontshare
      body: "Inter",
      mono: "JetBrains Mono",
    },
  },
};

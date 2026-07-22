export interface SkillGroup {
  category: string;
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    category: "Programming",
    items: ["Python", "JavaScript", "Java", "PHP", "Dart"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Flutter", "React Native", "HTML", "CSS", "Tailwind"],
  },
  {
    category: "Backend & Databases",
    items: [
      "Node.js",
      "Express",
      "MongoDB",
      "Supabase",
      "MySQL",
      "Oracle Live SQL",
      "phpMyAdmin",
    ],
  },
  {
    category: "Data & ML",
    items: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Random Forest",
      "Gradient Boosting",
      "Matplotlib",
      "Seaborn",
    ],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Power BI", "Excel"],
  },
];

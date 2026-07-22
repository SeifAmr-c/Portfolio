import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillsGrid from "@/components/SkillsGrid";
import { Reveal } from "@/components/ui/Reveal";

/** About — bio, education, languages, and the skills grid. */
export default function About() {
  const { about, education, languages } = profile;

  return (
    <section id="about" className="scroll-mt-24 border-t border-line/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="about"
            title="From data to shipped product"
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Bio + meta */}
          <Reveal>
            <p className="text-lg leading-relaxed text-paper/90">{about}</p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-blueprint">
                  Education
                </dt>
                <dd className="mt-2 text-paper">{education.degree}</dd>
                <dd className="mt-1 text-sm text-muted">
                  {education.institutions}
                </dd>
                <dd className="mt-2 font-mono text-sm text-muted">
                  {education.period} · GPA {education.gpa}
                </dd>
                <dd className="mt-1 font-mono text-xs text-accent">
                  {education.honors}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-blueprint">
                  Languages
                </dt>
                <dd className="mt-2">
                  <ul className="space-y-1.5">
                    {languages.map((lang) => (
                      <li
                        key={lang.name}
                        className="flex items-baseline justify-between gap-4 border-b border-line/50 pb-1.5"
                      >
                        <span className="text-paper">{lang.name}</span>
                        <span className="font-mono text-sm text-muted">
                          {lang.level}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>

          {/* Skills */}
          <div>
            <Reveal>
              <h3 className="font-mono text-sm text-blueprint">
                <span aria-hidden="true">{"// "}</span>stack
              </h3>
            </Reveal>
            <div className="mt-4">
              <SkillsGrid />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

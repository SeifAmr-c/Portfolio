import { profile } from "@/data/profile";
import { site } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const DownloadIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path
      d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Resume — headline facts + a prominent Download PDF button. */
export default function Resume() {
  const facts = [
    { label: "Role", value: profile.title },
    {
      label: "Education",
      value: `Dual B.B.I.S. · GPA ${profile.education.gpa} · ${profile.education.honors}`,
    },
    { label: "Based", value: profile.location },
    { label: "Languages", value: "English · Arabic · German (A1)" },
  ];

  return (
    <section
      id="resume"
      className="scroll-mt-24 border-t border-line/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="rounded-2xl border border-line bg-surface/50 p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="resume"
                title="The one-page version"
              />
              <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-mono text-xs uppercase tracking-wider text-blueprint">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 text-paper">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="flex lg:justify-end">
              <a
                href={site.resumePath}
                download
                className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
              >
                <DownloadIcon />
                Download PDF
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { site } from "@/data/site";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { isRealUrl } from "@/lib/utils";

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className="transition-transform group-hover/soc:translate-x-0.5 group-hover/soc:-translate-y-0.5"
  >
    <path d="M4 10L10 4M5 4h5v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Contact / footer — email, socials, and the availability line. */
export default function Contact() {
  const { contact, socials } = site;
  const socialLinks = socials.filter((s) => isRealUrl(s.url));

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-line/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="contact"
            title="Let's build something"
            intro={contact.availability}
          />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Direct */}
          <Reveal className="space-y-4">
            <a
              href={`mailto:${contact.email}`}
              className="group/soc inline-flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-paper transition-colors hover:text-accent sm:text-3xl"
            >
              {contact.email}
            </a>
          </Reveal>

          {/* Socials */}
          <StaggerGroup className="grid gap-3 sm:grid-cols-2 lg:justify-items-end">
            {socialLinks.map((s) => (
              <StaggerItem key={s.url} className="w-full">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/soc flex items-center justify-between rounded-xl border border-line bg-surface/50 px-4 py-3 font-mono text-sm text-paper transition-colors hover:border-accent/60"
                >
                  {s.label}
                  <span className="text-muted transition-colors group-hover/soc:text-accent">
                    <ArrowIcon />
                  </span>
                </a>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line/60 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono" suppressHydrationWarning>
            © {new Date().getFullYear()} Seif Amr Attia
          </p>
          <p className="font-mono text-blueprint">
            Data analyst &amp; full-stack engineer
          </p>
        </div>
      </div>
    </footer>
  );
}

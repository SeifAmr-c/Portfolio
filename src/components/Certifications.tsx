import { certificates, type Certificate } from "@/data/certificates";
import ProgramCertCard from "@/components/ProgramCertCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn, isRealUrl } from "@/lib/utils";

const VerifyIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className="transition-transform group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5"
  >
    <path d="M4 10L10 4M5 4h5v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function CertCard({ cert }: { cert: Certificate }) {
  const href = isRealUrl(cert.credentialUrl) ? cert.credentialUrl : undefined;
  const meta = [cert.provider, cert.issuer, cert.date]
    .filter(Boolean)
    .join(" · ");

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-medium leading-snug text-paper">{cert.title}</h4>
        {href ? (
          <span className="mt-0.5 flex-none text-muted transition-colors group-hover/cert:text-accent">
            <VerifyIcon />
          </span>
        ) : null}
      </div>
      <p className="mt-2 font-mono text-xs text-muted">{meta}</p>
      {href ? (
        <p className="mt-3 font-mono text-xs text-blueprint">
          Verify credential
        </p>
      ) : (
        <p className="mt-3 font-mono text-xs text-muted">Program · badge</p>
      )}
    </>
  );

  const baseClass =
    "group/cert block h-full rounded-xl border border-line bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-0.5";

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(baseClass, "hover:border-accent/60")}
    >
      {inner}
    </a>
  ) : (
    <div className={baseClass}>{inner}</div>
  );
}

/** Certifications — program certificates first, then the standalone ones. */
export default function Certifications() {
  const programs = certificates.filter((c) => c.courses?.length);
  const standalone = certificates.filter((c) => !c.courses?.length);

  return (
    <section
      id="certifications"
      className="scroll-mt-24 border-t border-line/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="certifications"
            title="Credentials, verified"
            intro="Every credential links straight to its verification page."
          />
        </Reveal>

        {programs.length > 0 ? (
          <StaggerGroup className="mt-12 space-y-4">
            {programs.map((cert) => (
              <StaggerItem key={cert.title}>
                <ProgramCertCard cert={cert} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        ) : null}

        <div className="mt-12">
          <Reveal>
            <h3 className="font-mono text-sm text-blueprint">
              Individual courses
            </h3>
          </Reveal>
          <StaggerGroup className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {standalone.map((cert) => (
              <StaggerItem key={cert.title} className="h-full">
                <CertCard cert={cert} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useId, useState } from "react";
import type { Certificate } from "@/data/certificates";
import { cn, isRealUrl } from "@/lib/utils";

const ExternalIcon = ({ className }: { className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
  >
    <path d="M4 10L10 4M5 4h5v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={cn(
      "transition-transform duration-300 ease-out",
      open && "rotate-180",
    )}
  >
    <path d="M3.5 5.5L7 9l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Program certificate — the headline card. Clicking it expands the list of
 * courses it's made of, each linking to its own verification page.
 *
 * The panel opens with the grid-rows 0fr→1fr trick rather than a JS height
 * animation, so the global prefers-reduced-motion guard in globals.css
 * (transition-duration: 0.001ms) switches it off for free.
 */
export default function ProgramCertCard({ cert }: { cert: Certificate }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const courses = cert.courses ?? [];
  const href = isRealUrl(cert.credentialUrl) ? cert.credentialUrl : undefined;
  const meta = [cert.provider, cert.issuer, cert.date].filter(Boolean).join(" · ");

  return (
    <div className="rounded-xl border border-accent/40 bg-surface/50 p-6 transition-colors duration-300 hover:border-accent/70 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Professional certificate
          </span>
          <h4 className="mt-3 font-display text-xl leading-snug text-paper sm:text-2xl">
            {cert.title}
          </h4>
          <p className="mt-2 font-mono text-xs text-muted">
            {meta}
            {courses.length > 0 ? ` · ${courses.length} courses` : null}
          </p>
        </div>

        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/verify inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 font-mono text-xs text-blueprint transition-colors hover:border-accent/60 hover:text-accent"
          >
            Verify credential
            <ExternalIcon className="transition-transform group-hover/verify:translate-x-0.5 group-hover/verify:-translate-y-0.5" />
          </a>
        ) : null}
      </div>

      {courses.length > 0 ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            {open ? "Hide courses" : `View the ${courses.length} courses`}
            <ChevronIcon open={open} />
          </button>

          <div
            id={panelId}
            className={cn(
              "grid transition-[grid-template-rows] duration-400 ease-out",
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
            )}
          >
            <div className="overflow-hidden">
              <ol className="mt-4 border-t border-line/60 pt-2">
                {courses.map((course, i) => {
                  const courseHref = isRealUrl(course.credentialUrl)
                    ? course.credentialUrl
                    : undefined;

                  const row = (
                    <>
                      <span className="font-mono text-xs text-blueprint tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-sm leading-snug text-paper/90">
                        {course.title}
                      </span>
                      {courseHref ? (
                        <ExternalIcon className="mt-0.5 flex-none text-muted transition-all group-hover/course:text-accent group-hover/course:translate-x-0.5 group-hover/course:-translate-y-0.5" />
                      ) : null}
                    </>
                  );

                  return (
                    <li key={course.title} className="border-b border-line/40 last:border-0">
                      {courseHref ? (
                        <a
                          href={courseHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          tabIndex={open ? undefined : -1}
                          className="group/course flex items-start gap-3 py-2.5 transition-colors hover:text-accent"
                        >
                          {row}
                        </a>
                      ) : (
                        <div className="flex items-start gap-3 py-2.5">{row}</div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

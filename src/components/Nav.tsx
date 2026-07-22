"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Sticky top navigation built from site.nav.
 * - Page-load slide-in.
 * - Scroll-progress bar (tracks window scroll, which Lenis drives).
 * - Scroll-spy: highlights the section crossing the viewport's middle band.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const ids = site.nav.map((n) => n.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // Only the section crossing the middle band counts as active.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Scroll progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="h-0.5 w-full origin-left bg-accent"
      />

      <nav className="border-b border-line/60 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-tight text-paper"
          >
            Seif<span className="text-accent">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.map((item) => {
              const id = item.href.replace("#", "");
              const active = activeId === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-3 py-1.5 font-mono text-sm transition-colors",
                      active ? "text-accent" : "text-muted hover:text-paper"
                    )}
                    aria-current={active ? "true" : undefined}
                  >
                    {item.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:block">
            <a
              href={site.resumePath}
              className="inline-flex items-center rounded-full border border-accent px-4 py-1.5 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-ink"
            >
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-paper md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5h12" strokeLinecap="round" />
                  <path d="M3 9h12" strokeLinecap="round" />
                  <path d="M3 13h12" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open ? (
          <div className="border-t border-line/60 md:hidden">
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-8">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-mono text-sm text-muted hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={site.resumePath}
                  onClick={() => setOpen(false)}
                  className="mt-2 mb-1 inline-flex items-center rounded-full border border-accent px-4 py-1.5 font-mono text-sm text-accent"
                >
                  Download resume
                </a>
              </li>
            </ul>
          </div>
        ) : null}
      </nav>
    </motion.header>
  );
}

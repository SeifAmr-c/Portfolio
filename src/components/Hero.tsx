"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { profile } from "@/data/profile";
import { EASE } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Typewriter that cycles through the shipping lines. */
function useTypewriter(lines: string[], enabled: boolean) {
  const [text, setText] = useState(enabled ? "" : lines[0]);

  useEffect(() => {
    if (!enabled) return;
    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = lines[lineIndex];
      if (!deleting) {
        charIndex++;
        setText(current.slice(0, charIndex));
        if (charIndex === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1900); // hold the full line
          return;
        }
        timer = setTimeout(tick, 45);
      } else {
        charIndex--;
        setText(current.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          lineIndex = (lineIndex + 1) % lines.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 25);
      }
    };

    timer = setTimeout(tick, 700);
    return () => clearTimeout(timer);
  }, [lines, enabled]);

  return text;
}

export default function Hero() {
  const reduced = useReducedMotion();
  const typed = useTypewriter(profile.shipping, !reduced);
  const gridRef = useRef<HTMLDivElement>(null);

  // Cursor-reactive spotlight over the blueprint grid.
  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced || !gridRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gridRef.current.style.setProperty("--mx", `${x}%`);
    gridRef.current.style.setProperty("--my", `${y}%`);
  }

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden bg-ink pt-24 pb-16"
    >
      {/* Blueprint grid backdrop with a cursor spotlight mask */}
      <div
        ref={gridRef}
        aria-hidden="true"
        className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-40"
        style={{
          maskImage:
            "radial-gradient(420px circle at var(--mx, 30%) var(--my, 40%), #000 0%, rgba(0,0,0,0.35) 45%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(420px circle at var(--mx, 30%) var(--my, 40%), #000 0%, rgba(0,0,0,0.35) 45%, transparent 80%)",
          transition: "mask-position 0.1s linear",
        }}
      />
      {/* Faint always-on grid so the backdrop reads even without a cursor */}
      <div
        aria-hidden="true"
        className="bg-blueprint-grid pointer-events-none absolute inset-0 opacity-[0.08]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 40%, var(--ink) 100%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-6xl px-5 sm:px-8"
      >
        <motion.p variants={item} className="font-mono text-sm text-blueprint">
          {profile.title} · {profile.location}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-paper sm:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {profile.headline}
        </motion.p>

        {/* Typed / cycling build-log line */}
        <motion.div
          variants={item}
          className="mt-8 flex min-h-[1.5rem] items-center gap-3 font-mono text-sm sm:text-base"
        >
          <span className="text-blueprint" aria-hidden="true">
            ▸
          </span>
          <span className="text-paper">
            {typed}
            {!reduced && (
              <span className="ml-0.5 inline-block w-[1px] animate-pulse bg-accent align-middle text-accent">
                &nbsp;
              </span>
            )}
          </span>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#projects"
            className="inline-flex items-center rounded-full bg-accent px-6 py-3 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            View work
          </a>
          <a
            href="/resume.pdf"
            className="inline-flex items-center rounded-full border border-line px-6 py-3 font-mono text-sm text-paper transition-colors hover:border-paper"
          >
            Download resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

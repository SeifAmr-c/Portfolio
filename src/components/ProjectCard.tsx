"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { Project } from "@/data/projects";
import Chip from "@/components/ui/Chip";
import { cn, isRealUrl } from "@/lib/utils";

const ArrowIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
  >
    <path d="M4 10L10 4M5 4h5v5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * One project card. RepSay is `featured` — larger, its own lime accent chip,
 * and a LIVE · App Store badge. Hover = 3D tilt + a cursor-following accent glow.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const { name, year, tagline, description, stack, status, featured, links } =
    project;
  const realLinks = links.filter((l) => isRealUrl(l.url));
  const accent = featured ? "var(--repsay)" : "var(--blueprint)";
  const reduced = useReducedMotion();

  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), {
    stiffness: 150,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), {
    stiffness: 150,
    damping: 18,
  });
  // Cursor-following glow background (hoisted — hooks must run unconditionally).
  const glowColor = featured ? "#DBF756" : "#5B7DB1";
  const glowBg = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(320px circle at ${x * 100}% ${
        y * 100
      }%, color-mix(in srgb, ${glowColor} 16%, transparent), transparent 70%)`
  );

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={
        reduced
          ? undefined
          : { rotateX: rx, rotateY: ry, transformPerspective: 900 }
      }
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border bg-surface/60 p-6 transition-colors sm:p-8 [transform-style:preserve-3d]",
        featured
          ? "border-repsay/40 hover:border-repsay/70"
          : "border-line hover:border-blueprint/60"
      )}
    >
      {/* Cursor-following glow */}
      {!reduced && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
      )}

      {/* Header row */}
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h3
              className={cn(
                "font-display font-semibold tracking-tight text-paper",
                featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              )}
            >
              {name}
            </h3>
            <span className="font-mono text-sm text-muted">{year}</span>
          </div>
        </div>

        {status ? (
          <span
            className={cn(
              "flex-none rounded-full px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider",
              featured
                ? "border border-repsay/50 text-repsay"
                : "border border-line text-muted"
            )}
          >
            {featured && status.toLowerCase().includes("live") ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-repsay" />
                {status}
              </span>
            ) : (
              status
            )}
          </span>
        ) : null}
      </div>

      <p
        className="relative mt-3 font-medium text-paper/90"
        style={{ color: featured ? accent : undefined }}
      >
        {tagline}
      </p>

      <p className="relative mt-3 text-sm leading-relaxed text-muted">
        {description}
      </p>

      {/* Stack */}
      <ul className="relative mt-5 flex flex-wrap gap-2">
        {stack.map((s) => (
          <li key={s}>
            <Chip
              className={
                featured ? "border-repsay/30 text-repsay/90" : undefined
              }
            >
              {s}
            </Chip>
          </li>
        ))}
      </ul>

      {/* Links */}
      {realLinks.length > 0 ? (
        <div className="relative mt-6 flex flex-wrap gap-4 pt-2">
          {realLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group/link inline-flex items-center gap-1.5 font-mono text-sm transition-colors",
                featured
                  ? "text-repsay hover:text-repsay"
                  : "text-paper hover:text-accent"
              )}
            >
              {link.label}
              <ArrowIcon />
            </a>
          ))}
        </div>
      ) : null}
    </motion.article>
  );
}

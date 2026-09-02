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
import LogoMark from "@/components/ui/LogoMark";
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
 * One project card. Each project carries its own brand colour via `accent`
 * (RepSay lime, Takhlees orange) — exposed as `--card-accent` and consumed by
 * the border, logo tile, chips, links and cursor glow. Projects without one
 * fall back to blueprint blue. RepSay is `featured`: larger, with a LIVE badge.
 * Hover = 3D tilt + a cursor-following accent glow.
 */
export default function ProjectCard({ project }: { project: Project }) {
  const {
    name,
    year,
    tagline,
    description,
    stack,
    status,
    featured,
    accent,
    logo,
    logoPlate,
    links,
  } = project;
  const realLinks = links.filter((l) => isRealUrl(l.url));
  const branded = Boolean(accent);
  const reduced = useReducedMotion();

  const ref = useRef<HTMLElement>(null);
  // Touch devices fire synthetic mouse events on tap but no reliable
  // mouseleave, which can leave a card stuck mid-tilt. Checked lazily in the
  // handler (browser-only) so nothing about the rendered markup changes.
  const hoverQuery = useRef<MediaQueryList | null>(null);
  function canHover() {
    hoverQuery.current ??= window.matchMedia("(hover: hover)");
    return hoverQuery.current.matches;
  }

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
  // Cursor-following glow, tinted by the card's own accent (hoisted — hooks
  // must run unconditionally).
  const glowBg = useTransform(
    [mx, my],
    ([x, y]: number[]) =>
      `radial-gradient(320px circle at ${x * 100}% ${
        y * 100
      }%, color-mix(in srgb, var(--card-accent) 16%, transparent), transparent 70%)`
  );

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced || !ref.current || !canHover()) return;
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
        {
          "--card-accent": accent ?? "var(--blueprint)",
          ...(reduced
            ? null
            : { rotateX: rx, rotateY: ry, transformPerspective: 900 }),
        } as React.CSSProperties
      }
      className="card-accent-border group relative flex h-full flex-col rounded-2xl border bg-surface/60 p-5 transition-colors sm:p-8 [transform-style:preserve-3d]"
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
      <div className="relative flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div className="flex min-w-0 items-center gap-3">
          <LogoMark src={logo} name={name} plate={logoPlate ?? true} />
          <div className="min-w-0">
            <h3
              className={cn(
                "font-display font-semibold tracking-tight text-paper",
                featured ? "text-xl sm:text-3xl" : "text-lg sm:text-2xl"
              )}
            >
              {name}
            </h3>
            <span className="font-mono text-xs text-muted sm:text-sm">
              {year}
            </span>
          </div>
        </div>

        {status ? (
          <span
            className={cn(
              "flex-none rounded-full border px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider",
              branded ? "card-accent-badge" : "border-line text-muted"
            )}
          >
            {branded && status.toLowerCase().includes("live") ? (
              <span className="inline-flex items-center gap-1.5">
                <span className="card-accent-dot h-1.5 w-1.5 animate-pulse rounded-full" />
                {status}
              </span>
            ) : (
              status
            )}
          </span>
        ) : null}
      </div>

      <p
        className={cn(
          "relative mt-4 font-medium",
          branded ? "card-accent-text" : "text-paper/90"
        )}
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
            <Chip className={branded ? "card-accent-chip" : undefined}>{s}</Chip>
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
                branded
                  ? "card-accent-text"
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

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { experience, type Experience as ExperienceEntry } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { slideInLeft, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NODE_DARK = "#2A2E37"; // --line
const NODE_LIVE = "#F5A524"; // --accent

/**
 * One timeline entry. Its node fills from a hollow dark dot to signal amber
 * exactly when the drawn spine reaches it — computed from the node's fractional
 * position along the list and the shared spine progress.
 */
function TimelineEntry({
  entry,
  progress,
  listRef,
}: {
  entry: ExperienceEntry;
  progress: MotionValue<number>;
  listRef: React.RefObject<HTMLOListElement | null>;
}) {
  const leadership = entry.type === "leadership";
  const liRef = useRef<HTMLLIElement>(null);
  // Range over `progress` where this node transitions dark -> amber.
  const [range, setRange] = useState<[number, number]>([0.999, 1]);

  useEffect(() => {
    const measure = () => {
      const ol = listRef.current;
      const li = liRef.current;
      if (!ol || !li) return;
      const total = ol.scrollHeight - 4; // spine is inset 2px top & bottom
      const nodeCenter = li.offsetTop + 8 - 2; // node sits ~8px below the li top
      const f = Math.min(1, Math.max(0, nodeCenter / total));
      const start = Math.max(0, f - 0.05);
      setRange([start, Math.max(start + 0.001, f)]);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [listRef]);

  const nodeColor = useTransform(progress, range, [NODE_DARK, NODE_LIVE], {
    clamp: true,
  });

  return (
    <motion.li
      ref={liRef}
      variants={slideInLeft}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className="relative pb-12 last:pb-0"
    >
      {/* Node — fills amber as the drawn spine reaches it */}
      <motion.span
        aria-hidden="true"
        style={{ backgroundColor: nodeColor, borderColor: nodeColor }}
        className="absolute left-[-1.6rem] top-1.5 h-3 w-3 rounded-full border-2 sm:left-[-1.85rem]"
      />

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3
          className={cn(
            "font-display font-semibold tracking-tight",
            leadership ? "text-lg text-muted" : "text-xl text-paper sm:text-2xl"
          )}
        >
          {entry.company}
        </h3>
        <span className="font-mono text-sm text-blueprint">{entry.period}</span>
        {leadership ? (
          <span className="rounded-full border border-line px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-muted">
            Extra-curricular
          </span>
        ) : null}
      </div>

      <p
        className={cn(
          "mt-1 font-mono text-sm",
          leadership ? "text-muted" : "text-paper/80"
        )}
      >
        {entry.role} · {entry.location}
      </p>

      {entry.summary ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {entry.summary}
        </p>
      ) : null}

      {entry.highlights.length > 0 ? (
        <ul className={cn("mt-4 space-y-2", leadership && "opacity-80")}>
          {entry.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 text-sm leading-relaxed text-muted"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "mt-2 h-1 w-1 flex-none rounded-full",
                  leadership ? "bg-line" : "bg-blueprint"
                )}
              />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </motion.li>
  );
}

/**
 * Experience — a drawn vertical timeline. The spine draws as you scroll through
 * the list, and each node lights amber as the line reaches it. Leadership
 * entries render lighter.
 */
export default function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 65%", "end 60%"],
  });
  const spineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-line/60 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="experience"
            title="Where I've shipped and led"
          />
        </Reveal>

        <ol ref={listRef} className="relative mt-14 pl-8 sm:pl-10">
          {/* Faint full-height track */}
          <span
            aria-hidden="true"
            className="absolute left-2 top-2 bottom-2 w-px bg-line/50 sm:left-3"
          />
          {/* Drawn spine */}
          <motion.span
            aria-hidden="true"
            style={{ scaleY: spineScale }}
            className="absolute left-2 top-2 bottom-2 w-px origin-top bg-accent sm:left-3"
          />

          {experience.map((entry) => (
            <TimelineEntry
              key={`${entry.company}-${entry.period}`}
              entry={entry}
              progress={spineScale}
              listRef={listRef}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

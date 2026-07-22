"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";

/**
 * Lenis smooth-scroll provider. Honors prefers-reduced-motion by not
 * initializing Lenis at all — native scroll + native anchor jumps take over.
 * Lenis's built-in `anchors` handling routes in-page #hash links through a
 * smooth scroll, offset for the fixed nav.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: { offset: -72 },
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // reducedMotion="user" makes Framer skip transform/layout animations for
  // visitors who prefer reduced motion, keeping only opacity/color.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

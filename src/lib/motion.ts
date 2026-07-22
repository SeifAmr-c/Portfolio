import type { Variants } from "framer-motion";

/** Shared easing — a soft "settle" curve used across the site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Slide-in from the timeline spine. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

/** Vertical draw for the experience timeline spine. */
export const drawLine: Variants = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1, transition: { duration: 1.1, ease: EASE } },
};

/** Shared viewport config — reveal once, a little before fully in view. */
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;

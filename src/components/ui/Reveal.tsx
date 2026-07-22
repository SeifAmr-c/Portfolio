"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/**
 * Single fade-up reveal on scroll-into-view. With prefers-reduced-motion,
 * MotionConfig (in SmoothScroll) drops the transform — content just fades in.
 */
export function Reveal({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container — animate its <StaggerItem> children in sequence once the
 * group scrolls into view.
 */
export function StaggerGroup({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { children: React.ReactNode }) {
  return (
    <motion.div className={className} variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}

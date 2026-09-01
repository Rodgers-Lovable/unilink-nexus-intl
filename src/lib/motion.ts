"use client";

import { useEffect, useState } from "react";
import type { Transition, Variants } from "framer-motion";

export const transitions = {
  reveal: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1],
  } satisfies Transition,
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 28,
  } satisfies Transition,
  snappy: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  } satisfies Transition,
  easeOut: {
    duration: 0.35,
    ease: [0.25, 0.1, 0.25, 1],
  } satisfies Transition,
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.reveal,
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.easeOut },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.reveal,
  },
};

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

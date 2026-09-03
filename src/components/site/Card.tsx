"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * `interactive` should only be set on cards whose entire surface leads
 * somewhere (a card built around a "Learn More" / "Read Article" link) — not
 * on static info panels or form containers, which have nothing to click.
 */
export function Card({
  className,
  interactive = false,
  children,
}: {
  className?: string;
  interactive?: boolean;
  children: ReactNode;
}) {
  const hoverProps = interactive
    ? {
        whileHover: {
          y: -5,
          boxShadow: "0 18px 40px -16px color-mix(in oklab, var(--navy) 14%, transparent)",
        },
        transition: { type: "spring" as const, stiffness: 350, damping: 22 },
      }
    : {};

  return (
    <motion.div
      {...hoverProps}
      className={cn("rounded-xl border border-border bg-card p-6 shadow-card", className)}
    >
      {children}
    </motion.div>
  );
}

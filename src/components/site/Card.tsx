"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        boxShadow: "0 18px 40px -16px color-mix(in oklab, var(--navy) 14%, transparent)",
      }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className={cn("rounded-xl border border-border bg-card p-6 shadow-card", className)}
    >
      {children}
    </motion.div>
  );
}

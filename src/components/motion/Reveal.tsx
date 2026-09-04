"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { fadeUpVariants, transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 14,
  once = true,
  amount = 0.15,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ...transitions.reveal, delay },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealImmediate({
  children,
  className,
  delay = 0,
  distance = 14,
  ...props
}: Omit<RevealProps, "once" | "amount">) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: { ...transitions.reveal, delay },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export { fadeUpVariants };

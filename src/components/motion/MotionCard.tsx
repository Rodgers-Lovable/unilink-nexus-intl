import { motion, type HTMLMotionProps } from "framer-motion";
import { Card } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type MotionCardProps = ComponentProps<typeof Card> & HTMLMotionProps<"div">;

export function MotionCard({ className, children, ...props }: MotionCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      className={cn("h-full", className)}
      {...props}
    >
      <Card className="h-full transition-shadow duration-300 hover:shadow-lift">
        {children}
      </Card>
    </motion.div>
  );
}

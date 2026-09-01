import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MotionButton({ className, children, ...props }: ButtonProps) {
  return (
    <motion.span
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn("inline-flex", className)}
    >
      <Button {...props}>{children}</Button>
    </motion.span>
  );
}

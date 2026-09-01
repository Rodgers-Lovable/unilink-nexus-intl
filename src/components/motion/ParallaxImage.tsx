"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number; // 0 = static, 0.1 = subtle, 0.25 = noticeable
}

export function ParallaxImage({
  src,
  alt,
  className,
  containerClassName,
  speed = 0.08,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]);

  return (
    <div ref={ref} className={cn("overflow-hidden", containerClassName)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className={cn("size-full object-cover will-change-transform", className)}
      />
    </div>
  );
}

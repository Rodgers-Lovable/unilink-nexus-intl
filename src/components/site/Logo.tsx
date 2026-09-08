import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Official Unilink Nexus International logo (globe, arrow and graduation cap
 * with the "Your Link to Global Opportunities" tagline).
 */
const logoSources = {
  /** Full lockup — symbol, wordmark, "INTERNATIONAL" and tagline. Footer/large use only. */
  full: { src: "/unilink-logo.png", width: 548, height: 455 },
  /** Simplified lockup — symbol + "UNILINK NEXUS" only. Navbar/compact use. */
  mark: { src: "/unilink-logo-mark.png", width: 553, height: 426 },
} as const;

export function Logo({
  variant = "full",
  size = "h-14",
  className,
  priority = false,
}: {
  variant?: keyof typeof logoSources;
  /** Tailwind height class controlling the mark's rendered size. */
  size?: string;
  className?: string;
  priority?: boolean;
}) {
  const { src, width, height } = logoSources[variant];

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label="Unilink Nexus International — home"
    >
      <Image
        src={src}
        alt="Unilink Nexus International — Your Link to Global Opportunities"
        width={width}
        height={height}
        className={cn(size, "w-auto")}
        priority={priority}
      />
    </Link>
  );
}

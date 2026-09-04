import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Official Unilink Nexus International logo (globe, arrow and graduation cap
 * with the "Your Link to Global Opportunities" tagline).
 */
export function Logo({
  variant = "dark",
  size = "h-14",
  className,
}: {
  variant?: "dark" | "light";
  /** Tailwind height class controlling the mark's rendered size. */
  size?: string;
  className?: string;
}) {
  const logoSrc = "/unilink-logo.png";

  return (
    <Link
      href="/"
      className={cn("inline-flex items-center", className)}
      aria-label="Unilink Nexus International — home"
    >
      {variant === "light" ? (
        <span className="rounded-xl bg-white p-2 shadow-sm">
          <Image
            src={logoSrc}
            alt="Unilink Nexus International — Your Link to Global Opportunities"
            width={500}
            height={500}
            className={cn(size, "w-auto")}
          />
        </span>
      ) : (
        <Image
          src={logoSrc}
          alt="Unilink Nexus International — Your Link to Global Opportunities"
          width={500}
          height={500}
          className={cn(size, "w-auto")}
          priority
        />
      )}
    </Link>
  );
}

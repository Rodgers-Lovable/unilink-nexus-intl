import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Official Unilink Nexus International logo (globe, arrow and graduation cap
 * with the "Your Link to Global Opportunities" tagline).
 *
 * Served from public/unilink-logo.png rather than a static import so the app
 * still builds while that file is pending — see the TODO below.
 */
export function Logo({
  variant = "dark",
  className,
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  // TODO: replace with the real logo once public/unilink-logo.png is added.
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
            width={482}
            height={492}
            className="h-14 w-auto"
          />
        </span>
      ) : (
        <Image
          src={logoSrc}
          alt="Unilink Nexus International — Your Link to Global Opportunities"
          width={482}
          height={492}
          className="h-14 w-auto"
          priority
        />
      )}
    </Link>
  );
}

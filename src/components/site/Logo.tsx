import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoAsset from "@/assets/unilink-logo.png.asset.json";

const logoUrl = logoAsset.url;

/**
 * Official Unilink Nexus International logo (globe, arrow and graduation cap
 * with the "Your Link to Global Opportunities" tagline).
 */
export function Logo({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  return (
    <Link
      to="/"
      className={cn("inline-flex items-center", className)}
      aria-label="Unilink Nexus International — home"
    >
      {variant === "light" ? (
        <span className="rounded-xl bg-white p-2 shadow-sm">
          <img
            src={logoUrl}
            alt="Unilink Nexus International — Your Link to Global Opportunities"
            width={482}
            height={492}
            className="h-14 w-auto"
            loading="lazy"
          />
        </span>
      ) : (
        <img
          src={logoUrl}
          alt="Unilink Nexus International — Your Link to Global Opportunities"
          width={482}
          height={492}
          className="h-14 w-auto"
        />
      )}
    </Link>
  );
}

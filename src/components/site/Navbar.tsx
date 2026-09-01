import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { navItems } from "./nav-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  to={item.to}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-navy/80 transition-colors hover:text-blue",
                    isActive(item.to) && "text-blue",
                  )}
                >
                  {item.label}
                  <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" aria-hidden="true" />
                </Link>
                <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="rounded-xl border border-border bg-popover p-2 shadow-lift">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <Link
                          to={child.to}
                          className="block rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface hover:text-blue"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-semibold text-navy/80 transition-colors hover:text-blue",
                  isActive(item.to) && "text-blue",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="cta" className="hidden sm:inline-flex">
            <Link to="/apply">Start My Application</Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-lg border border-border text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="container-page space-y-1 py-4">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-border/70 pb-1">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-1 py-3 text-left text-base font-semibold text-navy"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn("size-4 transition-transform", expanded === item.label && "rotate-180")}
                      aria-hidden="true"
                    />
                  </button>
                  {expanded === item.label && (
                    <ul className="pb-2 pl-3">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <Link
                            to={child.to}
                            onClick={() => setOpen(false)}
                            className="block py-2.5 text-sm text-muted-foreground hover:text-blue"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/70 px-1 py-3 text-base font-semibold text-navy"
                >
                  {item.label}
                </Link>
              ),
            )}
            <div className="grid gap-2 pt-4">
              <Button asChild variant="cta" size="lg" className="w-full">
                <Link to="/apply" onClick={() => setOpen(false)}>
                  Start My Application
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/book-consultation" onClick={() => setOpen(false)}>
                  Book a Consultation
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to="/explore/pathway-advisor" onClick={() => setOpen(false)}>
                  Discover My Pathway
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

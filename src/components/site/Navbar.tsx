"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { navItems } from "./nav-data";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics/umami";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

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
                  href={item.to}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold text-navy/80 transition-colors hover:text-blue",
                    isActive(item.to) && "text-blue",
                  )}
                >
                  {item.label}
                  <ChevronDown
                    className="size-3.5 transition-transform duration-200 group-hover:rotate-180"
                    aria-hidden="true"
                  />
                </Link>
                <div className="pointer-events-none absolute left-0 top-full w-64 -translate-y-1.5 pt-2 opacity-0 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <ul className="rounded-xl border border-border bg-popover p-2 shadow-lift">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <Link
                          href={child.to}
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
                href={item.to}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-semibold text-navy/80 transition-colors hover:text-blue",
                  isActive(item.to) && "text-blue",
                )}
              >
                {item.label}
                {isActive(item.to) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-blue"
                  />
                )}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="cta" className="hidden sm:inline-flex">
            <Link
              href="/apply"
              onClick={() =>
                trackEvent("cta-clicked", { cta: "start-application", location: "navbar" })
              }
            >
              Start My Application
            </Link>
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

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page space-y-1 py-4">
              {navItems.map((item, i) =>
                item.children ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-border/70 pb-1"
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-1 py-3 text-left text-base font-semibold text-navy"
                      aria-expanded={expanded === item.label}
                      onClick={() => setExpanded((v) => (v === item.label ? null : item.label))}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "size-4 transition-transform duration-200",
                          expanded === item.label && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence>
                      {expanded === item.label && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden pb-2 pl-3"
                        >
                          {item.children.map((child) => (
                            <li key={child.to}>
                              <Link
                                href={child.to}
                                onClick={() => setOpen(false)}
                                className="block py-2.5 text-sm text-muted-foreground hover:text-blue"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.to}
                      onClick={() => setOpen(false)}
                      className="block border-b border-border/70 px-1 py-3 text-base font-semibold text-navy"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ),
              )}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-2 pt-4"
              >
                <Button asChild variant="cta" size="lg" className="w-full">
                  <Link
                    href="/apply"
                    onClick={() => {
                      setOpen(false);
                      trackEvent("cta-clicked", {
                        cta: "start-application",
                        location: "navbar-mobile",
                      });
                    }}
                  >
                    Start My Application
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link
                    href="/book-consultation"
                    onClick={() => {
                      setOpen(false);
                      trackEvent("cta-clicked", {
                        cta: "book-consultation",
                        location: "navbar-mobile",
                      });
                    }}
                  >
                    Book a Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link
                    href="/explore/pathway-advisor"
                    onClick={() => {
                      setOpen(false);
                      trackEvent("cta-clicked", {
                        cta: "pathway-advisor",
                        location: "navbar-mobile",
                      });
                    }}
                  >
                    Discover My Pathway
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

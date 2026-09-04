"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import {
  contactInfo,
  socialLinks,
  company,
  offices,
  officeHours,
  telHref,
  whatsappHref,
  developer,
} from "@/data/company";
import { legalLinks } from "@/data/legal";
import { trackEvent } from "@/lib/analytics/umami";

const quickLinks = [
  { label: "Study Abroad", to: "/study-abroad" },
  { label: "Destinations", to: "/destinations" },
  { label: "How We Help", to: "/services" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white/80 border-t border-white/10">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="light" size="h-30" />
          <p className="max-w-xs text-sm leading-relaxed">
            Personalised international education guidance, from first questions to departure.
          </p>
          <div className="flex gap-2 pt-1">
            {socialLinks.map((social) => {
              const Icon = social.icon === "instagram" ? Instagram : Facebook;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("outbound-social-click", { network: social.label })}
                  aria-label={`${company.shortName} on ${social.label}`}
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-white/20 transition-colors hover:bg-white/10"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Quick Links</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link href={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Contact</h2>

          <ul className="mt-4 space-y-4 text-sm">
            {offices.map((office) => (
              <li key={office.city}>
                <p className="flex items-start gap-2 font-semibold text-white">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden="true" />
                  {office.city}, {office.country}
                </p>
                <p className="mt-1 pl-6 text-white/70">{office.address}</p>
                <a
                  href={telHref(office.phone)}
                  className="mt-1 flex items-center gap-2 pl-6 transition-colors hover:text-white"
                >
                  <Phone className="size-3.5 shrink-0" aria-hidden="true" />
                  {office.phone}
                </a>
              </li>
            ))}
          </ul>

          <ul className="mt-5 space-y-2 border-t border-white/10 pt-5 text-sm">
            <li>
              <a
                href={whatsappHref(contactInfo.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <MessageCircle className="size-4 shrink-0" aria-hidden="true" />
                WhatsApp us
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {contactInfo.email}
              </a>
            </li>
          </ul>

          <div className="mt-5 space-y-1 border-t border-white/10 pt-5 text-xs text-white/60">
            {officeHours.map((row) => (
              <div key={row.days} className="flex justify-between gap-4">
                <span>{row.days}</span>
                <span>{row.time}</span>
              </div>
            ))}
          </div>
        </div>

        <nav aria-label="Legal">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Legal</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {legalLinks.map((l) => (
              <li key={l.page}>
                <Link href={`/legal/${l.page}`} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10 tracking-wide text-white/50">
        <div className="container-page flex flex-col gap-2 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName}. All rights reserved.
          </p>

          <p>
            Developed &amp; Maintained by{" "}
            <a
              href={whatsappHref(developer.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground hover:underline hover:ease-in-out underline-offset-2"
            >
              {developer.preferred_name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

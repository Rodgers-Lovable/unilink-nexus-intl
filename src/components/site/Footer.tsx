import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { contactInfo, socialLinks, company } from "@/data/company";
import { legalLinks } from "@/data/legal";

const quickLinks = [
  { label: "Study Abroad", to: "/study-abroad" },
  { label: "Destinations", to: "/destinations" },
  { label: "How We Help", to: "/services" },
  { label: "Resources", to: "/resources" },
  { label: "About", to: "/about" },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="light" />
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
                <Link to={l.to} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Contact</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {contactInfo.phone}
            </li>
            <li className="flex items-start gap-2">
              <MessageCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {contactInfo.whatsapp}
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {contactInfo.email}
            </li>
            <li className="text-white/60">{contactInfo.hours}</li>
          </ul>
        </div>

        <nav aria-label="Legal">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-white">Legal</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {legalLinks.map((l) => (
              <li key={l.page}>
                <Link
                  to="/legal/$page"
                  params={{ page: l.page }}
                  className="transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <p>Guidance only — requirements vary by country, institution and programme.</p>
        </div>
      </div>
    </footer>
  );
}

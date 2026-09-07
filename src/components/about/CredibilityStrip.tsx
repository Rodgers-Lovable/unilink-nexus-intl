import { Compass, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion";
import { destinations } from "@/data/destinations";
import { offices } from "@/data/company";

/**
 * Verified facts only — evidence over marketing claims. Add further entries
 * here (year established, students guided, accreditations, partner
 * institutions, counsellor qualifications) only once confirmed by UniLink;
 * do not add placeholder or invented figures.
 */
export function CredibilityStrip() {
  const stats = [
    {
      icon: MapPin,
      value: String(offices.length),
      label: offices.length === 1 ? "Office location" : "Office locations",
    },
    {
      icon: Compass,
      value: String(destinations.length),
      label: "Study destinations",
    },
  ];

  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <Reveal className="flex flex-col items-center justify-center gap-10 divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 pt-10 first:pt-0 sm:px-10 sm:pt-0 sm:first:pl-0"
            >
              <stat.icon className="size-6 text-blue" aria-hidden="true" />
              <p>
                <span className="text-h3 block text-navy">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

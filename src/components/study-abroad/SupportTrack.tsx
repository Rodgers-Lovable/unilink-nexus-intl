import Image from "next/image";
import { supportTrack } from "@/data/study-abroad";
import { heroImages } from "@/components/site/hero-images";

export function SupportTrack() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
      <div>
        <div className="mb-4 grid grid-cols-2 gap-4 text-xs font-bold tracking-wider uppercase">
          <span className="text-muted-foreground">Your journey</span>
          <span className="text-blue">UniLink support</span>
        </div>
        <ol className="space-y-0">
          {supportTrack.map((row, i) => (
            <li key={row.student} className="grid grid-cols-2 gap-4 border-t border-border py-5">
              <p className="text-sm leading-relaxed text-foreground">{row.student}</p>
              <p className="flex items-start gap-2 text-sm leading-relaxed font-semibold text-blue">
                <span
                  className={
                    i === supportTrack.length - 1
                      ? "mt-1.5 size-1.5 shrink-0 rounded-full bg-green"
                      : "mt-1.5 size-1.5 shrink-0 rounded-full bg-blue"
                  }
                  aria-hidden="true"
                />
                {row.support}
              </p>
            </li>
          ))}
          <li aria-hidden="true" className="border-t border-border" />
        </ol>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border shadow-card">
        <Image
          src={heroImages.counselling.src}
          alt={heroImages.counselling.alt}
          className="aspect-4/5 w-full object-cover lg:aspect-3/4"
        />
      </div>
    </div>
  );
}

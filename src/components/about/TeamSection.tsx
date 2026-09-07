import { TeamCard } from "@/components/site/cards";
import { Reveal } from "@/components/motion";
import { team } from "@/data/team";

/** Renders nothing until real, approved team data exists — see `@/data/team`. */
export function TeamSection() {
  if (team.length === 0) return null;

  return (
    <section className="section-y bg-surface">
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Our people</p>
          <h2 className="text-h2 mt-3">The people behind the guidance.</h2>
          <p className="lead mt-4">
            Good education guidance is personal. Meet the people helping students and families
            understand their options and make informed decisions.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

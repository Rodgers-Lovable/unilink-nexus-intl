import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, PageHero } from "@/components/site/primitives";
import { legalDocuments, legalLinks, type LegalBlock } from "@/data/legal";
import { company, isPlaceholder } from "@/data/company";

export function generateStaticParams() {
  return legalLinks.map((l) => ({ page: l.page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const doc = legalDocuments[page];
  if (!doc) return { title: "Page unavailable", robots: { index: false } };

  return {
    title: `${doc.title} | ${company.legalName}`,
    description: doc.summary,
    openGraph: {
      title: `${doc.title} | ${company.legalName}`,
      description: doc.summary,
      type: "article",
    },
    twitter: {
      card: "summary",
    },
  };
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "h3") {
    return <h3 className="mt-8 text-base font-bold text-navy">{block.text}</h3>;
  }
  if (block.type === "list") {
    return (
      <ul className="mt-4 space-y-2 pl-5">
        {block.items.map((item) => (
          <li key={item} className="list-disc text-sm leading-relaxed text-muted-foreground">
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{block.text}</p>;
}

export default async function LegalPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const doc = legalDocuments[page];
  if (!doc) notFound();

  const others = legalLinks.filter((l) => l.page !== doc.slug);

  return (
    <>
      <Breadcrumbs items={[{ label: doc.title }]} />
      <PageHero eyebrow="Legal" title={doc.title} description={doc.summary} />

      <section className="section-y">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Last updated: {doc.updated}
            {isPlaceholder(doc.updated) ? " (pending confirmation)" : ""}
          </p>

          <div className="mt-10 space-y-12">
            {doc.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-h3">{section.heading}</h2>
                {section.blocks.map((block, i) => (
                  <Block key={`${section.heading}-${i}`} block={block} />
                ))}
              </section>
            ))}
          </div>

          <nav aria-label="Other legal pages" className="mt-16 border-t border-border pt-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-navy">
              Related policies
            </h2>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {others.map((l) => (
                <li key={l.page}>
                  <Link
                    href={`/legal/${l.page}`}
                    className="font-semibold text-blue hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}

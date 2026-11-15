import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpLeft } from "lucide-react";
import { getAdjacentWork, getWorkBySlug, WORK_PROJECTS } from "@/lib/voxa-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return WORK_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) return { title: "العمل غير موجود" };

  return {
    title: `${project.title} — ${project.categoryLabel}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — VOXA`,
      description: project.summary,
      images: [{ url: project.image, alt: project.imageAlt }],
    },
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getWorkBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentWork(slug);

  return (
    <article className="vx-case-study pb-0">
      <div className="container-vox">
        {/* Top editorial meta-row */}
        <div className="meta-row flex-wrap">
          <Link
            href="/#work"
            className="link-swipe inline-flex items-center gap-2 text-xs text-ink hover:text-blue"
          >
            <ArrowRight size={14} />
            <span>العودة إلى مختارات الأعمال</span>
          </Link>
          <span className="label text-muted">
            CASE {project.index} / {project.categoryCode} · {project.year}
          </span>
        </div>

        {/* Title Header */}
        <header className="mt-10 grid grid-cols-1 gap-8 pb-12 lg:mt-14 lg:grid-cols-12 lg:items-end lg:pb-16">
          <div className="space-y-4 lg:col-span-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-blue" />
              <span>{project.nature}</span>
            </span>
            <h1 className="font-display text-[clamp(2.6rem,7vw,6.2rem)] font-semibold leading-[1.06] text-ink">
              {project.title}
            </h1>
            <p className="latin font-serif text-[clamp(1.4rem,2.6vw,2.2rem)] italic text-muted">
              {project.latinTitle} — {project.year}
            </p>
          </div>

          <div className="lg:col-span-4">
            <p className="text-sm leading-[2.05] text-muted md:text-base">
              {project.summary}
            </p>
          </div>
        </header>

        {/* Full-color Framed Cover Plate */}
        <div className="figure aspect-[16/10] w-full md:aspect-[16/9]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 92vw"
            className="object-cover"
          />
        </div>

        {/* 4-column Architectural Specs Strip */}
        <div className="mt-8 grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {project.specs.map((spec, idx) => (
            <div
              key={spec.label}
              className={`py-5 ${idx % 2 === 1 ? "border-s border-line ps-5" : "pe-5"} ${
                idx >= 2 ? "border-t border-line lg:border-t-0" : ""
              } ${idx > 0 ? "lg:border-s lg:border-line lg:ps-6" : "lg:ps-0"}`}
            >
              <span className="block text-[11px] text-muted">{spec.label}</span>
              <span className="mt-1 block font-display text-sm font-medium text-ink md:text-base">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Deep Editorial Breakdown */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          {/* Narrative Columns */}
          <div className="space-y-12 lg:col-span-7">
            <section className="space-y-3 border-b border-line pb-10">
              <span className="label text-blue">01 / CHALLENGE</span>
              <h2 className="font-display text-2xl font-medium text-ink">
                السؤال والتحدي
              </h2>
              <p className="text-base leading-[2.05] text-muted">
                {project.challenge}
              </p>
            </section>

            <section className="space-y-3 border-b border-line pb-10">
              <span className="label text-blue">02 / VISUAL DIRECTION</span>
              <h2 className="font-display text-2xl font-medium text-ink">
                الاتجاه البصري والحل
              </h2>
              <p className="text-base leading-[2.05] text-muted">
                {project.approach}
              </p>
            </section>

            <section className="space-y-3">
              <span className="label text-blue">03 / OUTCOME</span>
              <h2 className="font-display text-2xl font-medium text-ink">
                الأثر والنتيجة
              </h2>
              <p className="text-base leading-[2.05] text-muted">
                {project.outcome}
              </p>
            </section>
          </div>

          {/* Design System Metadata Sidebar */}
          <aside className="space-y-10 lg:col-span-5">
            <div className="border border-line bg-paper-2/60 p-6 md:p-8">
              <span className="label text-muted">DELIVERABLES</span>
              <h3 className="mt-2 font-display text-lg font-medium text-ink">
                مخرجات العمل
              </h3>
              <ul className="mt-5 divide-y divide-line">
                {project.deliverables.map((item, idx) => (
                  <li
                    key={item}
                    className="flex items-center justify-between py-3 text-sm text-ink"
                  >
                    <span>{item}</span>
                    <span className="label text-[10px] text-muted">
                      0{idx + 1}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-line p-6 md:p-8">
              <span className="label text-muted">COLOR SYSTEM</span>
              <h3 className="mt-2 font-display text-lg font-medium text-ink">
                لوحة الألوان
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-3.5">
                {project.palette.map((swatch) => (
                  <div
                    key={swatch.hex}
                    className="border border-line bg-paper p-2.5"
                  >
                    <div
                      className="h-14 w-full border border-line"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <div className="mt-2.5 flex items-baseline justify-between gap-2">
                      <span className="latin truncate text-[11px] text-ink">
                        {swatch.name}
                      </span>
                      <span className="label text-[9px] text-muted">
                        {swatch.hex}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-line pt-5">
                <span className="label block text-[10px] text-muted">
                  TYPOGRAPHY
                </span>
                <p className="latin mt-1.5 font-display text-sm text-ink">
                  {project.typography}
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Next / Prev Work Navigation */}
        <nav
          aria-label="التنقل بين الأعمال"
          className="mt-20 grid grid-cols-1 border-t border-line sm:grid-cols-2"
        >
          <Link
            href={`/work/${prev.slug}`}
            className="group flex flex-col justify-between gap-3 py-8 sm:pe-8"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted group-hover:text-blue">
              <ArrowRight size={14} />
              <span>العمل السابق</span>
            </span>
            <span className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-blue">
              {prev.title}
            </span>
            <span className="label text-[10px] text-muted">
              {prev.index} / {prev.categoryCode}
            </span>
          </Link>

          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col items-start justify-between gap-3 border-t border-line py-8 sm:items-end sm:border-s sm:border-t-0 sm:ps-8 sm:text-end"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted group-hover:text-blue">
              <span>العمل التالي</span>
              <ArrowLeft size={14} />
            </span>
            <span className="font-display text-2xl font-medium text-ink transition-colors group-hover:text-blue">
              {next.title}
            </span>
            <span className="label text-[10px] text-muted">
              {next.index} / {next.categoryCode}
            </span>
          </Link>
        </nav>
      </div>

      {/* Bottom CTA Band on Dark Ink */}
      <div className="surface-ink mt-12 border-t border-line py-20 md:py-28">
        <div className="container-vox flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="label text-lime">NEXT PROJECT</span>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.1] text-ink">
              تبحث عن مستوى مماثل
              <br />
              لمشروعك القادم؟
            </h2>
          </div>
          <Link href="/#contact" className="btn btn-lime">
            <span>ابدأ المحادثة الآن</span>
            <ArrowUpLeft size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

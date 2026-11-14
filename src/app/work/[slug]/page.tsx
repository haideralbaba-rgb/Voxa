import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, ArrowUpLeft } from 'lucide-react'
import { getProjectBySlug, projects } from '@/lib/data/projects'

interface PageProps {
  params: Promise<{ slug: string }>
}

const projectNames: Record<string, string> = {
  'atlas-design-system': 'أطلس',
  'halo-festival': 'هالو',
  'manuscript-quarterly': 'مانوسكريبت',
  'saffron-commerce': 'سافرون',
  'aperture-studio': 'أبِرتشر',
  'orbit-analytics': 'أوربت',
}

const projectKinds: Record<string, string> = {
  Brand: 'هوية بصرية',
  Product: 'تصميم منتج',
  Commerce: 'تجارة إلكترونية',
  Editorial: 'تصميم تحريري',
  Motion: 'تصميم وحركة',
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'المشروع غير موجود' }
  const name = projectNames[slug] ?? 'تجربة بصرية'
  return {
    title: `${name} — تجربة من فوكسـا`,
    description: `استكشف تفاصيل تجربة ${name} البصرية من فوكسـا.`,
    robots: { index: false, follow: false },
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const name = projectNames[slug] ?? 'تجربة بصرية'
  const kind = projectKinds[project.category] ?? 'تجربة تصميم'

  return (
    <main dir="rtl" className="voxa-project-page">
      <header className="voxa-detail-header">
        <Link href="/#top" className="voxa-wordmark" aria-label="فوكسـا، الصفحة الرئيسية">VOXA</Link>
        <Link href="/#work" className="voxa-detail-back"><ArrowUpRight size={15} /> العودة إلى الأعمال</Link>
      </header>
      <article className="voxa-detail-shell">
        <p className="voxa-kicker"><span /> {kind} <i /> نموذج تصوري</p>
        <h1>{name}<br /><em>من فكرة إلى صورة.</em></h1>
        <p className="voxa-detail-intro">نموذج تصوري لاستكشاف التكوين واللون والإيقاع البصري، وليس مشروعاً لعميل. الصور والأرقام الظاهرة فيه توضيحية فقط، ونعرضه للتعريف بأسلوبنا وطريقة تفكيرنا.</p>
        <div className="voxa-detail-cover">
          <Image src={project.cover.src} alt={`الغلاف البصري لمشروع ${name}`} fill priority sizes="(max-width: 760px) 100vw, 82vw" />
        </div>
        <div className="voxa-detail-meta">
          <span>نموذج تصوري</span><span>{kind}</span><span>مختارات فوكسـا</span>
        </div>
        <div className="voxa-detail-gallery">
          {project.gallery.map((item, index) => (
            <figure key={item.id}>
              <div className="voxa-detail-image">
                <Image src={item.src} alt={`تفصيل بصري رقم ${index + 1} من مشروع ${name}`} fill sizes="(max-width: 760px) 100vw, 48vw" />
              </div>
              <figcaption>تفصيل بصري — {name} / ٠{index + 1}</figcaption>
            </figure>
          ))}
        </div>
        <div className="voxa-detail-end">
          <p className="voxa-kicker">انتهت هذه الحكاية، والبداية عندك</p>
          <h2>شو الفكرة<br /><em>اللي بدها تصير أثراً؟</em></h2>
          <Link href="/#contact" className="voxa-contact-link">اكتشف فوكسـا <ArrowUpLeft size={17} /></Link>
        </div>
      </article>
    </main>
  )
}

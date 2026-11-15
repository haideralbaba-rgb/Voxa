import Link from 'next/link'
import { ArrowUpLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="container-vox flex min-h-svh flex-col justify-center py-32">
      <p className="label mb-6 text-blue">Error 404</p>
      <h1 className="font-display text-[clamp(3.2rem,11vw,8.5rem)] font-semibold leading-[1.06]">
        الصفحة غير
        <br />
        <span className="outline-text">موجودة.</span>
      </h1>
      <p className="mt-8 max-w-md text-base leading-[2] text-muted">
        ربما نُقل الرابط أو حُذف، أو أن العنوان كُتب بشكل مختلف. يمكنك العودة إلى الصفحة الرئيسية
        أو تصفّح مختارات أعمال الاستوديو.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-solid">
          <span>العودة للرئيسية</span>
          <ArrowUpLeft size={16} />
        </Link>
        <Link href="/#work" className="btn btn-line">
          <span>استعرض الأعمال</span>
        </Link>
      </div>
      <p className="label mt-16 text-[10px] text-muted">VOXA — Karbala, Iraq</p>
    </section>
  )
}

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function NotFound() {
  return (
    <main dir="rtl" className="voxa-not-found">
      <Link className="voxa-wordmark" href="/#top">VOXA</Link>
      <p className="voxa-kicker"><span /> 404 / صفحة غير موجودة</p>
      <h1>يبدو أن هذه<br /><em>الصفحة أخذت طريقاً آخر.</em></h1>
      <p>الرابط الذي وصلت إليه غير متاح حالياً. خلّينا نرجع إلى بداية الحكاية.</p>
      <Link href="/#top" className="voxa-contact-link">العودة إلى فوكسـا <ArrowUpRight size={17} /></Link>
    </main>
  )
}

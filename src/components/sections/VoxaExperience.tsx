'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpLeft, ArrowUpRight, Asterisk, MoveUpLeft } from 'lucide-react'

const projects = [
  { number: '٠١', name: 'أطلس', kind: 'هوية بصرية', image: '/images/projects/atlas-cover.svg', className: 'voxa-project-tall' },
  { number: '٠٢', name: 'هالو', kind: 'اتجاه فني وحملة', image: '/images/projects/halo-cover.svg', className: '' },
  { number: '٠٣', name: 'مانوسكريبت', kind: 'تصميم تحريري', image: '/images/projects/manuscript-cover.svg', className: '' },
  { number: '٠٤', name: 'سافرون', kind: 'هوية وتجربة', image: '/images/projects/saffron-cover.svg', className: 'voxa-project-wide' },
]

const values = [
  { number: '٠١', title: 'الفكرة أولاً', body: 'نبدأ من السؤال الصحيح، ونبحث عن الفكرة التي تستحق أن تتحوّل إلى شيء ملموس.' },
  { number: '٠٢', title: 'لغة بصرية واضحة', body: 'نصنع نظاماً متماسكاً؛ من أول انطباع إلى أصغر تفصيل في التجربة.' },
  { number: '٠٣', title: 'أثر يبقى', body: 'الجمال بداية جيدة، لكن المعنى والتميّز هما ما يجعل العلامة حاضرة في الذاكرة.' },
]

export function VoxaExperience() {
  const storyRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ['start start', 'end end'] })
  const orbScale = useTransform(scrollYProgress, [0, 0.35, 0.72, 1], [0.48, 1.15, 1.7, 0.28])
  const orbRotate = useTransform(scrollYProgress, [0, 1], [-20, 210])
  const orbOpacity = useTransform(scrollYProgress, [0, 0.1, 0.78, 1], [0.35, 0.9, 0.72, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -105])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.36], [1, 0.75, 0])

  return (
    <main dir="rtl" className="voxa-site">
      <div className="voxa-grain" aria-hidden="true" />
      <header className="voxa-header">
        <a className="voxa-wordmark" href="#top" aria-label="فوكسـا، إلى الأعلى">VOXA<span>®</span></a>
        <nav aria-label="التنقل الرئيسي">
          <a href="#work">أعمالنا</a>
          <a href="#about">فلسفتنا</a>
          <a href="#contact">لنتحدث</a>
        </nav>
        <a className="voxa-header-cta" href="#contact">ابدأ حكايتك <ArrowUpLeft size={15} /></a>
      </header>

      <section id="top" ref={storyRef} className="voxa-story">
        <div className="voxa-story-sticky">
          <div className="voxa-grid" aria-hidden="true" />
          <motion.div className="voxa-orb" style={reduced ? undefined : { scale: orbScale, rotate: orbRotate, opacity: orbOpacity }} aria-hidden="true">
            <span /><i /><b />
          </motion.div>
          <motion.div className="voxa-hero-copy" style={reduced ? undefined : { y: heroY, opacity: heroOpacity }}>
            <p className="voxa-kicker"><span /> استوديو إبداعي مستقل <i /> كربلاء · العراق</p>
            <h1>الفكرة<br /><em>تصير</em> أثراً.</h1>
            <p className="voxa-hero-description">نحوّل الأفكار إلى هويات وتجارب بصرية<br className="desktop-break" /> تترك انطباعاً لا يمرّ مروراً عابراً.</p>
            <a href="#work" className="voxa-scroll-link">اكتشف الحكاية <ArrowDown size={15} /></a>
          </motion.div>
          <div className="voxa-story-index"><span>٠١</span><span className="voxa-index-line" /><span>٠٤</span></div>
          <div className="voxa-story-caption">من بذرة الفكرة إلى اكتمال الصورة</div>
        </div>
        <div className="voxa-story-track" aria-hidden="true"><span>الفكرة</span><span>التشكيل</span><span>التفاصيل</span><span>الأثر</span></div>
      </section>

      <section id="about" className="voxa-intro">
        <div className="voxa-section-meta"><span>٠١ / الفلسفة</span><span>ما الذي نصنعه؟</span></div>
        <div className="voxa-intro-content">
          <p className="voxa-kicker">لكل فكرة شكلها الخاص</p>
          <h2>لا نبحث عن شكلٍ<br />جميل فقط. نبحث عن<br /><span>معنى يستحق أن يُرى.</span></h2>
          <p className="voxa-intro-note">فوكسـا مساحة تلتقي فيها الاستراتيجية مع الحسّ البصري. نبني لغة متكاملة للعلامات التي تريد أن تقول شيئاً مختلفاً، ونمنح الأفكار شكلاً يعبّر عنها بوضوح.</p>
        </div>
        <Asterisk className="voxa-intro-mark" strokeWidth={0.8} aria-hidden="true" />
      </section>

      <section id="work" className="voxa-work">
        <div className="voxa-section-meta"><span>٠٢ / مختارات</span><span>تجارب بصرية</span></div>
        <div className="voxa-work-heading">
          <h2>أفكار أخذت<br /><em>شكلها.</em></h2>
          <p>مساحة للتجريب، واكتشاف لغة بصرية، وصناعة تفاصيل تستحق التوقف عندها.</p>
        </div>
        <div className="voxa-work-grid">
          {projects.map((project, index) => (
            <motion.article key={project.number} className={`voxa-project ${project.className}`} initial={reduced ? false : { opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.72, delay: index * 0.07 }}>
              <div className="voxa-project-image">
                <Image src={project.image} alt={`تجربة تصميم ${project.name}`} fill sizes="(max-width: 720px) 100vw, 50vw" />
                <span className="voxa-project-number">{project.number}</span>
                <span className="voxa-project-open"><ArrowUpLeft size={18} /></span>
              </div>
              <div className="voxa-project-info"><h3>{project.name}</h3><span>{project.kind}</span></div>
            </motion.article>
          ))}
        </div>
        <p className="voxa-work-footnote">مختارات من التجارب البصرية — والمزيد يتشكّل.</p>
      </section>

      <section className="voxa-manifesto" aria-label="رؤية فوكسـا">
        <p>نؤمن أن التصميم ليس زينة للفكرة،</p>
        <h2>بل هو الطريقة<br /><em>التي تُروى بها.</em></h2>
        <span className="voxa-manifesto-star"><Asterisk strokeWidth={0.8} /></span>
      </section>

      <section className="voxa-process">
        <div className="voxa-section-meta"><span>٠٣ / كيف نفكّر</span><span>مبادئنا</span></div>
        <div className="voxa-process-heading"><p className="voxa-kicker">منهجنا في كل تفصيل</p><h2>الإبداع ليس<br /><em>صدفة.</em></h2></div>
        <div className="voxa-values">
          {values.map((value, index) => (
            <motion.div key={value.number} className="voxa-value" initial={reduced ? false : { opacity: 0, x: 25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: index * 0.1 }}>
              <span className="voxa-value-number">{value.number}</span>
              <div><h3>{value.title}</h3><p>{value.body}</p></div>
              <MoveUpLeft size={18} strokeWidth={1.4} />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="voxa-end">
        <div className="voxa-end-symbol" aria-hidden="true"><span>V</span><i /></div>
        <p className="voxa-kicker">٠٤ / الخطوة التالية</p>
        <h2>عندك فكرة؟<br /><em>خلّينا نطلّعها للنور.</em></h2>
        <p className="voxa-end-note">الحكايات الكبيرة تبدأ بمحادثة بسيطة. قريباً، مساحة مخصّصة لاستقبال مشاريعكم.</p>
        <a href="#top" className="voxa-contact-link">ارجع للبداية <ArrowUpLeft size={18} /></a>
        <footer className="voxa-footer">
          <a className="voxa-wordmark" href="#top">VOXA<span>®</span></a>
          <span>استوديو مستقل للأفكار التي تستحق أن تُرى.</span>
          <span>© ٢٠٢٦ فوكسـا</span>
        </footer>
      </section>
    </main>
  )
}

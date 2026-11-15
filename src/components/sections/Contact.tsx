'use client'

import { useState, type FormEvent } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpLeft, Check, CheckCircle2, Copy, Loader2 } from 'lucide-react'
import { CONTACT_BUDGETS, CONTACT_SERVICES, STUDIO } from '@/lib/voxa-data'

interface FieldErrors {
  name?: string
  email?: string
  service?: string
  budget?: string
  message?: string
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

export function Contact() {
  const reduced = useReducedMotion()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState<string>(CONTACT_SERVICES[0])
  const [budget, setBudget] = useState<string>('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('')

  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(STUDIO.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Fallback: open mailto if clipboard is unavailable
      window.location.href = `mailto:${STUDIO.email}`
    }
  }

  const validateClient = (): FieldErrors => {
    const next: FieldErrors = {}
    if (name.trim().length < 2) {
      next.name = 'يرجى كتابة اسمك (حرفان على الأقل).'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'يرجى إدخال بريد إلكتروني صحيح.'
    }
    if (message.trim().length < 20) {
      next.message = 'اكتب لمحة أوضح عن مشروعك (٢٠ حرفاً على الأقل).'
    } else if (message.trim().length > 1200) {
      next.message = 'يرجى اختصار الرسالة لأقل من ١٢٠٠ حرف.'
    }
    return next
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerMessage('')

    const clientErrors = validateClient()
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      setStatus('error')
      setServerMessage('يرجى مراجعة الحقول المحددة قبل الإرسال.')
      return
    }

    setErrors({})
    setStatus('submitting')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service,
          budget,
          message: message.trim(),
          website,
        }),
      })

      const data = (await response.json()) as {
        ok?: boolean
        message?: string
        fieldErrors?: FieldErrors
      }

      if (!response.ok || !data.ok) {
        setErrors(data.fieldErrors ?? {})
        setStatus('error')
        setServerMessage(data.message ?? 'تعذّر إرسال الرسالة حالياً. جرّب التواصل المباشر عبر البريد.')
        return
      }

      setStatus('success')
      setServerMessage(
        data.message ?? 'وصلتنا رسالتك بنجاح. سنراجع تفاصيل مشروعك ونرد خلال ٢٤ ساعة عمل.',
      )
    } catch {
      setStatus('error')
      setServerMessage('حدث خطأ في الاتصال بالشبكة. يرجى المحاولة مرة أخرى أو مراسلتنا مباشرة.')
    }
  }

  const resetForm = () => {
    setName('')
    setEmail('')
    setService(CONTACT_SERVICES[0])
    setBudget('')
    setMessage('')
    setWebsite('')
    setErrors({})
    setStatus('idle')
    setServerMessage('')
  }

  return (
    <section id="contact" className="border-t border-line py-24 md:py-36">
      <div className="container-vox">
        <div className="meta-row">
          <span className="text-xs font-medium text-ink">٠٦ — ابدأ مشروعك</span>
          <span className="label text-muted">06 / START A PROJECT</span>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-14">
          {/* Right (start in RTL): Editorial CTA & direct email */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: EASE_EXPO }}
            className="flex flex-col justify-between gap-10 lg:col-span-5"
          >
            <div className="space-y-6">
              <h2 className="font-display text-[clamp(2.4rem,5.6vw,4.7rem)] font-semibold leading-[1.08] text-ink">
                عندك فكرة؟
                <br />
                لنحوّلها إلى <span className="text-lime">أثر.</span>
              </h2>
              <p className="max-w-md text-sm leading-[2.05] text-muted md:text-base">
                سواء كانت لديك خطة جاهزة أو مجرّد فكرة أولية تبحث عن شكلها الصحيح، شاركنا لمحة
                سريعة وسنعود إليك خلال يوم عمل واحد بخطوات واضحة.
              </p>
            </div>

            <div className="space-y-6 border-t border-line pt-8">
              <div>
                <span className="label block text-[10px] text-muted">DIRECT EMAIL</span>
                <div className="mt-2.5 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${STUDIO.email}`}
                    className="latin font-display text-xl text-ink transition-colors hover:text-lime md:text-2xl"
                  >
                    {STUDIO.email}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    data-cursor="نسخ"
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-lime hover:text-lime"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copied ? 'تم النسخ' : 'نسخ البريد'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-line pt-6 text-xs">
                <div>
                  <span className="label block text-[10px] text-muted">RESPONSE TIME</span>
                  <p className="mt-1 text-ink">خلال ٢٤ ساعة عمل</p>
                </div>
                <div>
                  <span className="label block text-[10px] text-muted">LOCATION</span>
                  <p className="mt-1 text-ink">
                    {STUDIO.city} · <span className="latin">{STUDIO.timezoneLabel}</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Left (end in RTL): Interactive Editorial Inquiry Form */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE_EXPO }}
            className="lg:col-span-7"
          >
            {status === 'success' ? (
              <div className="border border-lime/40 bg-paper-2 p-8 md:p-12">
                <div className="flex items-center gap-3 text-lime">
                  <CheckCircle2 size={24} />
                  <span className="label text-lime">INQUIRY RECEIVED</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-ink md:text-3xl">
                  شكراً لتواصلك، {name}.
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-[2] text-muted md:text-base">
                  {serverMessage}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-3 border-y border-line py-5 text-xs sm:grid-cols-2">
                  <div>
                    <span className="label block text-[10px] text-muted">SERVICE</span>
                    <span className="mt-1 block text-ink">{service || 'غير محدد'}</span>
                  </div>
                  <div>
                    <span className="label block text-[10px] text-muted">BUDGET</span>
                    <span className="mt-1 block text-ink">{budget || 'يُحدّد في النقاش'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={resetForm}
                  className="btn btn-line mt-8 !text-xs"
                >
                  <span>إرسال استفسار آخر</span>
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-9 border border-line bg-paper-2/50 p-6 sm:p-8 md:p-10"
              >
                {/* Honeypot anti-spam field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                {/* Service Chips */}
                <fieldset className="space-y-3.5">
                  <legend className="flex items-center gap-2 text-xs text-muted">
                    <span className="label text-lime">01</span>
                    <span>ما نوع المشروع؟</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_SERVICES.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={service === option}
                        onClick={() => setService(service === option ? '' : option)}
                        className="chip"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Budget Chips */}
                <fieldset className="space-y-3.5">
                  <legend className="flex items-center gap-2 text-xs text-muted">
                    <span className="label text-lime">02</span>
                    <span>الميزانية التقريبية (اختياري)</span>
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_BUDGETS.map((option) => (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={budget === option}
                        onClick={() => setBudget(budget === option ? '' : option)}
                        className="chip"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Name & Email Fields */}
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs text-muted">
                      الاسم الكامل <span className="text-lime">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="مثال: علي الحسيني"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                      }}
                      aria-invalid={Boolean(errors.name)}
                      className="field"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-2 text-xs text-[#ff7369]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs text-muted">
                      البريد الإلكتروني <span className="text-lime">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      dir="ltr"
                      autoComplete="email"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                      }}
                      aria-invalid={Boolean(errors.email)}
                      className="field text-end"
                    />
                    {errors.email && (
                      <p role="alert" className="mt-2 text-xs text-[#ff7369]">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <label htmlFor="contact-message">
                      تفاصيل المشروع والفكرة <span className="text-lime">*</span>
                    </label>
                    <span className="label text-[10px]">
                      {message.length} / 1200
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    maxLength={1200}
                    placeholder="احكِ لنا باختصار عن علامتك أو مشروعك، وما الهدف الذي تسعى لتحقيقه..."
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value)
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }))
                    }}
                    aria-invalid={Boolean(errors.message)}
                    className="field resize-y"
                  />
                  {errors.message && (
                    <p role="alert" className="mt-2 text-xs text-[#ff7369]">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && serverMessage && (
                  <div
                    role="alert"
                    className="border border-[#ff5a4d]/50 bg-[#ff5a4d]/10 px-4 py-3 text-xs text-[#ffb0a8]"
                  >
                    {serverMessage}
                  </div>
                )}

                <div className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn btn-lime w-full sm:w-auto"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <span>أرسل تفاصيل المشروع</span>
                        <ArrowUpLeft size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] leading-[1.8] text-muted">
                    بياناتك محفوظة بسرّية تامة ولا نشاركها مع أي طرف ثالث.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

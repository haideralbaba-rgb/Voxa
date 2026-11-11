'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Loader2, Mail, Send } from 'lucide-react'
import { budgets, profile } from '@/lib/data/profile'
import type { ContactPayload, ContactResult } from '@/lib/types'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const emptyForm: ContactPayload = { name: '', email: '', company: '', budget: '', message: '' }

const budgetOptions = [...budgets]

export function Contact() {
  const [form, setForm] = useState<ContactPayload>(emptyForm)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof ContactPayload, string>>>({})
  const [result, setResult] = useState<ContactResult | null>(null)
  const [copied, setCopied] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)
  const reduced = useReducedMotion()

  function update<K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) {
    setForm((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => (previous[key] ? { ...previous, [key]: undefined } : previous))
    if (status === 'error') setStatus('idle')
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = (await response.json()) as ContactResult
      setResult(data)
      if (!response.ok || !data.ok) {
        setStatus('error')
        setErrors(data.fieldErrors ?? {})
        const firstField = data.fieldErrors ? Object.keys(data.fieldErrors)[0] : undefined
        if (firstField) {
          formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus()
        }
        return
      }
      setStatus('success')
      setForm(emptyForm)
    } catch {
      setStatus('error')
      setResult({ ok: false, message: 'Network hiccup. Try again, or email me directly.' })
    }
  }

  const fieldClass = (name: keyof ContactPayload) =>
    cn(
      'w-full rounded-xl border bg-[var(--card)] px-3.5 py-3 text-[13.5px] text-[var(--fg)] placeholder:text-[var(--fg)]/50 transition-[border-color,box-shadow] duration-300 outline-none',
      errors[name]
        ? 'border-red-500/50 focus:border-red-500/70'
        : 'border-[var(--hairline)] focus:border-accent/60 focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-accent)_16%,transparent)]',
    )

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden border-t border-[var(--hairline)] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute bottom-[-14rem] left-1/2 h-[26rem] w-[52rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[110px]" />
      </div>

      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* Left: pitch + direct contact */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="font-mono text-[11px] tracking-[0.16em] text-accent">05</span>
              <span className="h-px w-8 bg-[var(--hairline-strong)]" aria-hidden />
              <span className="eyebrow">Contact</span>
            </div>
            <h2
              id="contact-heading"
              className="text-display-lg font-semibold leading-[0.98] tracking-[-0.045em]"
            >
              Let&apos;s build something
              <br />
              <span className="serif-accent text-accent">worth remembering.</span>
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.75] text-muted">
              Brand systems, product interfaces, or a launch site that has to land. Tell me the
              shape of the problem — I reply within one working day, and I say no quickly when it is
              not a fit.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={copyEmail}
                className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-[var(--hairline-strong)] bg-[var(--card)] pl-4 pr-3 text-[13.5px] font-medium transition-colors duration-300 hover:border-accent/45"
              >
                <Mail size={14} className="text-muted" aria-hidden />
                {profile.email}
                <span className="grid size-7 place-items-center rounded-full bg-[var(--fg)]/[0.06] text-[var(--fg)]/70 transition-colors group-hover:bg-accent group-hover:text-white">
                  {copied ? <Check size={12} aria-hidden /> : <Copy size={12} aria-hidden />}
                </span>
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? 'Email address copied to clipboard' : ''}
              </span>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-[var(--hairline)] pt-6">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Location</dt>
                <dd className="mt-1.5 text-[13.5px] font-medium">{profile.location}</dd>
                <dd className="text-[11.5px] text-muted">{profile.timezone} · remote friendly</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Availability</dt>
                <dd className="mt-1.5 flex items-center gap-1.5 text-[13.5px] font-medium">
                  <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden />
                  Booking Q1 2027
                </dd>
                <dd className="text-[11.5px] text-muted">Two slots per quarter</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {profile.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[12.5px] text-muted transition-colors hover:text-[var(--fg)]"
                >
                  {social.label}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="surface relative overflow-hidden rounded-3xl p-5 md:p-7">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex min-h-[24rem] flex-col items-center justify-center text-center"
                  role="status"
                  aria-live="polite"
                >
                  <motion.span
                    initial={reduced ? false : { scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                    className="grid size-14 place-items-center rounded-full bg-emerald-500/12 text-emerald-600 dark:text-emerald-400"
                  >
                    <Check size={26} strokeWidth={2.2} aria-hidden />
                  </motion.span>
                  <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em]">Message sent</h3>
                  <p className="mt-2 max-w-xs text-[13.5px] leading-6 text-muted">
                    {result?.message ?? 'Thanks — your note landed.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle')
                      setResult(null)
                    }}
                    className="mt-6 inline-flex h-10 items-center rounded-full border border-[var(--hairline-strong)] px-4 text-[12.5px] font-medium transition-colors hover:border-[var(--fg)]/40"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  initial={false}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  className="flex flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" htmlFor="contact-name" error={errors.name} required>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={form.name}
                        onChange={(event) => update('name', event.target.value)}
                        placeholder="Your name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        className={fieldClass('name')}
                      />
                    </Field>
                    <Field label="Email" htmlFor="contact-email" error={errors.email} required>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        required
                        value={form.email}
                        onChange={(event) => update('email', event.target.value)}
                        placeholder="you@company.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={fieldClass('email')}
                      />
                    </Field>
                  </div>

                  <Field label="Company" htmlFor="contact-company" hint="Optional">
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={form.company}
                      onChange={(event) => update('company', event.target.value)}
                      placeholder="Studio or company"
                      className={fieldClass('company')}
                    />
                  </Field>

                  <fieldset>
                    <legend className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-muted">
                      Budget range
                    </legend>
                    <div className="flex flex-wrap gap-1.5">
                      {budgetOptions.map((option) => {
                        const selected = form.budget === option
                        return (
                          <button
                            key={option}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => update('budget', selected ? '' : option)}
                            className={cn(
                              'h-8 rounded-full border px-3 text-[12px] font-medium transition-all duration-300',
                              selected
                                ? 'border-accent bg-accent text-white'
                                : 'border-[var(--hairline)] text-[var(--fg)]/62 hover:border-[var(--hairline-strong)] hover:text-[var(--fg)]',
                            )}
                          >
                            {option}
                          </button>
                        )
                      })}
                    </div>
                  </fieldset>

                  <Field
                    label="Project"
                    htmlFor="contact-message"
                    error={errors.message}
                    hint={`${form.message.length}/2000`}
                    required
                  >
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      maxLength={2000}
                      value={form.message}
                      onChange={(event) => update('message', event.target.value)}
                      placeholder="What are you building, who is it for, and when does it need to ship?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? 'error-message' : undefined}
                      className={cn(fieldClass('message'), 'resize-none leading-6')}
                    />
                  </Field>

                  {status === 'error' && result?.message ? (
                    <p role="alert" className="rounded-lg bg-red-500/8 px-3 py-2 text-[12.5px] text-red-600 dark:text-red-400">
                      {result.message}
                    </p>
                  ) : null}

                  <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
                    <p className="max-w-[15rem] text-[11px] leading-4 text-muted">
                      Your details are used only to reply to this enquiry.
                    </p>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group inline-flex h-11 min-w-[9.5rem] items-center justify-center gap-2 rounded-full bg-[var(--fg)] px-5 text-[13.5px] font-medium text-[var(--bg)] transition-all duration-300 hover:opacity-90 disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 size={15} className="animate-spin" aria-hidden />
                          Sending
                        </>
                      ) : (
                        <>
                          Send message
                          <Send
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden
                          />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  children,
}: {
  label: string
  htmlFor: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-[11px] font-medium uppercase tracking-[0.1em] text-muted">
          {label}
          {required ? <span className="ml-0.5 text-accent">*</span> : null}
        </label>
        {hint ? <span className="font-mono text-[9.5px] text-muted">{hint}</span> : null}
      </div>
      {children}
      {error ? (
        <p id={`error-${htmlFor.replace('contact-', '')}`} className="text-[11.5px] text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  )
}

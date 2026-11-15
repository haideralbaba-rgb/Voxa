import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseServer } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'يرجى كتابة اسمك (حرفان على الأقل).')
    .max(80, 'الاسم طويل جداً (الحد الأقصى ٨٠ حرفاً).'),
  email: z.string().trim().toLowerCase().email('يرجى إدخال بريد إلكتروني صحيح.'),
  service: z.string().trim().max(60).optional().or(z.literal('')),
  budget: z.string().trim().max(60).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'اكتب لمحة أوضح عن مشروعك (٢٠ حرفاً على الأقل).')
    .max(1200, 'يرجى اختصار الرسالة لأقل من ١٢٠٠ حرف.'),
  website: z.string().max(0).optional().or(z.literal('')),
})

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, message: 'صيغة البيانات المرسلة غير صالحة.' },
      { status: 400 },
    )
  }

  const parsed = schema.safeParse(payload)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'message')
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return NextResponse.json(
      { ok: false, message: 'يرجى مراجعة الحقول المحددة قبل الإرسال.', fieldErrors },
      { status: 422 },
    )
  }

  // Honeypot: real visitors never fill this hidden field.
  if (parsed.data.website) {
    return NextResponse.json({
      ok: true,
      message: 'وصلتنا رسالتك بنجاح. سنعود إليك قريباً.',
    })
  }

  let stored = false
  let storageFailed = false

  // Optional Supabase persistence (active when env vars are set on Vercel/production).
  const supabase = await getSupabaseServer()
  if (supabase) {
    try {
      const { error } = await supabase.from('portfolio_messages').insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.service || null,
        budget: parsed.data.budget || null,
        message: parsed.data.message,
        source: 'website',
      })
      if (error) {
        storageFailed = true
        console.error('[contact] supabase insert failed', error)
      } else {
        stored = true
      }
    } catch (error) {
      storageFailed = true
      console.error('[contact] unexpected supabase error', error)
    }
  }

  // Optional webhook notification (Slack, Resend, Make, …).
  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: parsed.data.name,
          email: parsed.data.email,
          service: parsed.data.service || null,
          budget: parsed.data.budget || null,
          message: parsed.data.message,
          source: 'website',
          receivedAt: new Date().toISOString(),
        }),
      })
    } catch (error) {
      console.error('[contact] webhook dispatch failed', error)
    }
  } else if (!stored) {
    console.info('[contact] new inquiry received', {
      name: parsed.data.name,
      email: parsed.data.email,
      service: parsed.data.service || null,
      budget: parsed.data.budget || null,
    })
  }

  return NextResponse.json({
    ok: true,
    message: storageFailed
      ? 'تم استلام رسالتك. إن لم يصلك رد خلال ٢٤ ساعة، يسعدنا تواصلك المباشر على hello@voxa.studio.'
      : 'وصلتنا تفاصيل مشروعك بنجاح. سنراجعها ونعود إليك خلال ٢٤ ساعة عمل.',
  })
}

import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getSupabaseServer } from '@/lib/supabase/server'

export const runtime = 'nodejs'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please share your name.').max(80),
  email: z.string().trim().toLowerCase().email('That email looks invalid.'),
  company: z.string().trim().max(120).optional().or(z.literal('')),
  budget: z.string().trim().max(40).optional().or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(20, 'A little more context helps — at least 20 characters.')
    .max(2000, 'Please keep it under 2000 characters.'),
})

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'message')
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return NextResponse.json(
      { ok: false, message: 'Please check the highlighted fields.', fieldErrors },
      { status: 422 },
    )
  }

  // Persist first: Supabase, when configured, is the durable record of the
  // enquiry. RLS allows inserts only, so the anon key cannot read anything back.
  const supabase = await getSupabaseServer()
  let stored = false
  let storageFailed = false

  if (supabase) {
    const { error } = await supabase.from('portfolio_messages').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
      source: 'portfolio',
    })
    if (error) storageFailed = true
    else stored = true
  }

  // Then forward to a webhook (Slack, Resend, …) when one is configured.
  const endpoint = process.env.CONTACT_WEBHOOK_URL
  if (endpoint) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, source: 'portfolio', receivedAt: new Date().toISOString() }),
      })
    } catch {
      return NextResponse.json(
        { ok: false, message: 'Could not reach the inbox. Please email me directly.' },
        { status: 502 },
      )
    }
  } else if (!stored) {
    // Surface the enquiry in server logs so an unconfigured deployment is still useful.
    console.info('[contact] new enquiry', {
      name: parsed.data.name,
      email: parsed.data.email,
      budget: parsed.data.budget,
    })
  }

  return NextResponse.json({
    ok: true,
    // Be honest: if storage was configured and failed, ask for an email too.
    message: storageFailed
      ? 'Thanks — I received your note. If you do not hear back within a day, please email me directly.'
      : 'Thanks — your note landed. I reply within one working day.',
  })
}

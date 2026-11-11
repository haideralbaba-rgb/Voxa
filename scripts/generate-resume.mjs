/**
 * Builds public/resume.pdf from a tiny layout description.
 * Uses only PDF base-14 fonts so the file needs no embedded assets.
 *
 *   node scripts/generate-resume.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const PAGE = { w: 595.28, h: 841.89 }
const MARGIN = { x: 52, top: 54, bottom: 48 }

const INK = '0.086 0.086 0.102'
const MUTED = '0.45 0.45 0.48'
const ACCENT = '0.643 0.306 0.173'
const HAIR = '0.85 0.85 0.86'

const ascii = (s) =>
  s
    .replace(/[\u2014\u2013]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u00b7/g, '|')
    .replace(/[^\x20-\x7E]/g, ' ')

const esc = (s) => ascii(s).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')

/** Rough Helvetica advance widths (per 1000 units) for wrapping. */
function measure(text, size, bold = false) {
  let total = 0
  for (const char of text) {
    if (char === ' ') total += 278
    else if (/[iljt.,:;'!|]/.test(char)) total += 260
    else if (/[mwMW]/.test(char)) total += 830
    else if (/[A-Z]/.test(char)) total += 690
    else total += bold ? 585 : 545
  }
  return (total / 1000) * size
}

function wrap(text, size, maxWidth, bold = false) {
  const words = text.split(' ')
  const lines = []
  let line = ''
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (measure(candidate, size, bold) > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines
}

class Doc {
  constructor() {
    this.ops = []
    this.y = MARGIN.top
  }

  text(str, { x = MARGIN.x, y = this.y, size = 10, bold = false, italic = false, color = INK } = {}) {
    const font = bold ? '/F2' : italic ? '/F3' : '/F1'
    this.ops.push(
      `BT ${color} rg ${font} ${size} Tf ${x} ${(PAGE.h - y).toFixed(2)} Td (${esc(str)}) Tj ET`,
    )
  }

  rule({ y = this.y, color = HAIR, width = 0.6, x = MARGIN.x, x2 = PAGE.w - MARGIN.x } = {}) {
    this.ops.push(`${color} RG ${width} w ${x} ${(PAGE.h - y).toFixed(2)} m ${x2} ${(PAGE.h - y).toFixed(2)} l S`)
  }

  space(amount) {
    this.y += amount
  }
}

const doc = new Doc()
const contentWidth = PAGE.w - MARGIN.x * 2

function heading(label) {
  doc.space(20)
  doc.text(label.toUpperCase(), { size: 7.6, bold: true, color: MUTED })
  doc.space(7)
  doc.rule({ y: doc.y - 4 })
  doc.space(13)
}

function paragraph(text, { size = 9.4, color = INK, leading = 13.4, width = contentWidth, bold = false } = {}) {
  for (const line of wrap(text, size, width, bold)) {
    doc.text(line, { size, color, bold })
    doc.space(leading)
  }
}

function bullet(text) {
  const indent = 12
  const lines = wrap(text, 9.2, contentWidth - indent)
  doc.ops.push(`0.643 0.306 0.173 rg ${MARGIN.x + 2} ${(PAGE.h - doc.y + 3.4).toFixed(2)} 2.4 2.4 re f`)
  lines.forEach((line, index) => {
    doc.text(line, { x: MARGIN.x + indent, size: 9.2, color: INK })
    doc.space(index === lines.length - 1 ? 11 : 12.4)
  })
}

function job({ role, company, period, bullets }) {
  doc.space(4)
  doc.text(role, { size: 10.6, bold: true })
  doc.space(13)
  doc.text(company, { size: 9.6, bold: true, color: ACCENT })
  doc.space(11)
  doc.text(period, { size: 8.2, color: MUTED })
  doc.space(13)
  bullets.forEach(bullet)
  doc.space(4)
}

// ------------------------------------------------------------------ header
doc.text('Haider Albaba', { size: 26, bold: true })
doc.space(24)
doc.text('Product Engineer & Interaction Designer', { size: 11, bold: true, color: ACCENT })
doc.space(14)
doc.text('Karbala, Iraq  ·  hello@haideralbaba.com  ·  haideralbaba.com  ·  github.com/haideralbaba-rgb', {
  size: 8.2,
  color: MUTED,
})

heading('Profile')
paragraph(
  'Ten years designing and building digital products across MENA and Europe. I work end to end: positioning and design systems through to production TypeScript, motion and performance. Founder of VOXA Studio.',
  { size: 9.6, leading: 14 },
)

heading('Experience')
job({
  role: 'Founder & Principal Engineer',
  company: 'VOXA Studio — Karbala, IQ',
  period: '2023 — Present',
  bullets: [
    'Shipped 17 client launches with a median Lighthouse performance score of 97.',
    'Built a shared Next.js + Tailwind starter that cut project kickoff from two weeks to three days.',
    'Grew retained revenue to a stable three-client retainer book, 60% inbound.',
  ],
})
job({
  role: 'Senior Product Engineer',
  company: 'Northwind Labs — Dubai, AE',
  period: '2021 — 2023',
  bullets: [
    'Led the design-systems guild: 240 screens migrated to a token-driven system, 38% fewer UI defects.',
    'Cut marketing site time-to-interactive from 4.8s to 1.2s; trial signups up 22%.',
    'Mentored five engineers and introduced an accessibility budget enforced in CI.',
  ],
})
job({
  role: 'Frontend Engineer',
  company: 'Meridian Commerce — Amman, JO',
  period: '2019 — 2021',
  bullets: [
    'Owned the storefront for a headless commerce platform processing $14M GMV annually.',
    'Rebuilt checkout as composable steps; cart abandonment dropped 19%.',
  ],
})
job({
  role: 'Freelance Designer & Developer',
  company: 'Independent — Karbala, IQ',
  period: '2016 — 2019',
  bullets: ['Delivered 30+ brand and web projects solo, from naming workshop to DNS.'],
})

heading('Selected Work')
bullet('Aperture Studio — identity and gallery engine; LCP 1.1s, booking enquiries +266%.')
bullet('Orbit Analytics — real-time analytics surface sustaining 60fps at 40k events per minute.')
bullet('Atlas Design System — 94% adoption across 60 engineers, UI defects down 38%.')
bullet('Saffron & Co — Arabic-first storefront; conversion +23%, checkout in 11 seconds.')

heading('Skills')
paragraph('Frontend — TypeScript, React 19, Next.js App Router, Tailwind CSS v4, motion/react, WCAG 2.2.', {
  size: 9.2,
  leading: 13,
})
paragraph('Backend & Platform — Node.js, PostgreSQL, Supabase (Auth, Storage, RLS), tRPC/GraphQL, Vercel Edge.', {
  size: 9.2,
  leading: 13,
})
paragraph('Design — Figma variables, design systems, typography, art direction, prototyping.', {
  size: 9.2,
  leading: 13,
})

// ------------------------------------------------------------------ assemble PDF
const content = doc.ops.join('\n')
const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE.w} ${PAGE.h}] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>`,
  `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>',
  '<< /Title (Haider Albaba — Product Engineer) /Author (Haider Albaba) /Creator (voxa-portfolio) >>',
]

let pdf = '%PDF-1.4\n'
const offsets = []
objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'))
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`
})
const xrefStart = Buffer.byteLength(pdf, 'latin1')
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
for (const offset of offsets) pdf += `${String(offset).padStart(10, '0')} 00000 n \n`
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`

mkdirSync(resolve(root, 'public'), { recursive: true })
writeFileSync(resolve(root, 'public/resume.pdf'), Buffer.from(pdf, 'latin1'))
console.log(`Wrote public/resume.pdf (${Buffer.byteLength(pdf, 'latin1')} bytes)`)

/**
 * Deterministic SVG art generator.
 *
 * Every project image is a hand-tuned "scene" composed from a handful of layout
 * templates so the whole portfolio shares a single visual language while each
 * project keeps its own palette and content.
 *
 *   node scripts/generate-art.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = resolve(root, 'public/images/projects')
mkdirSync(outDir, { recursive: true })

const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const SERIF = "Georgia, 'Times New Roman', serif"
const MONO = "ui-monospace, 'SF Mono', Menlo, monospace"

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Shared defs: grain, soft blur, vignette. */
function commonDefs(id, { accent, deep, light }) {
  return `
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${deep}"/>
      <stop offset="0.55" stop-color="${accent}"/>
      <stop offset="1" stop-color="${light}"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="0.28" cy="0.18" r="0.85">
      <stop offset="0" stop-color="${light}" stop-opacity="0.95"/>
      <stop offset="0.45" stop-color="${accent}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${deep}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2-${id}" cx="0.85" cy="0.9" r="0.7">
      <stop offset="0" stop-color="${deep}" stop-opacity="0.9"/>
      <stop offset="1" stop-color="${deep}" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft-${id}" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="46"/>
    </filter>
    <filter id="blur-${id}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
    <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <filter id="shadow-${id}" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="26" stdDeviation="34" flood-color="${deep}" flood-opacity="0.5"/>
    </filter>
    <linearGradient id="glass-${id}" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.22"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.06"/>
    </linearGradient>
    <linearGradient id="sheen-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.5"/>
      <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.02"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.14"/>
    </linearGradient>
  </defs>`
}

const grain = (id, w, h, opacity = 0.16) =>
  `<rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity="${opacity}" style="mix-blend-mode:overlay"/>`

function header(id, { w, kicker, right, dark = true }) {
  const c = dark ? 'rgba(255,255,255,0.68)' : 'rgba(0,0,0,0.5)'
  return `<g font-family="${MONO}" font-size="15" letter-spacing="3.4" fill="${c}">
    <text x="72" y="86">${esc(kicker)}</text>
    <text x="${w - 72}" y="86" text-anchor="end">${esc(right)}</text>
  </g>`
}

/* ------------------------------------------------------------------ */
/* Templates                                                          */
/* ------------------------------------------------------------------ */

function sceneHero(id, spec) {
  const w = 1600
  const h = 1000
  const { deep, title, kicker, meta } = spec
  const rings = [0, 1, 2, 3, 4]
    .map((i) => {
      const r = 210 + i * 78
      return `<circle cx="1140" cy="470" r="${r}" fill="none" stroke="#fff" stroke-opacity="${0.26 - i * 0.038}" stroke-width="${2.4 - i * 0.25}"/>`
    })
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${commonDefs(id, spec)}
  <rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#glow2-${id})"/>
  <g filter="url(#soft-${id})" opacity="0.75">
    <ellipse cx="1180" cy="330" rx="380" ry="300" fill="#ffffff" fill-opacity="0.32"/>
    <ellipse cx="1420" cy="760" rx="300" ry="220" fill="${deep}" fill-opacity="0.5"/>
  </g>
  ${rings}
  <circle cx="1140" cy="470" r="118" fill="url(#glass-${id})" stroke="#ffffff" stroke-opacity="0.45"/>
  <circle cx="1140" cy="470" r="46" fill="#ffffff" fill-opacity="0.9"/>
  <g stroke="#ffffff" stroke-opacity="0.35">
    <line x1="72" y1="900" x2="${w - 72}" y2="900"/>
  </g>
  ${header(id, { w, kicker, right: meta })}
  <g fill="#ffffff">
    <text x="72" y="766" font-family="${SANS}" font-size="96" font-weight="600" letter-spacing="-4">${esc(title)}</text>
    <text x="72" y="840" font-family="${SERIF}" font-size="46" font-style="italic" fill-opacity="0.82">${esc(spec.subtitle)}</text>
  </g>
  <g font-family="${MONO}" font-size="14" letter-spacing="2.6" fill="rgba(255,255,255,0.62)">
    <text x="${w - 72}" y="850" text-anchor="end">${esc(spec.tag)}</text>
  </g>
  ${grain(id, w, h, 0.2)}
</svg>`
}

function sceneDashboard(id, spec) {
  const w = 1600
  const h = 1000
  const { accent, deep, light, title, kicker, meta, mono } = spec
  const dark = spec.surface !== 'light'
  const panel = dark ? '#101014' : '#ffffff'
  const panel2 = dark ? '#17171c' : '#fafafa'
  const fg = dark ? '#f4f4f7' : '#16161a'
  const muted = dark ? 'rgba(255,255,255,0.44)' : 'rgba(0,0,0,0.45)'
  const line = dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'

  const series = [42, 118, 96, 168, 140, 214, 188, 258, 236, 300, 286, 344]
  const chartW = 700
  const chartH = 210
  const max = 380
  const pts = series.map((v, i) => [
    96 + (i * chartW) / (series.length - 1),
    700 - (v / max) * chartH,
  ])
  const smooth = pts
    .map(([x, y], i, arr) => {
      if (i === 0) return `M ${x} ${y}`
      const [px, py] = arr[i - 1]
      const cx = (px + x) / 2
      return `C ${cx} ${py} ${cx} ${y} ${x} ${y}`
    })
    .join(' ')
  const area = `${smooth} L ${pts[pts.length - 1][0]} 700 L ${pts[0][0]} 700 Z`

  const kpis = [
    ['Active users', '128.4k', '+12.8%'],
    ['Conversion', '4.62%', '+0.9pt'],
    ['Avg. session', '6m 41s', '+24s'],
  ]
    .map(
      ([label, value, delta], i) => `
    <g transform="translate(${96 + i * 236} 250)">
      <rect width="212" height="128" rx="18" fill="${panel}" stroke="${line}"/>
      <text x="22" y="38" font-family="${SANS}" font-size="14" fill="${muted}">${label}</text>
      <text x="22" y="82" font-family="${SANS}" font-size="32" font-weight="600" letter-spacing="-1.4" fill="${fg}">${value}</text>
      <rect x="140" y="58" width="54" height="22" rx="11" fill="${accent}" fill-opacity="0.18"/>
      <text x="167" y="73" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${accent}">${delta}</text>
    </g>`,
    )
    .join('')

  const rows = Array.from({ length: 4 })
    .map(
      (_, i) => `
    <g transform="translate(1124 ${240 + i * 78})">
      <rect width="404" height="64" rx="14" fill="${panel}"/>
      <circle cx="34" cy="32" r="14" fill="${accent}" fill-opacity="${0.9 - i * 0.14}"/>
      <rect x="60" y="20" width="${150 - i * 14}" height="9" rx="4.5" fill="${fg}" fill-opacity="0.55"/>
      <rect x="60" y="38" width="${96 - i * 9}" height="7" rx="3.5" fill="${muted}" fill-opacity="0.5"/>
      <text x="380" y="37" text-anchor="end" font-family="${MONO}" font-size="12" fill="${muted}">${['98.2', '94.1', '88.7', '81.4'][i]}</text>
    </g>`,
    )
    .join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${commonDefs(id, spec)}
  <rect width="${w}" height="${h}" fill="${dark ? deep : '#ecebe8'}"/>
  <g opacity="${dark ? 0.85 : 0.55}" filter="url(#soft-${id})">
    <ellipse cx="200" cy="120" rx="420" ry="300" fill="${accent}" fill-opacity="0.32"/>
    <ellipse cx="1400" cy="860" rx="420" ry="340" fill="${light}" fill-opacity="0.28"/>
  </g>
  <rect x="48" y="48" width="${w - 96}" height="${h - 96}" rx="34" fill="${panel2}" stroke="${line}"/>
  <g transform="translate(48 48)">
    <rect width="${w - 96}" height="64" rx="34" fill="${panel}" opacity="0.6"/>
    <circle cx="34" cy="32" r="6" fill="${accent}"/>
    <text x="54" y="38" font-family="${SANS}" font-size="15" font-weight="600" fill="${fg}">${esc(title)}</text>
    <g font-family="${SANS}" font-size="13" fill="${muted}">
      <text x="270" y="38">Overview</text><text x="360" y="38">Funnels</text><text x="440" y="38">Cohorts</text>
    </g>
    <rect x="${w - 320}" y="14" width="220" height="36" rx="18" fill="${line}"/>
    <text x="${w - 210}" y="37" text-anchor="middle" font-family="${MONO}" font-size="11" fill="${muted}">LAST 30 DAYS</text>
    <line x1="0" y1="64" x2="${w - 96}" y2="64" stroke="${line}"/>
  </g>
  <g transform="translate(48 112)">
    <circle cx="34" cy="20" r="4" fill="${accent}"/>
    <text x="50" y="26" font-family="${MONO}" font-size="11" letter-spacing="2.4" fill="${muted}">${esc(mono ?? 'REAL-TIME OVERVIEW')}</text>
  </g>
  ${kpis}
  <g>
    <rect x="96" y="410" width="836" height="380" rx="22" fill="${panel}" stroke="${line}"/>
    <text x="128" y="454" font-family="${SANS}" font-size="15" fill="${muted}">Sessions by week</text>
    <text x="128" y="498" font-family="${SANS}" font-size="38" font-weight="600" letter-spacing="-1.8" fill="${fg}">2,481,092</text>
    <path d="${area}" fill="url(#glow-${id})" opacity="0.5"/>
    <path d="${area}" fill="${accent}" fill-opacity="0.16"/>
    <path d="${smooth}" fill="none" stroke="${accent}" stroke-width="3.5" stroke-linecap="round"/>
    ${pts
      .filter((_, i) => i % 3 === 0)
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${panel}" stroke="${accent}" stroke-width="3"/>`)
      .join('')}
    <line x1="96" y1="700" x2="932" y2="700" stroke="${line}"/>
    <g font-family="${MONO}" font-size="10" fill="${muted}" text-anchor="middle">
      ${['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        .map((m, i) => `<text x="${96 + (i * chartW) / 11}" y="728">${m}</text>`)
        .join('')}
    </g>
  </g>
  <g transform="translate(48 148)">
    <text x="1028" y="26" font-family="${MONO}" font-size="11" letter-spacing="2.4" fill="${muted}">TOP FLOWS</text>
  </g>
  ${rows}
  <g transform="translate(1124 570)">
    <rect width="404" height="220" rx="20" fill="${panel}" stroke="${line}"/>
    <text x="26" y="42" font-family="${SANS}" font-size="14" fill="${muted}">Retention</text>
    ${Array.from({ length: 5 })
      .map(
        (_, r) =>
          `<g>${Array.from({ length: 7 })
            .map((_, c) => {
              const v = Math.max(0.12, 1 - (r * 0.17 + c * 0.06))
              return `<rect x="${26 + c * 50}" y="${64 + r * 28}" width="42" height="22" rx="5" fill="${accent}" fill-opacity="${(v * 0.85).toFixed(2)}"/>`
            })
            .join('')}</g>`,
      )
      .join('')}
  </g>
  ${grain(id, w, h, 0.12)}
  <g font-family="${MONO}" font-size="12" letter-spacing="2.8" fill="${muted}">
    <text x="96" y="936">${esc(kicker)}</text>
    <text x="${w - 96}" y="936" text-anchor="end">${esc(meta)}</text>
  </g>
</svg>`
}

function sceneEditorial(id, spec) {
  const w = 1200
  const h = 1500
  const { accent, deep, title, kicker, meta } = spec
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${commonDefs(id, spec)}
  <rect width="${w}" height="${h}" fill="#f3f1ec"/>
  <g>
    <rect x="64" y="188" width="${w - 128}" height="560" fill="url(#bg-${id})"/>
    <g filter="url(#soft-${id})" opacity="0.8">
      <ellipse cx="330" cy="380" rx="240" ry="200" fill="#ffffff" fill-opacity="0.4"/>
      <ellipse cx="880" cy="640" rx="260" ry="220" fill="${deep}" fill-opacity="0.4"/>
    </g>
    <circle cx="600" cy="470" r="150" fill="none" stroke="#fff" stroke-opacity="0.35" stroke-width="2"/>
    <circle cx="600" cy="470" r="96" fill="#fff" fill-opacity="0.16"/>
    <path d="M420 640 L600 340 L780 640 Z" fill="#fff" fill-opacity="0.12" stroke="#fff" stroke-opacity="0.3"/>
    ${grain(id, w, 900, 0.14)}
  </g>
  <g font-family="${SANS}" fill="#16161a">
    <text x="64" y="92" font-family="${MONO}" font-size="14" letter-spacing="3.2" fill="rgba(0,0,0,0.55)">${esc(kicker)}</text>
    <text x="${w - 64}" y="92" text-anchor="end" font-family="${MONO}" font-size="14" letter-spacing="3.2" fill="rgba(0,0,0,0.55)">${esc(meta)}</text>
    <line x1="64" y1="120" x2="${w - 64}" y2="120" stroke="rgba(0,0,0,0.2)"/>
    <text x="64" y="838" font-family="${SERIF}" font-size="104" font-style="italic" letter-spacing="-3">${esc(title)}</text>
    <text x="64" y="892" font-size="19" fill="rgba(0,0,0,0.55)">${esc(spec.subtitle)}</text>
    <line x1="64" y1="940" x2="${w - 64}" y2="940" stroke="rgba(0,0,0,0.16)"/>
  </g>
  <g fill="rgba(0,0,0,0.22)">
    ${Array.from({ length: 16 })
      .map((_, i) => `<rect x="64" y="${980 + i * 26}" width="${i % 5 === 4 ? 380 : 470}" height="9" rx="4.5"/>`)
      .join('')}
  </g>
  <g fill="rgba(0,0,0,0.22)">
    ${Array.from({ length: 16 })
      .map((_, i) => `<rect x="${666} y="${980 + i * 26}" width="${i % 6 === 5 ? 300 : 470}" height="9" rx="4.5"/>`)
      .join('')}
  </g>
  <rect x="64" y="1420" width="240" height="14" rx="7" fill="${accent}"/>
  <text x="${w - 64}" y="1434" text-anchor="end" font-family="${MONO}" font-size="13" letter-spacing="3" fill="rgba(0,0,0,0.5)">${esc(spec.tag)}</text>
</svg>`
}

function sceneMobile(id, spec) {
  const w = 900
  const h = 1400
  // `deep` comes through commonDefs via spec, so only pull what is drawn here.
  const { accent, title, kicker, meta } = spec
  const px = 250
  const py = 210
  const pw = 400
  const ph = 900
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${commonDefs(id, spec)}
  <rect width="${w}" height="${h}" fill="url(#bg-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#glow-${id})" opacity="0.8"/>
  <g filter="url(#soft-${id})" opacity="0.7">
    <ellipse cx="${px + pw / 2}" cy="${py + 200}" rx="300" ry="260" fill="#fff" fill-opacity="0.3"/>
  </g>
  ${header(id, { w, kicker, right: meta })}
  <g filter="url(#shadow-${id})">
    <rect x="${px}" y="${py}" width="${pw}" height="${ph}" rx="52" fill="#0c0c0f" stroke="#ffffff" stroke-opacity="0.28"/>
    <rect x="${px + 12}" y="${py + 12}" width="${pw - 24}" height="${ph - 24}" rx="42" fill="#15151a"/>
    <rect x="${px + pw / 2 - 44}" y="${py + 26}" width="88" height="22" rx="11" fill="#000"/>
    <g transform="translate(${px + 40} ${py + 92})">
      <text font-family="${SANS}" font-size="15" font-weight="600" fill="#ffffff" fill-opacity="0.92">${esc(title)}</text>
      <text y="24" font-family="${MONO}" font-size="10" letter-spacing="2" fill="rgba(255,255,255,0.45)">TODAY · 09:41</text>
      <rect y="52" width="${pw - 80}" height="188" rx="24" fill="url(#bg-${id})"/>
      <g filter="url(#blur-${id})" opacity="0.55">
        <circle cx="60" cy="60" r="70" fill="#fff" fill-opacity="0.5"/>
      </g>
      <text y="216" font-family="${SERIF}" font-size="30" font-style="italic" fill="#fff" fill-opacity="0.95">${esc(spec.subtitle.split('·')[0].trim())}</text>
      <g transform="translate(0 268)" font-family="${SANS}" fill="#fff">
        <text font-size="13" fill-opacity="0.5">Balance</text>
        <text y="38" font-size="34" font-weight="600" letter-spacing="-1.4">$ 12,480.20</text>
      </g>
      <g transform="translate(0 350)">
        ${Array.from({ length: 7 })
          .map((_, i) => {
            const bh = [46, 78, 62, 104, 88, 128, 96][i]
            return `<rect x="${i * 42}" y="${130 - bh}" width="26" height="${bh}" rx="13" fill="${i === 5 ? '#fff' : '#fff'}" fill-opacity="${i === 5 ? 0.95 : 0.18}"/>`
          })
          .join('')}
        <line y1="134" x2="${pw - 80}" y2="134" stroke="#fff" stroke-opacity="0.12"/>
      </g>
      <g transform="translate(0 512)">
        ${['Deposit', 'Groceries', 'Invoice'].map((label, i) => `<g transform="translate(0 ${i * 62})">
          <rect width="${pw - 80}" height="50" rx="16" fill="#ffffff" fill-opacity="0.06"/>
          <circle cx="26" cy="25" r="13" fill="${accent}" fill-opacity="${0.85 - i * 0.2}"/>
          <text x="50" y="30" font-family="${SANS}" font-size="13" fill="#fff" fill-opacity="0.8">${label}</text>
          <text x="${pw - 106}" y="30" text-anchor="end" font-family="${MONO}" font-size="12" fill="#fff" fill-opacity="0.5">${['+2.4k', '-86', '+1.1k'][i]}</text>
        </g>`).join('')}
      </g>
    </g>
    <rect x="${px + 46}" y="${py + ph - 46}" width="${pw - 92}" height="34" rx="17" fill="#ffffff" fill-opacity="0.1"/>
  </g>
  <text x="${w / 2}" y="${h - 78}" text-anchor="middle" font-family="${MONO}" font-size="13" letter-spacing="3.4" fill="#fff" fill-opacity="0.62">${esc(spec.tag)}</text>
  ${grain(id, w, h, 0.16)}
</svg>`
}

function sceneGrid(id, spec) {
  const w = 1600
  const h = 1000
  const { accent, deep, light, title, kicker, meta } = spec
  const cards = [0, 1, 2, 3, 4, 5]
    .map((i) => {
      const col = i % 3
      const row = Math.floor(i / 3)
      const x = 96 + col * 484
      const y = 300 + row * 320
      const tint = [0.85, 0.6, 0.45, 0.7, 0.5, 0.9][i]
      return `<g transform="translate(${x} ${y})">
      <rect width="440" height="280" rx="26" fill="#ffffff" fill-opacity="0.07" stroke="#ffffff" stroke-opacity="0.16"/>
      <rect x="24" y="24" width="392" height="164" rx="18" fill="url(#bg-${id})" fill-opacity="${tint}"/>
      <g opacity="0.65"><circle cx="330" cy="60" r="54" fill="#fff" fill-opacity="0.45" filter="url(#blur-${id})"/></g>
      <rect x="24" y="212" width="${180 - i * 12}" height="12" rx="6" fill="#fff" fill-opacity="0.62"/>
      <rect x="24" y="236" width="${120 - i * 8}" height="9" rx="4.5" fill="#fff" fill-opacity="0.28"/>
      <text x="416" y="246" text-anchor="end" font-family="${MONO}" font-size="12" fill="#fff" fill-opacity="0.5">0${i + 1}</text>
    </g>`
    })
    .join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${commonDefs(id, spec)}
  <rect width="${w}" height="${h}" fill="${deep}"/>
  <rect width="${w}" height="${h}" fill="url(#glow-${id})" opacity="0.7"/>
  <g filter="url(#soft-${id})" opacity="0.5">
    <ellipse cx="1200" cy="180" rx="380" ry="260" fill="${accent}" fill-opacity="0.7"/>
    <ellipse cx="220" cy="880" rx="360" ry="240" fill="${light}" fill-opacity="0.4"/>
  </g>
  ${header(id, { w, kicker, right: meta })}
  <text x="96" y="212" font-family="${SANS}" font-size="64" font-weight="600" letter-spacing="-3" fill="#fff">${esc(title)}</text>
  <text x="${w - 96}" y="206" text-anchor="end" font-family="${SERIF}" font-size="34" font-style="italic" fill="#fff" fill-opacity="0.7">${esc(spec.subtitle)}</text>
  ${cards}
  ${grain(id, w, h, 0.18)}
</svg>`
}

function scenePoster(id, spec) {
  const w = 1400
  const h = 1000
  const { accent, deep, light, title, kicker, meta } = spec
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${commonDefs(id, spec)}
  <rect width="${w}" height="${h}" fill="${deep}"/>
  <g filter="url(#soft-${id})" opacity="0.9">
    <ellipse cx="1080" cy="300" rx="420" ry="360" fill="${accent}" fill-opacity="0.85"/>
    <ellipse cx="1180" cy="760" rx="320" ry="260" fill="${light}" fill-opacity="0.65"/>
  </g>
  <g stroke="#fff" stroke-opacity="0.22" fill="none">
    ${Array.from({ length: 9 })
      .map((_, i) => `<circle cx="1080" cy="520" r="${120 + i * 62}"/>`)
      .join('')}
  </g>
  <rect x="0" y="0" width="${w}" height="${h}" fill="url(#glow2-${id})" opacity="0.55"/>
  ${header(id, { w, kicker, right: meta })}
  <g fill="#fff">
    <text x="88" y="470" font-family="${SERIF}" font-size="180" font-style="italic" letter-spacing="-8">${esc(title)}</text>
    <text x="94" y="540" font-family="${SANS}" font-size="26" letter-spacing="10" fill-opacity="0.72">${esc(spec.subtitle.toUpperCase())}</text>
  </g>
  <line x1="88" y1="612" x2="${w - 88}" y2="612" stroke="#fff" stroke-opacity="0.28"/>
  <g font-family="${MONO}" font-size="14" letter-spacing="2.6" fill="#fff" fill-opacity="0.66">
    <text x="88" y="656">${esc(spec.tag)}</text>
    <text x="${w - 88}" y="656" text-anchor="end">VOL. 04 — 2026</text>
    <text x="88" y="916">ART DIRECTION · MOTION · FILM</text>
    <text x="${w - 88}" y="916" text-anchor="end">${esc(spec.meta)}</text>
  </g>
  ${grain(id, w, h, 0.22)}
</svg>`
}

/* ------------------------------------------------------------------ */
/* Specs                                                              */
/* ------------------------------------------------------------------ */

const palettes = {
  aperture: { accent: '#c9663f', deep: '#2a1510', light: '#f0b79b' },
  saffron: { accent: '#c48a2c', deep: '#1f1a08', light: '#f3d79a' },
  orbit: { accent: '#4c7d92', deep: '#0b1a20', light: '#a8d3e0' },
  manuscript: { accent: '#8c6fa8', deep: '#191226', light: '#d6c6e6' },
  atlas: { accent: '#6f8f5e', deep: '#111a10', light: '#c4ddb4' },
  halo: { accent: '#b0453f', deep: '#1a0c0d', light: '#f0b3ae' },
}

const scenes = {
  /* Aperture — brand identity for a photography studio */
  'aperture-cover': ['hero', { ...palettes.aperture, title: 'Aperture', subtitle: 'A studio for the patient gaze', kicker: 'APERTURE STUDIO', meta: 'BRAND · 2026', tag: 'IDENTITY SYSTEM / 01' }],
  'aperture-01': ['editorial', { ...palettes.aperture, title: 'Light, held.', subtitle: 'Type specimen — Instrument Serif & Inter Tight', kicker: 'TYPE SPECIMEN', meta: 'VOL 02', tag: 'EDITORIAL GRID', surface: 'light' }],
  'aperture-02': ['grid', { ...palettes.aperture, title: 'The Archive', subtitle: 'Selected frames', kicker: 'APERTURE / GALLERY', meta: 'GRID SYSTEM', tag: 'RESPONSIVE GALLERY' }],
  'aperture-03': ['mobile', { ...palettes.aperture, title: 'Aperture', subtitle: 'Bookings · private viewings', kicker: 'MOBILE', meta: 'iOS · ANDROID', tag: 'BOOKING FLOW' }],

  /* Saffron — headless commerce */
  'saffron-cover': ['hero', { ...palettes.saffron, title: 'Saffron & Co', subtitle: 'Slow spice, modern shelf', kicker: 'SAFFRON & CO', meta: 'COMMERCE · 2025', tag: 'STOREFRONT / 02' }],
  'saffron-01': ['grid', { ...palettes.saffron, title: 'The Pantry', subtitle: 'Curated shelves', kicker: 'PLP / COLLECTION', meta: '240 SKUS', tag: 'PRODUCT GRID' }],
  'saffron-02': ['dashboard', { ...palettes.saffron, title: 'Saffron Ops', subtitle: '', kicker: 'MERCHANT DASHBOARD', meta: 'LIVE', tag: 'ANALYTICS', mono: 'ORDER VELOCITY', surface: 'light' }],
  'saffron-03': ['mobile', { ...palettes.saffron, title: 'Checkout', subtitle: 'One-tap · Apple Pay first', kicker: 'CHECKOUT', meta: '3 STEPS', tag: 'MOBILE CHECKOUT' }],

  /* Orbit — analytics product */
  'orbit-cover': ['dashboard', { ...palettes.orbit, title: 'Orbit', subtitle: '', kicker: 'ORBIT ANALYTICS', meta: 'PRODUCT · 2026', tag: 'PRODUCT UI', mono: 'REAL-TIME OVERVIEW' }],
  'orbit-01': ['hero', { ...palettes.orbit, title: 'Orbit', subtitle: 'Signal over noise', kicker: 'ORBIT / MARKETING', meta: 'WEB', tag: 'LAUNCH SITE' }],
  'orbit-02': ['grid', { ...palettes.orbit, title: 'Modules', subtitle: 'Composable blocks', kicker: 'DESIGN SYSTEM', meta: '64 COMPONENTS', tag: 'SYSTEM LIBRARY' }],
  'orbit-03': ['dashboard', { ...palettes.orbit, title: 'Cohorts', subtitle: '', kicker: 'ORBIT / RETENTION', meta: 'Q4', tag: 'RETENTION VIEW', mono: 'COHORT MATRIX', surface: 'light' }],

  /* Manuscript — editorial platform */
  'manuscript-cover': ['editorial', { ...palettes.manuscript, title: 'Manuscript', subtitle: 'A quarterly on slow technology', kicker: 'MANUSCRIPT QUARTERLY', meta: 'ISSUE 04', tag: 'ISSUE FOUR', surface: 'light' }],
  'manuscript-01': ['hero', { ...palettes.manuscript, title: 'Issue 04', subtitle: 'On attention and repair', kicker: 'MANUSCRIPT', meta: 'EDITORIAL', tag: 'COVER STORY' }],
  'manuscript-02': ['poster', { ...palettes.manuscript, title: 'Slow', subtitle: 'Technology', kicker: 'CAMPAIGN', meta: 'OOH · PRINT', tag: 'POSTER SERIES' }],
  'manuscript-03': ['mobile', { ...palettes.manuscript, title: 'Reader', subtitle: 'Longform · offline first', kicker: 'READER APP', meta: 'PWA', tag: 'READING MODE' }],

  /* Atlas — design system + docs */
  'atlas-cover': ['grid', { ...palettes.atlas, title: 'Atlas', subtitle: 'A system for 240 screens', kicker: 'ATLAS DESIGN SYSTEM', meta: 'PRODUCT · 2024', tag: 'SYSTEM / 05' }],
  'atlas-01': ['dashboard', { ...palettes.atlas, title: 'Atlas Docs', subtitle: '', kicker: 'DOCUMENTATION', meta: 'v3.2', tag: 'DOCS PORTAL', mono: 'ADOPTION · 94%', surface: 'light' }],
  'atlas-02': ['editorial', { ...palettes.atlas, title: 'Principles', subtitle: 'Clarity before cleverness', kicker: 'ATLAS / FOUNDATIONS', meta: '12 RULES', tag: 'FOUNDATIONS', surface: 'light' }],
  'atlas-03': ['hero', { ...palettes.atlas, title: 'Tokens', subtitle: 'One source of truth', kicker: 'TOKEN PIPELINE', meta: 'FIGMA → CODE', tag: 'TOKEN PIPELINE' }],

  /* Halo — motion identity for a film festival */
  'halo-cover': ['poster', { ...palettes.halo, title: 'Halo', subtitle: 'Film festival', kicker: 'HALO FILM FESTIVAL', meta: 'MOTION · 2025', tag: 'MOTION IDENTITY' }],
  'halo-01': ['hero', { ...palettes.halo, title: 'Halo', subtitle: 'A festival of light', kicker: 'HALO / 2025', meta: 'TICKETS', tag: 'FESTIVAL SITE' }],
  'halo-02': ['editorial', { ...palettes.halo, title: 'Programme', subtitle: 'Nine nights, forty-one films', kicker: 'PROGRAMME', meta: 'PDF · WEB', tag: 'PROGRAMME BOOK', surface: 'light' }],
  'halo-03': ['grid', { ...palettes.halo, title: 'Screenings', subtitle: 'Nine nights', kicker: 'HALO / SCHEDULE', meta: 'LIVE', tag: 'SCHEDULE UI' }],
}

const templates = {
  hero: sceneHero,
  dashboard: sceneDashboard,
  editorial: sceneEditorial,
  mobile: sceneMobile,
  grid: sceneGrid,
  poster: scenePoster,
}

for (const [name, [template, spec]] of Object.entries(scenes)) {
  const svg = templates[template](name, spec)
  if (svg.includes('NaN') || svg.includes('undefined')) throw new Error(`Bad art: ${name}`)
  writeFileSync(resolve(outDir, `${name}.svg`), svg)
}

/* Editorial monogram portrait for the hero. */
mkdirSync(resolve(root, 'public/images'), { recursive: true })
writeFileSync(
  resolve(root, 'public/images/avatar.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640" role="img">
  <defs>
    <linearGradient id="ab" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#27272d"/><stop offset="0.55" stop-color="#15151a"/><stop offset="1" stop-color="#08080a"/>
    </linearGradient>
    <radialGradient id="ag" cx="0.3" cy="0.16" r="0.9">
      <stop offset="0" stop-color="#c9663f" stop-opacity="0.85"/>
      <stop offset="0.5" stop-color="#a44e2c" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#08080a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="as" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f7d3bd"/><stop offset="0.6" stop-color="#c9663f"/><stop offset="1" stop-color="#6d3020"/>
    </linearGradient>
    <filter id="an"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter>
    <clipPath id="ac"><rect width="640" height="640" rx="96"/></clipPath>
  </defs>
  <g clip-path="url(#ac)">
    <rect width="640" height="640" fill="url(#ab)"/>
    <rect width="640" height="640" fill="url(#ag)"/>
    <g stroke="#ffffff" stroke-opacity="0.09" fill="none">
      <circle cx="320" cy="300" r="196"/><circle cx="320" cy="300" r="252"/>
    </g>
    <path d="M320 168c74 0 126 56 126 138 0 84-56 150-126 150s-126-66-126-150c0-82 52-138 126-138Z" fill="url(#as)"/>
    <path d="M194 306c0-92 62-160 152-160 62 0 112 34 134 92-24-18-54-28-92-28-76 0-124 46-136 122-4 26-20 40-40 40-12 0-18-30-18-66Z" fill="#141418"/>
    <g fill="#0f0f12" fill-opacity="0.9">
      <ellipse cx="276" cy="300" rx="26" ry="12" transform="rotate(-6 276 300)"/>
      <ellipse cx="372" cy="300" rx="26" ry="12" transform="rotate(6 372 300)"/>
    </g>
    <path d="M282 372c24 16 52 16 76 0" stroke="#0f0f12" stroke-opacity="0.75" stroke-width="7" stroke-linecap="round" fill="none"/>
    <path d="M150 640c14-92 74-150 170-150s158 58 172 150Z" fill="#1b1b21"/>
    <path d="M150 640c14-92 74-150 170-150s158 58 172 150Z" fill="url(#as)" fill-opacity="0.14"/>
    <rect width="640" height="640" filter="url(#an)" opacity="0.13" style="mix-blend-mode:overlay"/>
    <rect x="0.5" y="0.5" width="639" height="639" rx="96" fill="none" stroke="#ffffff" stroke-opacity="0.16"/>
  </g>
</svg>`,
)

console.log(`Wrote ${Object.keys(scenes).length} project scenes + avatar`)

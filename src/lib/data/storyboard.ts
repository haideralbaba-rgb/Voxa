/**
 * Storyboard data.
 *
 * One film, ten self-contained scenes. They are designed to be read in order
 * and, crucially, to *rhyme*: scene 2 reuses scene 1's hero card, scene 5
 * pulls the same card into a light field, scene 8 bends the same ribbon.
 * Continuity is what turns a list of shots into a sequence.
 */
import type { SceneKey, StoryboardScene } from '@/lib/types'


export const storyboardScenes: StoryboardScene[] = [
  {
    id: 'title',
    index: '01',
    kind: 'Title card',
    title: 'One card, held.',
    note: [
      'We open on a single surface, lit as if it were physical.',
      'Everything that follows comes out of this object.',
    ],
    mechanic: 'Border Glow',
    credit: 'HorizonX',
    spec: ['Pointer-tracked rim light', '1 card', '4s hold'],
    duration: 4,
    backdrop: 'ink',
    accent: '#e08a5f',
  },
  {
    id: 'grid',
    index: '02',
    kind: 'Chapter I',
    title: 'The room opens.',
    note: [
      'The hero card steps back and a tile grid assembles behind it.',
      'Seams catch the light before the panels do.',
    ],
    mechanic: 'Glow Grid',
    credit: 'HorizonX',
    spec: ['Seam light', 'Pointer tilt', '12 tiles'],
    duration: 4,
    backdrop: 'ink',
    accent: '#e08a5f',
  },
  {
    id: 'tunnel',
    index: '03',
    kind: 'Chapter II',
    title: 'Into the corridor.',
    note: [
      'We fall through the grid and the cards start coming toward the lens.',
      'A spectral fringe on exit tells you the frame has speed.',
    ],
    mechanic: 'Tunnel Fold Slider',
    credit: 'HorizonX',
    spec: ['WebGL corridor', 'Chromatic fringe', 'Depth of field'],
    duration: 4,
    backdrop: 'ink',
    accent: '#e08a5f',
  },
  {
    id: 'bloom',
    index: '04',
    kind: 'Chapter III',
    title: 'The centre refuses.',
    note: [
      'Instead of arriving, the stack blooms from the middle of the frame.',
      'Six plates, one axis, no cuts — the tunnel reverses at the pivot.',
    ],
    mechanic: 'Entrance Bloom',
    credit: 'HorizonX',
    spec: ['Radial bloom', 'Plate stack', 'Orbital settle'],
    duration: 4,
    backdrop: 'ink',
    accent: '#e08a5f',
  },
  {
    id: 'orbit',
    index: '05',
    kind: 'Chapter IV',
    title: 'Cards leave the floor.',
    note: [
      'The stack lifts into a ring and keeps turning as you scroll.',
      'Here the page stops pretending to be a page.',
    ],
    mechanic: 'Spiral Flux + Pulse Orbit',
    credit: 'HorizonX',
    spec: ['Scroll-driven orbit', 'Six frames', 'Soft bounce'],
    duration: 4,
    backdrop: 'gradient',
    accent: '#e08a5f',
  },
  {
    id: 'wave',
    index: '06',
    kind: 'Chapter V',
    title: 'The ribbon breaks.',
    note: [
      'The ring unwinds into a ribbon that bends through the frame.',
      'Scroll is the hand pulling it; drag is the same hand letting go.',
    ],
    mechanic: 'Reel Flux',
    credit: 'HorizonX',
    spec: ['Elastic ribbon', 'Drag + scroll', 'Settle to flat'],
    duration: 4,
    backdrop: 'gradient',
    accent: '#e08a5f',
  },
  {
    id: 'axiom',
    index: '07',
    kind: 'Chapter VI',
    title: 'Contact.',
    note: [
      'One assistant bar, one orb, one sentence streaming in.',
      'The human part of the product finally has a surface.',
    ],
    mechanic: 'Assistant Pill',
    credit: 'HorizonX',
    spec: ['Streaming text', 'Voice state', 'Prompt field'],
    duration: 4,
    backdrop: 'ink',
    accent: '#7dd3fc',
  },
  {
    id: 'glyphs',
    index: '08',
    kind: 'Chapter VII',
    title: 'The data becomes a body.',
    note: [
      'Every metric on this site now has a planet it can be turned into.',
      'Glyphs, wireframes, foam — the archive goes 3D.',
    ],
    mechanic: 'Glyph Sphere / Gravity Well / Black Hole',
    credit: 'HorizonX',
    spec: ['Glyph globe', 'Bent wireframe', 'Volumetric gas'],
    duration: 5,
    backdrop: 'ink',
    accent: '#a78bfa',
  },
  {
    id: 'gravity',
    index: '09',
    kind: 'Chapter VIII',
    title: 'Everything has mass.',
    note: [
      'The wireframe bends under a pointer that now behaves like a hand.',
      'One click and the fabric answers.',
    ],
    mechanic: 'Gravity Well + Glass Ball',
    credit: 'HorizonX',
    spec: ['Click ripple', 'Fabric bend', 'Shard scatter'],
    duration: 5,
    backdrop: 'ink',
    accent: '#a78bfa',
  },
  {
    id: 'resolution',
    index: '10',
    kind: 'End card',
    title: 'Back to the card.',
    note: [
      'We land where we started, now with the light field behind it.',
      'The film closes on the same object it opened with.',
    ],
    mechanic: 'Chromatic Orb + Assistant Pill',
    credit: 'HorizonX',
    spec: ['Loop-safe end card', 'Shared element', '4s hold'],
    duration: 4,
    backdrop: 'gradient',
    accent: '#e08a5f',
  },
]

export const storyboardStats = [
  { label: 'Scenes', value: '10' },
  { label: 'Runtime', value: '42s' },
  { label: 'Engine', value: 'CSS 3D' },
  { label: 'Catalogue', value: '303 tools' },
]

/** Scene stills. Local SVG plates keep the film dependency-free. */
export const sceneStills: Record<SceneKey, string> = {
  title: '/images/story/still-title.svg',
  grid: '/images/story/still-grid.svg',
  tunnel: '/images/story/still-tunnel.svg',
  bloom: '/images/story/still-bloom.svg',
  orbit: '/images/story/still-orbit.svg',
  wave: '/images/story/still-wave.svg',
  axiom: '/images/story/still-axiom.svg',
  glyphs: '/images/story/still-glyphs.svg',
  gravity: '/images/story/still-gravity.svg',
  resolution: '/images/story/still-resolution.svg',
}

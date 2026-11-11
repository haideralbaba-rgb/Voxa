/**
 * Tool catalogue snapshot.
 *
 * Harvested from the HorizonX library index (tools, shaders, sounds, 3D and
 * icon sets) as design references — not as downloads. Each entry records the
 * technique it demonstrates and how this site answers it, which is what makes
 * the shelf a process document instead of a link dump.
 */

export type ToolKind = 'tool' | 'shader' | 'sound' | 'model' | 'icons' | 'template'

export interface ToolEntry {
  id: string
  name: string
  kind: ToolKind
  /** The technique, in the catalogue's own words. */
  technique: string
  /** What this site took from it, in mine. */
  borrowed: string
  href: string
}

export const toolEntries: ToolEntry[] = [
  {
    id: 'glow-grid',
    name: 'Glow Grid',
    kind: 'tool',
    technique: 'Dark tile grid lit from behind, light escaping through the seams.',
    borrowed: 'Scene 02 of the storyboard: the grid assembles out of the hero card, seams first.',
    href: 'https://horizonx.so/tools/glow-grid',
  },
  {
    id: 'border-glow',
    name: 'Border Glow',
    kind: 'tool',
    technique: 'A lamp on the card outline that slides to the nearest point of the pointer.',
    borrowed: 'Project cards track the pointer along their rim before the tilt engages.',
    href: 'https://horizonx.so/tools/border-glow',
  },
  {
    id: 'tunnel-fold',
    name: 'Tunnel Fold Slider',
    kind: 'tool',
    technique: 'Cards grow inside a tunnel, then smear into streaks with a spectral fringe.',
    borrowed: 'Scene 03’s corridor — the same frames, driven by scroll instead of drag.',
    href: 'https://horizonx.so/tools/tunnel-fold-slider',
  },
  {
    id: 'entrance-bloom',
    name: 'Entrance Bloom',
    kind: 'tool',
    technique: 'An image stack blooms from the centre and unwinds into an orbit.',
    borrowed: 'Scene 04: the pivot where the corridor reverses into plates.',
    href: 'https://horizonx.so/tools/entrance-bloom',
  },
  {
    id: 'spiral-flux',
    name: 'Spiral Flux',
    kind: 'tool',
    technique: 'Photos ride a turning spiral and pick up a colour rim at the edges.',
    borrowed: 'Scene 05’s ring — the plates leave the floor and keep turning with the reader.',
    href: 'https://horizonx.so/tools/spiral-flux',
  },
  {
    id: 'reel-flux',
    name: 'Reel Flux',
    kind: 'tool',
    technique: 'An endless ribbon that bends into a wave under drag or scroll, then settles flat.',
    borrowed: 'Scene 06, and the gallery marquee on the contact section.',
    href: 'https://horizonx.so/tools/reel-flux',
  },
  {
    id: 'assistant-pill',
    name: 'Assistant Pill',
    kind: 'tool',
    technique: 'A voice/chat bar that fills the screen, answers streaming above a live orb.',
    borrowed: 'Scene 07 and the command palette: the human surface of the product.',
    href: 'https://horizonx.so/tools/assistant-pill',
  },
  {
    id: 'gravity-well',
    name: 'Gravity Well',
    kind: 'tool',
    technique: 'A wireframe funnel; the pointer bends the fabric and a click sends a ripple.',
    borrowed: 'Scene 09 — and the hero’s cursor light, which bends the same way.',
    href: 'https://horizonx.so/tools/gravity-well',
  },
  {
    id: 'glyph-sphere',
    name: 'Glyph Sphere',
    kind: 'tool',
    technique: 'A globe of flickering glyphs with continuous rotation.',
    borrowed: 'Scene 08, rebuilt as the point field in the work-grid backdrop.',
    href: 'https://horizonx.so/tools/glyph-sphere',
  },
  {
    id: 'halo-drift',
    name: 'Halo Drift',
    kind: 'shader',
    technique: 'A soft halo of glass light drifting across the canvas in a six-second loop.',
    borrowed: 'The ambient shader rig behind the hero and the end card, three fields deep.',
    href: 'https://horizonx.so/shaders/halo-drift',
  },
  {
    id: 'iridescent-flow',
    name: 'Iridescent Flow',
    kind: 'shader',
    technique: 'Liquid-metal folds with silver crests and peach/blue reflections.',
    borrowed: 'The gallery’s light response and the project card specular.',
    href: 'https://horizonx.so/shaders/iridescent-flow',
  },
  {
    id: 'silk-current',
    name: 'Silk Current',
    kind: 'shader',
    technique: 'Copper and blue filaments flowing across dark folds.',
    borrowed: 'Contact section backdrop — copper filaments, low and slow.',
    href: 'https://horizonx.so/shaders/silk-current',
  },
  {
    id: 'topographic-flow',
    name: 'Topographic Flow',
    kind: 'shader',
    technique: 'Fine silver contour lines drifting over dark terrain.',
    borrowed: 'The storyboard end card’s contour field, used as a depth cue.',
    href: 'https://horizonx.so/shaders/topographic-flow',
  },
  {
    id: 'soft-click',
    name: 'Soft Click (97ms)',
    kind: 'sound',
    technique: 'A short, soft click for buttons and list rows.',
    borrowed: 'Synthesised in `src/lib/audio.ts` as the primary UI click.',
    href: 'https://horizonx.so/explore/soft-click-ui-sound',
  },
  {
    id: 'hover-blip',
    name: 'Hover Blip (0.2s)',
    kind: 'sound',
    technique: 'A quiet blip for hover and focus states.',
    borrowed: 'The nav and the project rail: feedback you feel more than hear.',
    href: 'https://horizonx.so/explore/hover-blip-ui-sound',
  },
  {
    id: 'switch-sweep',
    name: 'Switch Sweep (0.6s)',
    kind: 'sound',
    technique: 'A sweeping switch for mode changes.',
    borrowed: 'The theme and sound toggles — the mode change announces itself.',
    href: 'https://horizonx.so/explore/switch-sweep-ui-sound',
  },
  {
    id: 'success-chime',
    name: 'Success Chime (0.5s)',
    kind: 'sound',
    technique: 'A rising chime for completed actions.',
    borrowed: 'Contact form success state, replacing a silent state change.',
    href: 'https://horizonx.so/explore/success-chime-ui-sound',
  },
  {
    id: 'camera',
    name: 'Camera',
    kind: 'model',
    technique: 'Real-world-scale glTF with PBR leather, metal and glass.',
    borrowed: 'Aperture Studio’s case study: the object that holds the whole story.',
    href: 'https://horizonx.so/explore/camera-01',
  },
  {
    id: 'marble-bust',
    name: 'Marble Bust',
    kind: 'model',
    technique: 'Stone bust at real scale, 2K PBR textures.',
    borrowed: 'Manuscript Quarterly — why an editorial archive needs one hero object.',
    href: 'https://horizonx.so/explore/marble-bust-01',
  },
  {
    id: 'lantern',
    name: 'Lantern',
    kind: 'model',
    technique: 'Brass and glass prop, twelve centimetres wide.',
    borrowed: 'Halo Festival’s night scenes: one warm source per frame.',
    href: 'https://horizonx.so/explore/lantern-01',
  },
  {
    id: 'lucide',
    name: 'Lucide (2,029 icons)',
    kind: 'icons',
    technique: 'Outline icons on a 24px grid with a sprite sheet.',
    borrowed: 'The site’s entire icon language, already in use via lucide-react.',
    href: 'https://horizonx.so/explore/lucide-icons',
  },
  {
    id: 'phosphor',
    name: 'Phosphor (1,433 icons)',
    kind: 'icons',
    technique: 'Six weights from thin to duotone.',
    borrowed: 'The duotone idea behind the skills meter: one shape, two states.',
    href: 'https://horizonx.so/explore/phosphor-icons',
  },
  {
    id: 'kurage',
    name: 'Kurage Dashboard',
    kind: 'template',
    technique: 'Dark AI dashboard, ASCII jellyfish, glass composer, ⌘K palette.',
    borrowed: 'The ⌘K command palette, down to the glass composer.',
    href: 'https://horizonx.so/explore/kurage-dashboard',
  },
  {
    id: 'yohaku',
    name: 'Yohaku Tunnel Hero',
    kind: 'template',
    technique: 'One screen: headline, two CTAs, a WebGL picture tunnel that folds.',
    borrowed: 'The storyboard’s structure: a single screen that keeps moving under you.',
    href: 'https://horizonx.so/explore/yohaku-tunnel-hero',
  },
  {
    id: 'alder-stone',
    name: 'Alder & Stone',
    kind: 'template',
    technique: 'Scroll-driven one-pager opening on a point-scan city.',
    borrowed: 'Proof that a portfolio can open on an object instead of a headline.',
    href: 'https://horizonx.so/explore/alder-stone',
  },
]

export const toolKinds: Array<{ id: ToolKind | 'all'; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'tool', label: 'Tools' },
  { id: 'shader', label: 'Shaders' },
  { id: 'sound', label: 'Sounds' },
  { id: 'model', label: '3D' },
  { id: 'icons', label: 'Icons' },
  { id: 'template', label: 'Sites' },
]

import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { Project } from '../types'

interface SmartGridProps { projects: Project[]; categories: string[] }

type VisibilityCallback = (visible: boolean) => void
const visibilityCallbacks = new Map<Element, VisibilityCallback>()
let sharedObserver: IntersectionObserver | null = null

function getSharedObserver() {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return null
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) visibilityCallbacks.get(entry.target)?.(entry.isIntersecting)
    }, { rootMargin: '240px 0px' })
  }
  return sharedObserver
}

function ProjectTile({ project }: { project: Project }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [inView, setInView] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const media = project.media[0]

  useEffect(() => {
    const video = videoRef.current
    if (!video || media?.kind !== 'video') return
    const observer = getSharedObserver()
    if (!observer) return
    visibilityCallbacks.set(video, setInView)
    observer.observe(video)
    return () => {
      visibilityCallbacks.delete(video)
      observer.unobserve(video)
    }
  }, [media?.kind])

  useEffect(() => {
    const video = videoRef.current
    if (!video || media?.kind !== 'video') return
    if (!inView) { video.pause(); video.currentTime = 0 }
  }, [inView, media?.kind])

  if (!media) return null
  const poster = media.posterUrl ?? media.thumbnailUrl ?? undefined
  const src = media.publicUrl ?? undefined
  const aspect = media.aspectRatio ? Math.min(Math.max(media.aspectRatio, 0.55), 1.8) : 1

  return (
    <motion.article layout initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }} className="group relative overflow-hidden rounded-[2px] bg-white/[0.03]" style={{ aspectRatio: aspect }}>
      <a href={`/project/${project.slug}`} className="block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-white/70">
        {media.kind === 'video' && src ? (
          <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]" poster={poster} muted playsInline preload="none" loop aria-label={project.title}
            onPointerEnter={(event) => { if (window.matchMedia('(hover: hover)').matches && inView) void event.currentTarget.play().catch(() => undefined) }}
            onPointerLeave={(event) => { event.currentTarget.pause(); event.currentTarget.currentTime = 0 }}>
            <source src={src} type={media.mimeType} />
          </video>
        ) : (
          <img src={media.thumbnailUrl ?? media.publicUrl ?? ''} alt={project.title} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 opacity-0 transition duration-500 group-hover:opacity-100">
          <div className="text-[10px] uppercase tracking-[0.24em] text-white/55">{project.categoryName ?? 'Selected work'}</div>
          <h3 className="mt-1 text-lg font-medium tracking-tight text-white">{project.title}</h3>
        </div>
      </a>
    </motion.article>
  )
}

export function SmartGrid({ projects, categories }: SmartGridProps) {
  const [active, setActive] = useState('All')
  const filtered = useMemo(() => active === 'All' ? projects : projects.filter((project) => project.categoryName === active), [active, projects])
  const filters = ['All', ...categories]
  return (
    <section aria-label="Selected work" className="mt-12">
      <div className="mb-7 flex flex-wrap items-center gap-2 border-y border-white/10 py-4">
        {filters.map((item) => <button key={item} type="button" aria-pressed={active === item} onClick={() => setActive(item)} className={`rounded-full px-4 py-2 text-xs tracking-[0.12em] transition ${active === item ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}>{item}</button>)}
      </div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((project) => <div key={project.id} className="mb-4 break-inside-avoid"><ProjectTile project={project} /></div>)}
        </AnimatePresence>
      </div>
    </section>
  )
}

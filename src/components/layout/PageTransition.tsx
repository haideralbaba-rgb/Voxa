'use client'

import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, type ReactNode } from 'react'
import { DURATION, EASE } from '@/lib/motion'

/**
 * Route-level entrance: each new page fades and lifts a touch as it mounts.
 *
 * Deliberately *not* wrapped in AnimatePresence — in the App Router the old
 * tree is already gone by the time the new one renders, so an exit animation
 * would only delay navigation. Keying on the pathname is enough to replay the
 * entrance, and it never blocks the first paint of the new page.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const previous = useRef(pathname)

  useEffect(() => {
    previous.current = pathname
  }, [pathname])

  if (reduced) return <>{children}</>

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.base, ease: EASE.out }}
    >
      {children}
    </motion.div>
  )
}

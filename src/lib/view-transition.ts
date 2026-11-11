/**
 * Thin, dependency-free wrapper around the browser View Transitions API.
 *
 * Used only where it beats a component-level animation: navigating between the
 * home grid and a `/work/[slug]` document. Elements that opt into the same
 * `view-transition-name` on both sides morph geometry for free, and page
 * content crossfades — no measurement, no layout thrash.
 *
 * Everything degrades to an immediate update when the API is missing, the user
 * prefers reduced motion, or the class of transition is unsupported.
 */
type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => { finished: Promise<void> }
}

export function supportsViewTransition(): boolean {
  if (typeof document === 'undefined') return false
  const doc = document as DocumentWithViewTransition
  if (typeof doc.startViewTransition !== 'function') return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Runs `update` inside a view transition. The `data-route-transition`
 * attribute scopes our CSS to route changes only, so the theme toggle's
 * circular wipe is never affected.
 */
export function withViewTransition(update: () => void): void {
  if (!supportsViewTransition()) {
    update()
    return
  }
  const doc = document as DocumentWithViewTransition
  const root = document.documentElement
  root.setAttribute('data-route-transition', '')

  /*
   * The browser captures the "new" snapshot as soon as the callback's promise
   * resolves. `router.push` renders asynchronously, so we hold the frame open
   * for two animation frames plus a short grace period — long enough for the
   * prefetched route to commit, short enough that a slow network never locks
   * the UI (the timeout always settles).
   */
  const transition = doc.startViewTransition!(
    () =>
      new Promise<void>((resolve) => {
        update()
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
        window.setTimeout(resolve, 120)
      }),
  )
  const cleanup = () => root.removeAttribute('data-route-transition')
  void transition.finished.then(cleanup, cleanup)
}

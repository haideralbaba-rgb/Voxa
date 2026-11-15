import Lenis from "lenis";

/**
 * Lenis smooth-scroll singleton, driven by a single requestAnimationFrame loop.
 * Motion's useScroll reads the native window scroll, so both stay in sync.
 */
export let lenis: Lenis | null = null;

export function initLenis() {
  const instance = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 1,
    smoothWheel: true,
    touchMultiplier: 1.4,
  });
  lenis = instance;

  let id = 0;
  const raf = (time: number) => {
    instance.raf(time);
    id = requestAnimationFrame(raf);
  };
  id = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(id);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
  else el.scrollIntoView({ behavior: "smooth" });
}

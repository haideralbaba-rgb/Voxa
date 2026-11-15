import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";

/**
 * Scroll-velocity marquee: scrolls at a base speed and accelerates
 * (and flips direction) with the page scroll velocity.
 */
function Row({ items, base, variant }: { items: string[]; base: number; variant: "solid" | "outline" }) {
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const xp = useTransform(x, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let move = dir.current * base * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    x.set(x.get() + move);
  });

  const unit = (
    <div className="flex shrink-0 items-center gap-8 pe-8 md:gap-14 md:pe-14">
      {items.map((t, i) => (
        <div key={i} className="flex items-center gap-8 md:gap-14">
          <span
            className={
              variant === "solid"
                ? i % 2
                  ? "text-lime"
                  : "text-ink"
                : "text-outline-dim"
            }
          >
            {t}
          </span>
          <span className={`inline-block h-3 w-3 rotate-45 md:h-5 md:w-5 ${variant === "solid" ? "bg-lime" : "bg-ink/25"}`} />
        </div>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden whitespace-nowrap" dir="ltr">
      <motion.div style={{ x: xp }} className="flex w-max font-display text-6xl leading-[1.3] font-black md:text-9xl">
        {unit}
        {unit}
        {unit}
        {unit}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative border-y border-white/10 bg-void py-6 md:py-10" aria-hidden>
      <Row items={["تصوير", "فيديو", "ريلز", "جرافيك", "موشن", "هوية"]} base={-2.2} variant="solid" />
      <div className="mt-1">
        <Row items={["PHOTO", "VIDEO", "REELS", "GRAPHIC", "MOTION", "BRAND"]} base={2.2} variant="outline" />
      </div>
    </section>
  );
}

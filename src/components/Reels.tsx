import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { reels } from "../data";
import type { Reel } from "../data";
import { IconEye, IconReel } from "./icons";
import { MaskWords, SectionLabel } from "./Reveal";
import { ar } from "../lib/format";

function ReelCard({ r, i }: { r: Reel; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    if (on) v.play().catch(() => {});
    else v.pause();
  }, [on]);

  return (
    <div
      ref={ref}
      onPointerEnter={() => setOn(true)}
      onPointerLeave={() => setOn(false)}
      data-cursor={r.video ? "شغّل" : "ريل"}
      className={`group relative h-[58vh] max-h-[640px] shrink-0 aspect-[9/16] overflow-hidden rounded-[28px] border border-white/10 bg-coal ${
        i % 2 ? "translate-y-10 md:translate-y-14" : "-translate-y-2"
      }`}
    >
      <img
        src={r.src}
        alt={r.title}
        loading="lazy"
        draggable={false}
        className="absolute inset-0 h-full w-full scale-105 object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.18]"
      />
      {r.video && (
        <video
          ref={vid}
          src={r.video}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${on ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

      {/* story progress bar */}
      <div className="absolute inset-x-4 top-4 h-[3px] overflow-hidden rounded-full bg-white/25">
        <div className="h-full origin-right animate-[reelbar_6s_linear_infinite] rounded-full bg-white" style={{ animationDelay: `${i * -1.1}s` }} />
      </div>

      <div className="absolute start-4 top-9 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 font-display text-xs font-extrabold backdrop-blur">
        <IconReel className="h-4 w-4 text-lime" />
        {r.tag}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-2 flex items-center gap-1.5 text-sm font-bold text-lime">
          <IconEye className="h-4 w-4" />
          {r.views}
        </div>
        <div className="font-display text-2xl leading-[1.3] font-black">{r.title}</div>
      </div>

    </div>
  );
}

export default function Reels() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, max]);
  const bar = useTransform(smooth, [0, 1], [0.02, 1]);
  const bgText = useTransform(smooth, [0, 1], ["0%", "-30%"]);

  useLayoutEffect(() => {
    const measure = () => {
      const w = trackRef.current?.getBoundingClientRect().width ?? 0;
      setMax(Math.max(0, w - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 800);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="reels" ref={sectionRef} className="relative h-[420vh] bg-[#08080a]">
      <style>{`@keyframes reelbar{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}`}</style>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* giant background word */}
        <motion.div
          style={{ x: bgText }}
          className="pointer-events-none absolute -top-4 start-0 select-none font-display text-[38vw] leading-none font-black text-outline-dim whitespace-nowrap"
          dir="ltr"
          aria-hidden
        >
          REELS
        </motion.div>

        <div className="relative z-10 px-5 pt-20 md:px-10 md:pt-24">
          <SectionLabel index="٠٣">ريلز وفيديو قصير</SectionLabel>
          <h2 className="font-display text-5xl leading-[1.15] font-black md:text-8xl">
            <MaskWords text="٦٠ إطارًا" highlight={[0]} />{" "}
            <MaskWords text="من الإبهار" delay={0.15} />
          </h2>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="relative z-10 flex w-max items-center gap-5 px-5 py-8 md:gap-8 md:px-10" dir="rtl">
          {reels.map((r, i) => (
            <ReelCard key={r.id} r={r} i={i} />
          ))}
          <div className="flex h-[58vh] w-[70vw] shrink-0 flex-col items-start justify-center gap-4 ps-6 md:w-[30vw]">
            <div className="font-display text-4xl leading-[1.3] font-black md:text-6xl">
              والمزيد <span className="text-lime">ينتظر</span> على الشاشة.
            </div>
            <div className="text-lg font-bold text-ink/60">{ar(6)} ريلز من أصل أكثر من {ar(120)}</div>
          </div>
        </motion.div>

        <div className="relative z-10 mx-5 mt-2 flex items-center gap-4 md:mx-10">
          <span className="font-display text-sm font-bold text-ink/60">مرّر للأسفل</span>
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
            <motion.div className="h-full origin-right bg-lime" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

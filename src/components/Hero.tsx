import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { MaskWords } from "./Reveal";
import Magnetic from "./Magnetic";
import { IconArrow, IconPlay } from "./icons";
import { scrollToId } from "../lib/lenis";
import { VIDEO_LENS, POSTER_LENS } from "../data";
import { ar } from "../lib/format";

function Timecode() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 40);
    return () => clearInterval(id);
  }, []);
  const f = t % 25;
  const s = Math.floor(t / 25) % 60;
  const m = Math.floor(t / 1500) % 60;
  const pad = (n: number) => ar(String(n).padStart(2, "0"));
  return (
    <span dir="ltr" className="font-display tabular-nums">
      {pad(m)}:{pad(s)}:{pad(f)}
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Scroll-driven: the framed reel expands to a full-bleed cinema screen
  const clip = useTransform(
    scrollYProgress,
    [0, 0.62],
    ["inset(67% 16% 6% 16% round 28px)", "inset(0% 0% 0% 0% round 0px)"],
  );
  const vScale = useTransform(scrollYProgress, [0, 0.62], [1.4, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.45], ["0%", "-35%"]);
  const titleO = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const overlayO = useTransform(scrollYProgress, [0.5, 0.78], [0, 1]);
  const overlayY = useTransform(scrollYProgress, [0.5, 0.78], [60, 0]);
  const hudO = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  // pointer spotlight
  const mx = useSpring(useMotionValue(50), { stiffness: 60, damping: 20 });
  const my = useSpring(useMotionValue(35), { stiffness: 60, damping: 20 });
  const spot = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, rgba(200,255,46,0.16), transparent 60%)`;

  const onMove = (e: React.PointerEvent) => {
    mx.set((e.clientX / window.innerWidth) * 100);
    my.set((e.clientY / window.innerHeight) * 100);
  };

  return (
    <section id="top" ref={ref} onPointerMove={onMove} className="relative h-[260vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid-lines absolute inset-0" />
        <motion.div className="absolute inset-0" style={{ background: spot }} />

        {/* Headline */}
        <motion.div
          style={{ y: titleY, opacity: titleO }}
          className="relative z-10 flex h-full flex-col px-5 pt-24 md:px-10 md:pt-28"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-3 flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] py-2 ps-3 pe-5 font-display text-[13px] font-bold backdrop-blur md:mb-5 md:text-sm"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-ring" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-lime" />
            </span>
            متاح لمشاريع ٢٠٢٦
          </motion.div>

          <h1
            className="font-display font-black text-ink"
            style={{
              fontSize: "clamp(3.1rem, min(10.5vw, 17vh), 10.5rem)",
              lineHeight: 1.12,
            }}
          >
            <span className="block">
              <MaskWords text="أحوّل اللقطة" trigger="ready" ready={ready} delay={0.1} />
            </span>
            <span className="block">
              <MaskWords text="إلى هيبة." trigger="ready" ready={ready} delay={0.35} highlight={[1]} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 flex items-end justify-between gap-6 md:mt-6"
          >
            <p className="hidden max-w-sm text-lg leading-relaxed font-medium text-ink/70 md:block">
              أنا <b className="font-extrabold text-ink">VOXA</b> — مصوّر ومصمم جرافيك. أصنع صورًا وفيديوهات وهويات بصرية تُرى من
              أول ثانية وتُتذكَّر طويلًا.
            </p>
            <div className="flex items-center gap-3">
              <Magnetic strength={0.3}>
                <button
                  onClick={() => scrollToId("work")}
                  className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 font-display text-[15px] font-black text-black transition-colors hover:bg-lime"
                >
                  شاهد الأعمال
                  <IconArrow className="h-4 w-4 rotate-[225deg] transition-transform group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>

        {/* Expanding cinema frame */}
        <motion.div
          className="absolute inset-0 z-20 overflow-hidden bg-black"
          style={{ clipPath: clip }}
          data-cursor="ريل"
        >
          <motion.video
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: vScale }}
            src={VIDEO_LENS}
            poster={POSTER_LENS}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

          {/* HUD */}
          <motion.div
            style={{ opacity: hudO }}
            className="absolute inset-x-6 top-[68%] flex items-center justify-between text-[11px] font-bold text-white md:inset-x-[17%] md:top-[69%] md:text-sm"
          >
            <span className="flex items-center gap-2">
              <span className="blink h-2 w-2 rounded-full bg-hot" />
              REC
            </span>
            <Timecode />
          </motion.div>

          <motion.div
            style={{ opacity: overlayO, y: overlayY }}
            className="absolute inset-x-0 bottom-0 flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-end md:p-12"
          >
            <div>
              <div className="mb-3 flex items-center gap-3 font-display text-sm font-bold text-lime md:text-base">
                <span className="blink h-2 w-2 rounded-full bg-hot" />
                ريل العرض · <Timecode />
              </div>
              <div className="font-display text-5xl leading-[1.15] font-black md:text-8xl">
                شاهد كيف <span className="text-lime">أرى.</span>
              </div>
            </div>
            <button
              onClick={() => scrollToId("work")}
              className="flex items-center gap-3 rounded-full bg-lime py-3 ps-3 pe-7 font-display text-base font-black text-black"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-lime">
                <IconPlay className="h-4 w-4" />
              </span>
              تصفّح المعرض
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

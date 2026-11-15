import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { SectionLabel, FadeUp } from "./Reveal";
import { ar } from "../lib/format";

const statement =
  "أنا لا ألتقط الصور فقط، أنا أصنع لحظات تُشاهَد مرتين. كل لقطة وكل تصميم يبدأ بسؤال واحد: كيف نجعل العين تتوقّف؟";
const words = statement.split(" ");
const accent = new Set([7, 8, 9, 10, 22, 23]);

function Word({ w, i, total, p, accentWord }: { w: string; i: number; total: number; p: MotionValue<number>; accentWord: boolean }) {
  const start = i / total;
  const end = start + 1.6 / total;
  const opacity = useTransform(p, [start, Math.min(end, 1)], [0.14, 1]);
  const y = useTransform(p, [start, Math.min(end, 1)], [10, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block ${accentWord ? "text-lime" : ""}`}>
      {w}&nbsp;
    </motion.span>
  );
}

function Counter({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2.2, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return (
    <div ref={ref} className="border-t border-white/15 pt-5">
      <div className="font-display text-6xl leading-[1.1] font-black text-ink md:text-7xl">
        {ar(v)}
        <span className="text-lime">{suffix}</span>
      </div>
      <div className="mt-1 text-lg font-bold text-ink/60">{label}</div>
    </div>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  return (
    <section id="about" className="relative px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1500px]">
        <SectionLabel index="٠٢">من أنا</SectionLabel>

        <p
          ref={ref}
          className="font-display text-[2.1rem] leading-[1.5] font-black md:text-[4.6rem] md:leading-[1.4]"
        >
          {words.map((w, i) => (
            <Word key={i} w={w} i={i} total={words.length} p={scrollYProgress} accentWord={accent.has(i)} />
          ))}
        </p>

        <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-32 md:grid-cols-4 md:gap-x-10">
          <FadeUp>
            <Counter to={300} suffix="+" label="مشروع منجز" />
          </FadeUp>
          <FadeUp delay={0.1}>
            <Counter to={12} suffix="م" label="مشاهدة ريلز" />
          </FadeUp>
          <FadeUp delay={0.2}>
            <Counter to={98} suffix="٪" label="عملاء يعودون" />
          </FadeUp>
          <FadeUp delay={0.3}>
            <Counter to={8} suffix="" label="سنوات خبرة" />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

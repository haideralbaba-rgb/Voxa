import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { services } from "../data";
import { IconArrow, IconGraphic, IconMotion, IconPhoto, IconVideo } from "./icons";
import { MaskWords, SectionLabel } from "./Reveal";

const icons = { photo: IconPhoto, video: IconVideo, graphic: IconGraphic, motion: IconMotion };

export default function Services() {
  const wrap = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 22, mass: 0.5 });

  const onMove = (e: React.PointerEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section id="services" className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1500px]">
        <SectionLabel index="٠٤">ماذا أقدّم</SectionLabel>
        <h2 className="mb-14 font-display text-5xl leading-[1.15] font-black md:mb-20 md:text-[7.5rem]">
          <MaskWords text="أربع طرق" />
          <br />
          <MaskWords text="لجذب العين." highlight={[1]} delay={0.15} />
        </h2>

        <div ref={wrap} onPointerMove={onMove} onPointerLeave={() => setHover(null)} className="relative border-t border-white/15">
          {/* floating preview */}
          <motion.div
            className="pointer-events-none absolute top-0 left-0 z-30 hidden md:block"
            style={{ x, y }}
          >
            <AnimatePresence>
              {hover !== null && (
                <motion.div
                  key={hover}
                  initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -3 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="absolute h-80 w-60 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-black shadow-2xl"
                >
                  <img src={services[hover].img} alt="" className="h-full w-full object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {services.map((s, i) => {
            const Icon = icons[s.icon];
            const on = hover === i;
            return (
              <motion.div
                key={s.n}
                onPointerEnter={() => setHover(i)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-hidden border-b border-white/15"
              >
                <motion.div
                  className="absolute inset-0 origin-bottom bg-lime"
                  initial={false}
                  animate={{ scaleY: on ? 1 : 0 }}
                  transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
                />
                <div
                  className={`relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 py-7 transition-colors duration-300 md:grid-cols-[90px_1.2fr_1.4fr_auto] md:gap-x-8 md:py-10 md:px-6 ${
                    on ? "text-black" : "text-ink"
                  }`}
                >
                  <span className="font-display text-xl font-black opacity-60 md:text-2xl">{s.n}</span>
                  <div className="flex items-center gap-4">
                    <Icon className="hidden h-9 w-9 shrink-0 md:block" />
                    <h3 className="font-display text-[1.7rem] leading-[1.3] font-black md:text-5xl">{s.title}</h3>
                  </div>
                  <p className={`col-span-3 row-start-2 text-base leading-7 font-medium md:col-span-1 md:row-start-auto md:text-lg ${on ? "text-black/80" : "text-ink/60"}`}>
                    {s.desc}
                    <span className="mt-4 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className={`rounded-full border px-3 py-1 font-display text-xs font-bold ${on ? "border-black/40" : "border-white/20"}`}
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </p>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 md:h-16 md:w-16 ${
                      on ? "rotate-[360deg] border-black bg-black text-lime" : "border-white/25"
                    }`}
                  >
                    <IconArrow className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

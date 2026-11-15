import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useMotionValue, useSpring } from "motion/react";
import { kindMeta, works } from "../data";
import type { Kind, Work } from "../data";
import { MaskWords, SectionLabel } from "./Reveal";
import { IconArrow, IconClose, IconGrid, IconGraphic, IconPhoto, IconPlay, IconVideo } from "./icons";
import { lenis } from "../lib/lenis";
import { ar } from "../lib/format";

type Filter = "all" | Kind;

export const KindIcon = ({ kind, className }: { kind: Kind; className?: string }) =>
  kind === "video" ? (
    <IconVideo className={className} />
  ) : kind === "photo" ? (
    <IconPhoto className={className} />
  ) : (
    <IconGraphic className={className} />
  );

const filters: { id: Filter; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "الكل", icon: <IconGrid className="h-4 w-4" /> },
  { id: "video", label: "فيديو", icon: <IconVideo className="h-4 w-4" /> },
  { id: "photo", label: "تصوير", icon: <IconPhoto className="h-4 w-4" /> },
  { id: "graphic", label: "جرافيك", icon: <IconGraphic className="h-4 w-4" /> },
];

function Card({ w, filter, onOpen, ref: outerRef }: { w: Work; filter: Filter; onOpen: (w: Work) => void; ref?: React.Ref<HTMLDivElement> }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const [hover, setHover] = useState(false);

  // 3D tilt
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const coarse = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
  const playing = w.video && (hover || (coarse && inView));

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 8);
    rx.set((0.5 - py) * 8);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
    setHover(false);
  };

  return (
    <motion.div
      ref={outerRef}
      layout
      layoutId={`card-${w.id}`}
      className={`relative ${filter === "all" ? w.span : w.fspan}`}
      style={{ borderRadius: 26 }}
      initial={{ opacity: 0, scale: 0.92, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={leave}
        onClick={() => onOpen(w)}
        data-cursor={w.kind === "video" ? "تشغيل" : "عرض"}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, borderRadius: 26 }}
        className="group relative h-full w-full cursor-pointer overflow-hidden border border-white/10 bg-coal"
      >
        <img
          src={w.src}
          alt={w.title}
          loading="lazy"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
        />
        {w.video && (
          <video
            ref={videoRef}
            src={w.video}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
        {/* spotlight edge */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(200,255,46,0.55), transparent 55%)" }}
        />

        {/* chip */}
        <div className="absolute start-4 top-4 flex items-center gap-2 rounded-full bg-black/55 py-1.5 ps-2.5 pe-3.5 font-display text-xs font-extrabold backdrop-blur-md">
          <KindIcon kind={w.kind} className="h-4 w-4 text-lime" />
          {kindMeta[w.kind].label}
        </div>

        {/* corner action */}
        <div className="absolute end-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-black transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-lime">
          {w.kind === "video" ? <IconPlay className="h-3.5 w-3.5" /> : <IconArrow className="h-4 w-4" />}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="text-xs font-bold text-lime">{w.meta}</div>
          <div className="mt-1 font-display text-2xl leading-[1.3] font-black text-white md:text-[1.7rem]">{w.title}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Modal({ w, onClose }: { w: Work; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    lenis?.stop();
    return () => {
      window.removeEventListener("keydown", k);
      lenis?.start();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-10">
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-cursor="إغلاق"
      />
      <motion.div
        layoutId={`card-${w.id}`}
        style={{ borderRadius: 28 }}
        data-lenis-prevent
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden overflow-y-auto border border-white/15 bg-[#0b0b0e] md:flex-row"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 bg-black md:aspect-auto md:min-h-[560px] md:w-[62%]">
          {w.video ? (
            <video src={w.video} poster={w.src} controls autoPlay loop playsInline className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <img src={w.src} alt={w.title} className="absolute inset-0 h-full w-full object-cover" />
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="flex flex-1 flex-col justify-between gap-8 p-6 md:p-9"
        >
          <div>
            <div className="mb-5 flex items-center gap-2 font-display text-sm font-extrabold text-lime">
              <KindIcon kind={w.kind} className="h-5 w-5" />
              {kindMeta[w.kind].label} · {w.year}
            </div>
            <h3 className="font-display text-4xl leading-[1.25] font-black md:text-5xl">{w.title}</h3>
            <div className="mt-2 text-base font-bold text-ink/50">{w.meta}</div>
            <p className="mt-6 text-lg leading-8 font-medium text-ink/80">{w.desc}</p>
          </div>
          <button
            onClick={onClose}
            className="flex w-fit items-center gap-2 rounded-full bg-lime px-6 py-3 font-display font-black text-black"
          >
            <IconClose className="h-4 w-4" />
            إغلاق
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function WorkSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<Work | null>(null);
  const list = filter === "all" ? works : works.filter((w) => w.kind === filter);

  const count = (f: Filter) => (f === "all" ? works.length : works.filter((w) => w.kind === f).length);
  const close = () => setActive(null);

  return (
    <section id="work" className="relative px-4 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <SectionLabel index="٠١">الأعمال المختارة</SectionLabel>

        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <h2 className="font-display text-[3.4rem] leading-[1.15] font-black md:text-[8.5rem]">
            <MaskWords text="شبكة" />
            <br />
            <MaskWords text="الأعمال" highlight={[0]} delay={0.15} />
          </h2>

          <LayoutGroup id="filters">
            <div className="flex flex-wrap gap-2" role="tablist">
              {filters.map((f) => {
                const on = filter === f.id;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setFilter(f.id)}
                    className={`relative flex items-center gap-2 rounded-full border px-5 py-3 font-display text-[15px] font-extrabold transition-colors ${
                      on ? "border-transparent text-black" : "border-white/15 text-ink hover:border-white/40"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-lime"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      {f.icon}
                      {f.label}
                      <sup className="text-[11px] opacity-60">{ar(count(f.id))}</sup>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <LayoutGroup id="grid">
          <motion.div
            layout
            className="grid auto-rows-[170px] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:auto-rows-[210px] md:auto-rows-[250px] md:grid-cols-4 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {list.map((w) => (
                <Card key={w.id} w={w} filter={filter} onOpen={setActive} />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>{active && <Modal key="modal" w={active} onClose={close} />}</AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}

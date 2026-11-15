import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { VoxaMark, IconMenu, IconClose, IconArrow } from "./icons";
import Magnetic from "./Magnetic";
import { lenis, scrollToId } from "../lib/lenis";

const links = [
  { id: "work", label: "الأعمال" },
  { id: "reels", label: "الريلز" },
  { id: "about", label: "عنّي" },
  { id: "services", label: "الخدمات" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        if (lenis) lenis.scrollTo(0, { duration: 1.6 });
      }}
      className={`flex items-center gap-2 text-ink ${className}`}
      aria-label="VOXA"
    >
      <VoxaMark className="h-7 w-7 text-lime" />
      <span className="font-display text-2xl leading-none font-black tracking-[0.12em]" dir="ltr">
        VOXA
      </span>
    </a>
  );
}

export default function Nav({ ready }: { ready: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 160);
  });

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-right bg-lime"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-[65] flex items-center justify-between px-5 py-4 md:px-10 md:py-6"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? -110 : 0, opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Logo />

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/50 p-1.5 backdrop-blur-xl md:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="rounded-full px-5 py-2 font-display text-[15px] font-bold text-ink/80 transition-colors hover:bg-ink hover:text-black"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic strength={0.25} className="hidden md:inline-block">
            <button
              onClick={() => go("contact")}
              className="group flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-[15px] font-black text-black transition-transform hover:scale-[1.04]"
            >
              لنتحدّث
              <IconArrow className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Magnetic>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 backdrop-blur-xl md:hidden"
            aria-label="القائمة"
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[64] flex flex-col justify-center gap-2 bg-void/95 px-8 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...links, { id: "contact", label: "تواصل" }].map((l, i) => (
              <motion.button
                key={l.id}
                onClick={() => go(l.id)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.08 * i + 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-baseline gap-4 border-b border-white/10 py-4 text-start font-display text-5xl font-black"
              >
                <span className="text-base text-lime">٠{i + 1}</span>
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

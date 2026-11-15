import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Magnetic from "./Magnetic";
import { MaskWords } from "./Reveal";
import { IconArrow, IconBehance, IconInstagram, IconYoutube } from "./icons";
import { Logo } from "./Nav";

const socials = [
  { label: "إنستغرام", Icon: IconInstagram },
  { label: "بيهانس", Icon: IconBehance },
  { label: "يوتيوب", Icon: IconYoutube },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const bigX = useTransform(scrollYProgress, [0, 1], ["12%", "-6%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-25, 0]);

  return (
    <footer id="contact" ref={ref} className="relative overflow-hidden bg-lime text-black">
      <div className="relative z-10 mx-auto max-w-[1500px] px-5 pt-28 pb-10 md:px-10 md:pt-44">
        <div className="mb-6 flex items-center gap-4 font-display text-sm font-bold md:text-base">
          <span>٠٥</span>
          <span className="h-px w-12 bg-black/40" />
          <span>تواصل</span>
        </div>
        <h2 className="font-display text-[3.6rem] leading-[1.12] font-black md:text-[9.5rem]">
          <MaskWords text="لنصنع شيئًا" />
          <br />
          <MaskWords text="لا يُنسى." delay={0.15} />
        </h2>

        <div className="mt-14 flex flex-col items-start justify-between gap-10 md:mt-20 md:flex-row md:items-end">
          <Magnetic strength={0.4}>
            <a
              href="mailto:hello@voxa.studio"
              className="group flex items-center gap-4 rounded-full bg-black py-3 ps-3 pe-8 font-display text-xl font-black text-lime transition-transform hover:scale-[1.03] md:text-3xl"
            >
              <motion.span
                style={{ rotate: rot }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-black md:h-20 md:w-20"
              >
                <IconArrow className="h-6 w-6 md:h-9 md:w-9" />
              </motion.span>
              <span dir="ltr">hello@voxa.studio</span>
            </a>
          </Magnetic>

          <div className="flex gap-3">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className="group flex items-center gap-2 rounded-full border-2 border-black px-5 py-3 font-display text-[15px] font-black transition-colors hover:bg-black hover:text-lime"
              >
                <Icon className="h-5 w-5" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* giant outlined wordmark, parallax by scroll */}
      <motion.div
        style={{ x: bigX }}
        className="pointer-events-none relative z-0 mt-10 select-none font-display text-[34vw] leading-[0.82] font-black tracking-tight whitespace-nowrap md:mt-16"
        dir="ltr"
        aria-hidden
      >
        <span className="text-black">VOXA</span>
        <span className="ms-[4vw]" style={{ color: "transparent", WebkitTextStroke: "2px #000" }}>
          VOXA
        </span>
      </motion.div>

      <div className="relative z-10 border-t-2 border-black/90 bg-void text-ink">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-4 px-5 py-6 text-sm font-bold text-ink/60 md:flex-row md:px-10">
          <Logo />
          <span>© {new Date().getFullYear().toLocaleString("ar-EG", { useGrouping: false })} VOXA — جميع الحقوق محفوظة</span>
          <span>صُنع بحركة سلسة ٦٠ إطارًا</span>
        </div>
      </div>
    </footer>
  );
}

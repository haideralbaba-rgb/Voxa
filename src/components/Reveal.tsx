import type { ReactNode } from "react";
import { motion } from "motion/react";

/** Masked line reveal — animates by WORD (never by letter, to keep Arabic joins intact). */
export function MaskWords({
  text,
  className = "",
  delay = 0,
  highlight = [],
  trigger = "view",
  ready = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  highlight?: number[];
  trigger?: "view" | "ready";
  ready?: boolean;
}) {
  const words = text.split(" ");
  const anim =
    trigger === "view"
      ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-10% 0px" } }
      : { initial: "hidden", animate: ready ? "show" : "hidden" };

  return (
    <motion.span className={className} {...anim} transition={{ staggerChildren: 0.07, delayChildren: delay }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden px-[0.06em] py-[0.12em] -my-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${highlight.includes(i) ? "text-lime" : ""}`}
            variants={{ hidden: { y: "115%", rotate: 4 }, show: { y: "0%", rotate: 0 } }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </motion.span>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <FadeUp className="mb-6 flex items-center gap-4 font-display text-sm font-bold text-ink/70 md:text-base">
      <span className="text-lime">{index}</span>
      <span className="h-px w-12 bg-ink/30" />
      <span>{children}</span>
    </FadeUp>
  );
}

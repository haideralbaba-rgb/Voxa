import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import { VoxaMark } from "./icons";
import { ar } from "../lib/format";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.9,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setN(v),
      onComplete: () => setTimeout(onDone, 250),
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col justify-between bg-lime p-6 text-black md:p-10"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <VoxaMark className="h-7 w-7 text-black" />
          <span className="font-display text-xl font-black tracking-wider">VOXA</span>
        </div>
        <span className="font-display text-sm font-bold">جارٍ تحميل المعرض</span>
      </div>

      <div className="relative">
        <div className="font-display text-[34vw] leading-[0.8] font-black tabular-nums md:text-[24vw]">
          {ar(n)}
        </div>
        <div className="mt-6 h-[3px] w-full bg-black/15">
          <div className="h-full origin-right bg-black" style={{ width: `${n}%`, marginInlineStart: 0 }} />
        </div>
      </div>
    </motion.div>
  );
}

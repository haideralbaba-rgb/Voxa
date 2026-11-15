import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

type Mode = "default" | "link" | "media";

/**
 * Interactive cursor.
 * - dot follows the pointer 1:1, ring follows with a spring
 * - elements with data-cursor="label" turn the ring into a labelled lens
 * - links / buttons enlarge the ring
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const media = t?.closest<HTMLElement>("[data-cursor]");
      if (media) {
        setMode("media");
        setLabel(media.dataset.cursor || "");
      } else if (t?.closest("a, button, [role='button'], input, textarea")) {
        setMode("link");
        setLabel("");
      } else {
        setMode("default");
        setLabel("");
      }
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = mode === "media" ? 104 : mode === "link" ? 68 : 40;

  return (
    <>
      {/* ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[200] h-0 w-0"
        style={{ x: rx, y: ry }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <motion.div
          className="absolute flex items-center justify-center rounded-full"
          style={{ translateX: "-50%", translateY: "-50%" }}
          animate={{
            width: ringSize,
            height: ringSize,
            scale: pressed ? 0.82 : 1,
            backgroundColor:
              mode === "media" ? "rgba(200,255,46,1)" : mode === "link" ? "rgba(245,242,234,0.12)" : "rgba(245,242,234,0)",
            borderColor: mode === "media" ? "rgba(200,255,46,1)" : "rgba(245,242,234,0.55)",
            borderWidth: 1,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
        >
          <AnimatePresence>
            {mode === "media" && label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-display text-[15px] font-black text-black"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[201] h-0 w-0 mix-blend-difference"
        style={{ x, y }}
        animate={{ opacity: visible && mode !== "media" ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <div className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
    </>
  );
}

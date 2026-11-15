import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { initLenis, lenis } from "./lib/lenis";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import Reels from "./components/Reels";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const destroy = initLenis();
    lenis?.stop();
    return destroy;
  }, []);

  useEffect(() => {
    if (loaded) lenis?.start();
  }, [loaded]);

  const done = useCallback(() => setLoaded(true), []);

  return (
    <div className="grain relative bg-void">
      <Cursor />
      <AnimatePresence>{!loaded && <Preloader key="pre" onDone={done} />}</AnimatePresence>
      <Nav ready={loaded} />
      <main>
        <Hero ready={loaded} />
        <Marquee />
        <Work />
        <Reels />
        <About />
        <Services />
      </main>
      <Contact />
    </div>
  );
}

import { useEffect, useRef } from "react";
import { gsap, reduced } from "../lib/motion.js";

/* The extension's plate, at page scale. It drifts on its own; the pointer
   shifts it by a few pixels so the light sits behind the page rather than on
   it. Pointer parallax is skipped on touch and under reduced motion. */
export default function Field() {
  const ref = useRef(null);

  useEffect(() => {
    if (reduced() || !window.matchMedia("(pointer: fine)").matches) return;
    const x = gsap.quickTo(ref.current, "x", { duration: 1.1, ease: "power3.out" });
    const y = gsap.quickTo(ref.current, "y", { duration: 1.1, ease: "power3.out" });
    const onMove = (e) => {
      x((e.clientX / window.innerWidth - .5) * -26);
      y((e.clientY / window.innerHeight - .5) * -18);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <>
      <div className="field-parallax" ref={ref} aria-hidden="true"><div className="field" /></div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}

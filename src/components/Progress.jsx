import { useEffect, useRef } from "react";
import { gsap, useScrollPlugin } from "../lib/motion.js";

/* How far down the page you are, as one hairline — the same idea as the strip
   the extension puts on a conversation. */
export default function Progress() {
  const ref = useRef(null);
  useEffect(() => {
    const ScrollTrigger = useScrollPlugin();
    const set = gsap.quickSetter(ref.current, "scaleX");
    const st = ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: (self) => set(self.progress),
      onRefresh: (self) => set(self.progress),
    });
    return () => st.kill();
  }, []);
  return <div className="progress" ref={ref} aria-hidden="true" />;
}

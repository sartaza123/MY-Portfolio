import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Marquee = ({ items = [], speed = 20, className = "" }) => {
  const rowRef = useRef();

  useGSAP(() => {
    const el = rowRef.current;

    gsap.to(el, {
      xPercent: -50,
      repeat: -1,
      duration: speed,
      ease: "linear",
    });
  }, []);

  return (
    <div className={`overflow-hidden w-full ${className}`}>
      <div
        ref={rowRef}
        className="flex w-max gap-6 will-change-transform border-y border-white/40"
      >
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="min-w-[200px] md:min-w-[240px] px-6 py-3 bg-white/5 text-white backdrop-blur-md text-center whitespace-nowrap"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

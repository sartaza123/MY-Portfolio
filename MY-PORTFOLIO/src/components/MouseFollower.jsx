import { useRef, useEffect } from "react";
import gsap from "gsap";

const MouseFollower = () => {
  const followerRef = useRef();

  useEffect(() => {
    /* Hide on touch devices — there's no cursor to follow */
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e) => {
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        ease: "power1.out",
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={followerRef}
      className="fixed top-0 left-0 h-2 w-2 -mt-1 -ml-1 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
    />
  );
};

export default MouseFollower;

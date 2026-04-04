import React from "react";

const StaggerButton = ({
  text = "Start",
  hoverText = "Now →",
  className = "",
  onClick,
}) => {
  const letters = text.split("");

  return (
    <button
      onClick={onClick}
      className={`group relative w-max min-w-max px-6 py-3 overflow-hidden rounded-xl bg-black text-white font-semibold tracking-wide cursor-pointer ${className}`}
    >
      {/* LAYER 1 */}
      <span className="absolute inset-0 bg-neutral-900 transition-all duration-500"></span>

      {/* LAYER 2 */}
      <span className="absolute inset-0 bg-linear-to-r from-violet-600 via-fuchsia-500 to-rose-500 translate-x-[-120%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]"></span>

      {/* LAYER 3 */}
      <span className="absolute inset-0 bg-linear-to-r from-rose-500 via-pink-500 to-orange-400 translate-x-[-120%] group-hover:translate-x-0 transition-transform duration-700 delay-150 ease-[cubic-bezier(0.77,0,0.175,1)] opacity-70"></span>

      {/* TEXT WRAPPER */}
      <span className="relative z-10 flex items-center justify-center h-[1.5em] overflow-hidden text-center">
        {/* WIDTH HOLDER (prevents X-axis crop) */}
        <span className="invisible whitespace-nowrap">{hoverText}</span>

        {/* TEXT LINE 1 */}
        <span className="absolute flex gap-1 group-hover:-translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]">
          {letters.map((char, i) => (
            <span
              key={i}
              style={{ transitionDelay: `${i * 50}ms` }}
              className="inline-block group-hover:-translate-y-3 transition duration-500"
            >
              {char}
            </span>
          ))}
        </span>

        {/* TEXT LINE 2 */}
        <span className="absolute whitespace-nowrap translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200 ease-[cubic-bezier(0.77,0,0.175,1)]">
          {hoverText}
        </span>
      </span>

      {/* LIGHT SWEEP */}
      <span className="absolute top-0 left-[-120%] w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:left-[120%] transition-all duration-1000 delay-300"></span>

      {/* GLOW */}
      <span className="absolute -bottom-10 -right-10 w-40 h-40 bg-fuchsia-500/30 blur-3xl opacity-0 group-hover:opacity-100 transition duration-700"></span>
    </button>
  );
};

export default StaggerButton;

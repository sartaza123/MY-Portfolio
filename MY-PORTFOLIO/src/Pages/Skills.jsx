import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { portfolioApi } from "../services/api";

gsap.registerPlugin(ScrollTrigger);

/* ─── constants ─────────────────────────────────────────── */
const BAND_H = 94;
const STEP_SCROLL = 500;

/* ══════════════════════════════════════════════════════════ */
const Skills = () => {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ── fetch ──────────────────────────────────────────────── */
  useEffect(() => {
    portfolioApi
      .getSkills()
      .then((d) => setSkills(d || []))
      .catch(() => setSkills([]))
      .finally(() => setLoading(false));
  }, []);

  /* ── GSAP ───────────────────────────────────────────────── */
  useEffect(() => {
    if (loading || skills.length === 0) return;

    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const blocks = cardRefs.current.filter(Boolean);
        const n = blocks.length;
        if (n === 0) return;

        /* Wrapper height = tallest card + stacked offsets of the rest */
        const maxH = Math.max(...blocks.map((b) => b.scrollHeight));
        const STACK_GAP = 55;
        const wrapH = maxH + (n - 1) * STACK_GAP;
        gsap.set(wrapRef.current, { height: wrapH });

        /* Build timeline — exactly the original pattern */
        const tl = gsap.timeline({ paused: true });

        blocks.forEach((block, i) => {
          /* Every block starts off-screen below, same absolute origin */
          gsap.set(block, {
            y: 500,
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: i + 1 /* z[0] < z[1] < … < z[n-1] */,
          });

          /* Slide each block to its stacked position */
          tl.to(
            block,
            {
              y: i * STACK_GAP /* ← controls the peek gap */,
              opacity: 1,
              duration: 1,
              ease: "none",
            },
            i /* stagger: card i starts at timeline beat i */,
          );
        });

        /* Pin the wrapper & scrub the timeline with scroll */
        ScrollTrigger.create({
          trigger: wrapRef.current,
          start: "top 50px",
          end: `+=${n * STEP_SCROLL}px`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          animation: tl,
          invalidateOnRefresh: true,
          id: "skills-stack",
        });

        /* Force GSAP to re-measure positions with the new wrapper height */
        ScrollTrigger.refresh();
      }),
    );

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getById("skills-stack")?.kill();
    };
  }, [loading, skills]);

  /* ─── render ────────────────────────────────────────────── */
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="bg-white py-[4rem] pb-[6rem]"
    >
      {/* Header */}
      <div className="px-[clamp(1.5rem,8vw,5rem)] mb-[3.5rem]">
        <span className="block font-['Orbitron'] text-[clamp(64px,10vw,120px)] font-semibold uppercase tracking-[0.04em] text-transparent leading-none [-webkit-text-stroke:2px_rgba(0,0,0,0.85)]">
          Skills
        </span>

        <p className="mt-4 max-w-[42rem] text-gray-500 leading-[1.75] text-[1rem]">
          Each scroll step brings a new skill into focus — previous cards
          collapse to their title band as the next one slides up and opens.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="px-[clamp(1.5rem,8vw,5rem)] flex flex-col gap-6">
          {[1, 2, 3].map((x) => (
            <div
              key={x}
              className="h-64 rounded-[1.5rem] border border-black/10 bg-black/5"
            />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && skills.length === 0 && (
        <div className="mx-[clamp(1.5rem,8vw,5rem)] flex min-h-[40vh] items-center justify-center border border-black/10 bg-black/5">
          <p className="text-gray-500 text-lg">No skills added yet.</p>
        </div>
      )}

      {/* Cards */}
      {!loading && skills.length > 0 && (
        <div ref={wrapRef} className="relative">
          {skills.map((skill, index) => (
            <article
              key={skill.id || index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white border-t-2 border-black"
            >
              {/* Title Band */}
              <div className="px-[2rem]" style={{ height: BAND_H }}>
                <h2 className="text-[clamp(2rem,4vw,4rem)] font-bold uppercase tracking-[0.04em] text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
                  {skill.title}
                </h2>

                {/* <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </span> */}
              </div>

              {/* Body */}
              <div className="skill-body overflow-hidden">
                <div className="relative px-[2.25rem]">
                  {/* Paragraph */}
                  <p className="text-gray-600 text-[clamp(0.9rem,1.3vw,1.05rem)]">
                    {skill.para}
                  </p>

                  {/* Points */}
                  <div className="p-2">
                    <div className="flex flex-col gap-3">
                      {(skill.points || []).map((pt, pi) => (
                        <div
                          key={pi}
                          className={`flex gap-4 ${
                            pi < skill.points.length - 1
                              ? "pb-3 border-b border-black/10"
                              : ""
                          }`}
                        >
                          <span className="text-[0.7rem] font-semibold text-gray-400 pt-[0.2rem]">
                            {String(pi + 1).padStart(2, "0")}
                          </span>

                          <p className="m-0 text-gray-700 leading-[1.7] text-sm">
                            {pt}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Skills;

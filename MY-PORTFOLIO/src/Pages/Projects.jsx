import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { buildAssetUrl, portfolioApi } from "../services/api";

gsap.registerPlugin(ScrollTrigger);

const BAND_H = 94;
const STACK_GAP = 65;
const STEP_SCROLL = 500;

const Projects = () => {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);
  const cursorRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [codeHovered, setCodeHovered] = useState(false);

  /* fetch */
  useEffect(() => {
    portfolioApi
      .getProjects()
      .then((d) => setProjects(d || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  /* cursor follow */
  useEffect(() => {
    const move = (e) => {
      const el = cursorRef.current;
      if (!el) return;

      gsap.to(el, {
        x: e.clientX - el.offsetWidth / 2,
        y: e.clientY - el.offsetHeight / 2,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* GSAP stacking */
  useEffect(() => {
    if (loading || projects.length === 0) return;

    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const blocks = cardRefs.current.filter(Boolean);
        const n = blocks.length;
        if (n === 0) return;

        const maxH = Math.max(...blocks.map((b) => b.scrollHeight));
        const wrapH = maxH + (n - 1) * STACK_GAP;

        gsap.set(wrapRef.current, { height: wrapH });

        const tl = gsap.timeline({ paused: true });

        blocks.forEach((block, i) => {
          gsap.set(block, {
            y: 500,
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: i + 1,
          });

          tl.to(
            block,
            { y: i * STACK_GAP, opacity: 1, duration: 1, ease: "none" },
            i,
          );
        });

        ScrollTrigger.create({
          trigger: wrapRef.current,
          start: "top 50px",
          end: `+=${n * STEP_SCROLL}px`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          animation: tl,
          invalidateOnRefresh: true,
          id: "projects-stack",
        });

        /* Force GSAP to re-measure positions with the new wrapper height */
        ScrollTrigger.refresh();
      }),
    );

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getById("projects-stack")?.kill();
    };
  }, [loading, projects]);

  const showImage = Boolean(hoveredProject?.image && !codeHovered);

  return (
    <>
      {/* cursor preview */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 z-[999] ${
          showImage ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() =>
            hoveredProject?.liveLink &&
            window.open(hoveredProject.liveLink, "_blank")
          }
          className={`relative overflow-hidden rounded-xl bg-[#111] shadow-[0_24px_64px_rgba(0,0,0,0.7)]
          transition-all duration-300
          ${showImage ? "w-[28vw] h-[28vh] opacity-100" : "w-0 h-0 opacity-0"}
          ${hoveredProject?.liveLink ? "cursor-pointer" : "cursor-default"}`}
        >
          {hoveredProject?.image && (
            <img
              src={buildAssetUrl(hoveredProject.image)}
              alt={hoveredProject?.title}
              className="w-full h-full object-cover block"
            />
          )}

          {showImage && hoveredProject?.liveLink && (
            <div className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
              <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/85 bg-black/40 px-3 py-1 rounded-full border border-white/15 backdrop-blur">
                Click to see live preview
              </span>
            </div>
          )}
        </div>
      </div>

      {/* section */}
      <section
        id="projects"
        ref={sectionRef}
        className="bg-black py-[4rem] pb-[6rem]"
      >
        {/* header */}
        <div className="px-[clamp(1.5rem,8vw,5rem)] mb-[3.5rem]">
          <span className="block font-['Orbitron'] text-[clamp(64px,10vw,120px)] font-semibold uppercase tracking-[0.04em] text-transparent leading-none [-webkit-text-stroke:2px_rgba(255,255,255,0.85)]">
            Projects
          </span>

          <p className="mt-4 max-w-[42rem] text-gray-500 leading-[1.75] text-[1rem]">
            Scroll to layer each project — hover any card to preview, click the
            image to go live.
          </p>
        </div>

        {/* loading */}
        {loading && (
          <div className="px-[clamp(1.5rem,8vw,5rem)] flex flex-col gap-6">
            {[1, 2, 3].map((x) => (
              <div
                key={x}
                className="h-32 border-t-2 border-white/10 opacity-30"
              />
            ))}
          </div>
        )}

        {/* empty */}
        {!loading && projects.length === 0 && (
          <div className="mx-[clamp(1.5rem,8vw,5rem)] flex min-h-[40vh] items-center justify-center">
            <p className="text-gray-500 text-lg">No projects yet.</p>
          </div>
        )}

        {/* cards */}
        {!loading && projects.length > 0 && (
          <div ref={wrapRef} className="relative">
            {projects.map((project, index) => (
              <article
                key={project.id || index}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseEnter={() => {
                  setHoveredProject(project);
                  setCodeHovered(false);
                }}
                onMouseLeave={() => {
                  setHoveredProject(null);
                  setCodeHovered(false);
                }}
                className="bg-black border-t-2 border-white/85 pb-10"
              >
                <div className="relative px-[2rem]">
                  {/* title */}
                  <h2 className="flex items-center h-[94px] text-[clamp(2rem,4vw,4rem)] font-bold uppercase tracking-[-0.02em] leading-[0.95] text-white whitespace-nowrap overflow-hidden text-ellipsis">
                    {project.title}
                  </h2>

                  {/* description */}
                  <p className="mt-4 max-w-[36rem] text-gray-500 text-[0.9rem] leading-[1.7] line-clamp-2">
                    {project.description ||
                      "A modern web experience focused on performance and clean design."}
                  </p>

                  {/* tags */}
                  {project.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="text-[0.6rem] uppercase tracking-[0.25em] text-white/40 border border-white/15 rounded-full px-3 py-[2px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* code button */}
                  {project.sourceCodeLink && (
                    <a
                      href={project.sourceCodeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setCodeHovered(true)}
                      onMouseLeave={() => setCodeHovered(false)}
                      className="absolute right-10 top-8 -translate-y-1/2 text-[0.65rem] uppercase tracking-[0.35em] text-white hover:text-white/70 transition py-2"
                    >
                      Code ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Projects;

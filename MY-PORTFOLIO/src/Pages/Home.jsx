import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import StaggerButton from "../components/StaggerButton";
import NavBar from "../components/NavBar";
import { buildAssetUrl, portfolioApi } from "../services/api";
import { usePortfolioContent } from "../context/PortfolioContentContext";

const Home = () => {
  const textsRef = useRef();
  const socialRef = useRef();
  const [resume, setResume] = useState(null);
  const [resumeLoading, setResumeLoading] = useState(true);
  const { content } = usePortfolioContent();

  useEffect(() => {
    portfolioApi
      .getResume()
      .then((data) => setResume(data || null))
      .catch(() => setResume(null))
      .finally(() => setResumeLoading(false));
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();
    const buttons = socialRef.current?.querySelectorAll(".btn") || [];
    gsap.set(buttons, { opacity: 0, y: 50 });
    tl.from(textsRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.3,
    });
    tl.from(
      socialRef.current,
      { x: -50, opacity: 0, duration: 0.7, ease: "power3.out" },
      "+=0",
    );
    tl.to(buttons, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: "back.out(2)",
    });
  });

  const handleResumeClick = () => {
    if (!resume?.file) return;
    window.open(buildAssetUrl(resume.file), "_blank");
  };

  return (
    <>
      <NavBar />
      <div className="flex w-full justify-between overflow-hidden max-lg:flex-col">
        <section className="relative h-screen w-[60%] bg-black overflow-hidden max-lg:w-full">
          <div className="relative z-10 h-full flex pt-30 px-6 md:px-20">
            <div ref={textsRef} className="max-w-xl text-white relative">
              <h1
                className="text-[70px] font-bold leading-none select-none max-md:text-[48px]"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: "transparent",
                  WebkitTextStroke: "2px rgba(255,255,255,0.9)",
                }}
              >
                {content.heroOutlineTitle || "Portfolio"}
              </h1>
              <span
                className="absolute -top-8 left-80 text-[200px] max-md:static max-md:block max-md:text-[92px]"
                style={{ fontFamily: "Mathildaine", color: "white" }}
              >
                {content.heroScriptTitle || "Developer"}
              </span>
              <p className="text-gray-300 mt-26 text-sm max-w-md leading-7">
                {content.heroDescription || "Portfolio content is loading."}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <StaggerButton
                  text="Hire Me"
                  hoverText="Get in touch ->"
                  onClick={() => window.location.assign("#contact")}
                />
                <button
                  type="button"
                  onClick={handleResumeClick}
                  disabled={resumeLoading || !resume?.file}
                  className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {resumeLoading
                    ? "Loading resume..."
                    : resume?.file
                      ? "Download Resume"
                      : "Resume Unavailable"}
                </button>
              </div>
              {resume?.title && (
                <p className="mt-3 text-xs tracking-[0.18em] uppercase text-gray-500">
                  Active file: {resume.title}
                </p>
              )}
            </div>
          </div>

          <div
            ref={socialRef}
            className="absolute bottom-0 -left-10 z-50 w-[90%] skew-x-45 max-lg:relative max-lg:left-0 max-lg:w-full max-lg:skew-x-0"
          >
            <div className="flex items-center justify-between bg-white px-20 py-3 max-lg:px-6 max-lg:py-4 max-lg:flex-wrap max-lg:gap-3">
              <div
                className="text-black -skew-x-45 max-lg:skew-x-0"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                Connect Me
              </div>
              <div className="flex gap-4 -skew-x-45 max-lg:skew-x-0">
                {content.githubUrl && (
                  <a
                    href={content.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn cursor-pointer px-5 py-3 border border-black rounded-md flex items-center gap-2 text-black hover:bg-black hover:text-white transition"
                  >
                    <FaGithub />
                  </a>
                )}
                {content.linkedinUrl && (
                  <a
                    href={content.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn cursor-pointer px-5 py-3 border border-black rounded-md flex items-center gap-2 text-black hover:bg-black hover:text-white transition"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {content.contactEmail && (
                  <a
                    href={`mailto:${content.contactEmail}`}
                    className="btn cursor-pointer px-5 py-3 border border-black rounded-md flex items-center gap-2 text-black hover:bg-black hover:text-white transition"
                  >
                    <MdEmail />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="w-[40%] max-lg:w-full max-lg:h-[50vh]">
          {content.heroImage ? (
            <img
              src={buildAssetUrl(content.heroImage)}
              alt={content.brandName || "Portfolio"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-zinc-900 via-neutral-800 to-zinc-700" />
          )}
        </section>
      </div>
    </>
  );
};

export default Home;

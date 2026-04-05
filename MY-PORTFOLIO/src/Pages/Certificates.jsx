import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Marquee from "../components/Marquee";
import { buildAssetUrl, portfolioApi } from "../services/api";
import { usePortfolioContent } from "../context/PortfolioContentContext";

gsap.registerPlugin(ScrollTrigger);

/* Pre-defined fan rotations for up to 5 cards */
const ROTATIONS = [-12, -6, 0, 6, 12];

const Certificates = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const titleRef = useRef(null);
  const { content } = usePortfolioContent();

  useEffect(() => {
    portfolioApi
      .getCertificates()
      .then((data) => setCertificates((data || []).slice(0, 5)))
      .catch(() => setCertificates([]))
      .finally(() => setLoading(false));
  }, []);

  /* Animate cards in once data is ready */
  useGSAP(
    () => {
      const cards = cardsRef.current.filter(Boolean);
      if (!cards.length) return;

      /* Staggered entrance from below */
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      /* Animate the heading in too */
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }

      ScrollTrigger.refresh();
    },
    { dependencies: [certificates] },
  );

  return (
    <>
      <section
        id="certificates"
        ref={sectionRef}
        className="relative w-full bg-white text-black py-[4rem] pb-[6rem] overflow-hidden"
      >
        {/* Section header */}
        <div className="px-[clamp(1.5rem,8vw,5rem)] mb-[3.5rem]" ref={titleRef}>
          <span className="block font-['Orbitron'] text-[clamp(64px,7vw,120px)] font-semibold uppercase tracking-[0.04em] text-transparent leading-none [-webkit-text-stroke:2px_rgba(0,0,0,0.85)]">
            Certificates
          </span>
          <p className="mt-4 max-w-[42rem] text-gray-500 leading-[1.75] text-[1rem]">
            Credentials earned through learning, projects and professional
            development.
          </p>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="px-[clamp(1.5rem,8vw,5rem)] flex gap-6 flex-wrap">
            {[1, 2, 3].map((x) => (
              <div
                key={x}
                className="w-[220px] h-[280px] rounded-2xl bg-black/5 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* No certificates */}
        {!loading && certificates.length === 0 && (
          <div className="px-[clamp(1.5rem,8vw,5rem)] flex min-h-[30vh] items-center justify-center">
            <p className="text-gray-400 text-xl">No certificates yet.</p>
          </div>
        )}

        {/* Certificate cards fan */}
        {!loading && certificates.length > 0 && (
          <div className="px-[clamp(1.5rem,8vw,5rem)] flex flex-wrap gap-6 justify-center items-end py-8">
            {certificates.map((item, i) => (
              <div
                key={item.id || i}
                ref={(el) => (cardsRef.current[i] = el)}
                onClick={() => setActiveImage(buildAssetUrl(item.image))}
                className="cursor-pointer group relative flex-shrink-0"
                style={{
                  transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`,
                  transformOrigin: "bottom center",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "rotate(0deg) scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)`)
                }
              >
                <div className="w-[200px] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-black/10 bg-white">
                  <div className="w-full h-[160px] overflow-hidden">
                    <img
                      src={buildAssetUrl(item.image)}
                      alt={item.title || `Certificate ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {item.title}
                    </p>
                    {item.issuer && (
                      <p className="text-[0.65rem] text-gray-400 mt-1 truncate uppercase tracking-wide">
                        {item.issuer}
                      </p>
                    )}
                    <p className="text-[0.6rem] text-black/30 mt-2 uppercase tracking-widest">
                      Click to expand
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Marquee items={content.marqueeItems || []} />

      {/* Lightbox */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:scale-110 transition"
          >
            ✕
          </button>

          <div
            className="max-w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeImage}
              alt="certificate-full"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;

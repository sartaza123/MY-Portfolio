import React, { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Marquee from '../components/Marquee';
import { buildAssetUrl, portfolioApi } from '../services/api';
import { usePortfolioContent } from '../context/PortfolioContentContext';

const Certificates = () => {
  const [activeImage, setActiveImage] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const certificatesRef = useRef();
  const sectionRef = useRef();
  const { content } = usePortfolioContent();

  useEffect(() => {
    portfolioApi
      .getCertificates()
      .then((data) => setCertificates((data || []).slice(0, 5)))
      .catch(() => setCertificates([]))
      .finally(() => setLoading(false));
  }, []);

  const rotations = [-6, -4, 0, 7, -3];

  useGSAP(() => {
    const cards = gsap.utils.toArray('.certificate-card');
    if (!cards.length) return;

    const center = (cards.length - 1) / 2;

    gsap.from(certificatesRef.current, {
      y: 200,
      opacity: 0,
      duration: 2,
      delay: 0.5,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 30%',
        end: 'top 25%',
      },
    });

    gsap.to(cards, {
      x: (i) => (i - center) * (cards.length < 3 ? 120 : 220),
      y: (i) => Math.abs(i - center) * -10,
      rotate: (i) => rotations[i % rotations.length],
      scale: (i) => 1 - Math.abs(i - center) * 0.05,
      zIndex: (i) => 100 - Math.abs(i - center),
      duration: 0.5,
      delay: 2,
      ease: 'power3.out',
      stagger: 0.05,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 25%',
        end: 'top 20%',
      },
    });
  }, { dependencies: [certificates] });

  return (
    <>
      <section
        id="certificates"
        ref={sectionRef}
        className="relative w-full bg-white h-[500px] text-black flex items-center justify-center overflow-hidden"
      >
        <h1
          className="relative z-10 text-[300px] leading-none text-black/80 text-center select-none max-md:text-[140px]"
          style={{ fontFamily: 'Mathildaine' }}
        >
          CertificaTes
          <span ref={certificatesRef} className="absolute inset-0 flex items-center justify-center">
            {(loading || certificates.length === 0) && (
              <p className="text-gray-400 text-xl">{loading ? 'Loading Certificates...' : 'No Certificates Yet'}</p>
            )}

            {certificates.map((item, i) => (
              <span
                key={item.id || i}
                className="certificate-card absolute w-[200px] h-[200px] flex items-center justify-center"
                onClick={() => setActiveImage(buildAssetUrl(item.image))}
              >
                <div
                  className="w-full h-full rounded-xl flex items-center justify-center transition duration-300 hover:scale-105 backdrop-blur-md bg-white/10 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.27)] before:absolute before:inset-0 before:rounded-xl before:bg-white/10 before:opacity-20 before:pointer-events-none"
                  style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
                >
                  <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/20 via-transparent to-white/10 opacity-30 pointer-events-none"></div>
                  <div className="w-[160px] h-[160px] rounded-lg overflow-hidden border border-white/20">
                    <img src={buildAssetUrl(item.image)} alt={item.title || `certificate-${i}`} className="w-full h-full object-cover" />
                  </div>
                </div>
              </span>
            ))}
          </span>
        </h1>
      </section>

      <Marquee items={content.marqueeItems || []} />

      {activeImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:scale-110 transition"
          >
            x
          </button>

          <div className="max-w-[90vw] max-h-[90vh] rounded-xl overflow-hidden shadow-2xl">
            <img src={activeImage} alt="certificate-full" className="w-full h-full object-contain" />
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;

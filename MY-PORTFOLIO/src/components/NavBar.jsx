import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';
import { usePortfolioContent } from '../context/PortfolioContentContext';

const NavBar = () => {
  const navRef = useRef();
  const { content } = usePortfolioContent();

  useGSAP(() => {
    gsap.from(navRef.current, {
      x: 20,
      opacity: 0,
      duration: 0.5,
      delay: 0.6,
      ease: 'power3.out',
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-10 md:px-20 py-2.5 border-b border-white/20"
    >
      <div className="text-2xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        {content.brandName || 'Portfolio'}
      </div>

      <div className="flex gap-8 max-md:hidden">
        <a href="#about" className="hover:text-gray-400 transition">About</a>
        <a href="#skills" className="hover:text-gray-400 transition">Skills</a>
        <a href="#certificates" className="hover:text-gray-400 transition">Certificates</a>
        <a href="#projects" className="hover:text-gray-400 transition">Projects</a>
      </div>
    </nav>
  );
};

export default NavBar;

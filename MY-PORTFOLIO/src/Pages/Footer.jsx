import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { usePortfolioContent } from '../context/PortfolioContentContext';

const Footer = () => {
  const { content } = usePortfolioContent();

  return (
    <footer className="bg-neutral-900 text-white px-6 md:px-20 py-10">
      <div className="flex flex-col lg:flex-row justify-between gap-10">
        <div className="max-w-2xl space-y-3">
          <div>
            <h2 className="text-xl font-semibold">{content.brandName || 'Portfolio'}</h2>
            <p className="text-gray-500 text-sm">{content.heroScriptTitle || 'Developer'}</p>
          </div>

          <h1 className="text-[clamp(32px,5vw,70px)] font-bold leading-tight">
            {content.contactHeading || "Let's build something exceptional."}
          </h1>

          <div>
            <a href="#contact" className="inline-block px-6 py-3 border border-white rounded-full hover:bg-white hover:text-black transition text-sm">
              Start a Project {'->'}
            </a>
          </div>

          <p className="text-gray-400 text-sm hover:text-white transition">
            {content.contactEmail ? <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a> : 'No email configured'}
          </p>
        </div>

        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-3 text-gray-400 text-sm">
            <a href="#about" className="block hover:text-white transition">About</a>
            <a href="#projects" className="block hover:text-white transition">Projects</a>
            <a href="#contact" className="block hover:text-white transition">Contact</a>
          </div>

          <div className="flex gap-5 text-lg">
            {content.githubUrl && <a href={content.githubUrl} target="_blank" rel="noreferrer" className="hover:-translate-y-1 transition duration-300"><FaGithub /></a>}
            {content.linkedinUrl && <a href={content.linkedinUrl} target="_blank" rel="noreferrer" className="hover:-translate-y-1 transition duration-300"><FaLinkedin /></a>}
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between text-xs text-gray-500">
        <p>© {new Date().getFullYear()} {content.brandName || 'Portfolio'}</p>
        <p>Built with MERN</p>
      </div>
    </footer>
  );
};

export default Footer;

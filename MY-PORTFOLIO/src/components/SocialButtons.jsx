import React from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const socials = [
  {
    icon: <FaGithub />,
    link: "https://github.com/yourusername",
    border: "border-white/10",
    glow: "hover:shadow-white/20",
    hoverColor: "group-hover:text-white",
  },
  {
    icon: <FaLinkedin />,
    link: "https://linkedin.com/in/yourusername",
    border: "border-blue-500/20",
    glow: "hover:shadow-blue-500/30",
    hoverColor: "group-hover:text-blue-400",
  },
  {
    icon: <MdEmail />,
    link: "mailto:yourmail@gmail.com",
    border: "border-pink-500/20",
    glow: "hover:shadow-pink-500/30",
    hoverColor: "group-hover:text-pink-400",
  },
  {
    icon: <FaYoutube />,
    link: "https://youtube.com/@yourchannel",
    border: "border-red-500/20",
    glow: "hover:shadow-red-500/30",
    hoverColor: "group-hover:text-red-400",
  },
];

const SocialButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {socials.map((item, i) => (
        <a
          key={i}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-4 rounded-full backdrop-blur-lg border ${item.border} bg-linear-to-tr from-black/60 to-black/40 shadow-lg hover:shadow-2xl ${item.glow} hover:scale-110 hover:rotate-3 active:scale-95 transition-all duration-300 ease-out cursor-pointer group relative overflow-hidden`}
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          {/* Icon */}
          <div
            className={`relative z-10 text-2xl text-white/70 ${item.hoverColor} transition-all duration-300`}
          >
            {item.icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialButtons;

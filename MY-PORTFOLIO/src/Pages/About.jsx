import AboutHeader from "../components/AboutHeader";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AboutCards from "../components/AboutCards";
import { usePortfolioContent } from "../context/PortfolioContentContext";

const About = () => {
  const descriptionRef = useRef();
  const { content } = usePortfolioContent();

  useGSAP(() => {
    gsap.from(descriptionRef.current, {
      y: 20,
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top 90%",
        end: "bottom 60%",
        scrub: 1.5,
      },
    });
  });

  return (
    <section
      id="about"
      className="relative bg-white text-black overflow-hidden"
    >
      <div className="relative z-20">
        <AboutHeader
          label={content.aboutLabel}
          outlineTitle={content.aboutOutlineTitle}
          scriptTitle={content.aboutScriptTitle}
        />
      </div>

      <div
        ref={descriptionRef}
        className="px-6 md:px-16 pb-20 max-w-3xl text-black"
      >
        <h3 className="text-6xl" style={{ fontFamily: "Mathildaine" }}>
          {content.aboutHeading || "About"}
        </h3>
        <p className="text-md leading-relaxed">
          {content.aboutDescription ||
            "About content will appear here once updated from the admin panel."}
        </p>
      </div>

      <AboutCards
        education={content.education}
        experience={content.experience}
        skills={content.personalSkills}
      />
    </section>
  );
};

export default About;

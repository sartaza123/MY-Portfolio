import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutCards = ({ education = [], experience = [], skills = [] }) => {
  const sectionRef = useRef();

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".about-card");

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              end: "top 60%",
              scrub: true,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  });

  return (
    <section ref={sectionRef} className="bg-white text-black p-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Education */}
        <div className="about-card p-6 md:p-8 border-b md:border-b-0 md:border-r border-black/70">
          <h2 className="text-2xl font-semibold mb-6">Education</h2>
          <div className="space-y-2 text-gray-700">
            {education.length === 0 && (
              <p className="text-sm text-gray-500">
                No education details added yet.
              </p>
            )}
            {education.map((item, i) => (
              <div key={`${item.title}-${i}`}>
                <p>
                  <span className="font-medium">{item.title}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  {item.institute} - {item.completeBy}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="about-card p-6 md:p-8 border-b md:border-b-0 md:border-r border-black/70">
          <h2 className="text-2xl font-semibold mb-6">Experience</h2>
          <div className="space-y-4 text-gray-700">
            {experience.length === 0 && (
              <p className="text-sm text-gray-500">
                No experience details added yet.
              </p>
            )}
            {experience.map((item, i) => (
              <div key={`${item.role}-${i}`}>
                <p className="font-medium">
                  {item.role}{" "}
                  <span className="text-sm text-gray-500 capitalize">
                    ({item.type})
                  </span>
                </p>
                <p className="text-gray-500 text-sm">
                  {item.organization} &bull; {item.duration}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Skills */}
        <div className="about-card p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Personal Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.length === 0 && (
              <p className="text-sm text-gray-500">
                No personal skills added yet.
              </p>
            )}
            {skills.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="px-3 py-1 rounded-full bg-black/5 border border-black/10 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCards;

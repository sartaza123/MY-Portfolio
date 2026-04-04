import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { portfolioApi } from "../services/api";
import { usePortfolioContent } from "../context/PortfolioContentContext";

gsap.registerPlugin(ScrollTrigger);

const Contacts = () => {
  const sectionRef = useRef();
  const leftRef = useRef();
  const formRef = useRef();
  const buttonRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const { content } = usePortfolioContent();

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(formRef.current, {
        x: 80,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    try {
      await portfolioApi.sendMessage(formData);
      setStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus(""), 4000);
    }
  };

  const handleMouseMove = (event) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <>
      {/* header */}
      <div className="px-[clamp(1.5rem,8vw,5rem)] mb-[3.5rem]">
        <span className="block font-['Orbitron'] text-[clamp(64px,10vw,120px)] font-semibold uppercase tracking-[0.04em] text-transparent leading-none [-webkit-text-stroke:2px_rgba(255,255,255,0.85)]">
          Contact
        </span>

        <p className="mt-4 max-w-[42rem] text-gray-500 leading-[1.75] text-[1rem]">
          Scroll to layer each project — hover any card to preview, click the
          image to go live.
        </p>
      </div>
      <section
        ref={sectionRef}
        className="w-full flex items-center py-10 max-lg:flex-col max-lg:gap-8"
      >
        <div
          ref={leftRef}
          className="relative z-10 pl-20 justify-center w-[55%] max-lg:w-full max-lg:pl-6 max-lg:pr-6"
        >
          <div className="bg-black text-white flex flex-col p-10 border-2 border-white rounded-2xl">
            <h1 className="text-[clamp(30px,5vw,70px)] font-bold leading-tight">
              {content.contactHeading || "Let's connect."}
            </h1>
            <p className="mt-8 text-gray-400 max-w-md text-lg leading-relaxed">
              {content.contactSubheading || "Use the form to reach out."}
            </p>
            <div className="mt-16 space-y-6 text-sm">
              <div>
                <p className="text-gray-500 uppercase tracking-widest">Email</p>
                <h3 className="text-lg font-medium">
                  {content.contactEmail ? (
                    <a href={`mailto:${content.contactEmail}`}>
                      {content.contactEmail}
                    </a>
                  ) : (
                    "No email configured"
                  )}
                </h3>
              </div>
              <div>
                <p className="text-gray-500 uppercase tracking-widest">
                  Location
                </p>
                <h3 className="text-lg font-medium">
                  {content.location || "Location unavailable"}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={formRef}
          className="relative z-20 flex flex-col w-[45%] -ml-20 max-lg:w-full max-lg:ml-0 max-lg:px-6"
        >
          <div className="flex items-center py-16 px-4 md:px-20 rounded-2xl bg-white text-black">
            <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-6">
              <div className="relative">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  required
                  className="peer w-full bg-transparent border-b border-black/30 py-4 outline-none focus:border-black"
                />
                <label className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black peer-valid:-top-3 peer-valid:text-xs">
                  Name
                </label>
              </div>
              <div className="relative">
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  className="peer w-full bg-transparent border-b border-black/30 py-4 outline-none focus:border-black"
                />
                <label className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black peer-valid:-top-3 peer-valid:text-xs">
                  Email
                </label>
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="peer w-full bg-transparent border-b border-black/30 py-4 outline-none focus:border-black"
                />
                <label className="absolute left-0 top-4 text-gray-500 text-sm transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-black peer-valid:-top-3 peer-valid:text-xs">
                  Message
                </label>
              </div>
              <div onMouseMove={handleMouseMove} onMouseLeave={handleLeave}>
                <button
                  ref={buttonRef}
                  type="submit"
                  disabled={status === "sending"}
                  className="px-6 py-3 border border-black rounded-full font-medium hover:bg-black hover:text-white transition-all"
                  style={{ opacity: status === "sending" ? 0.6 : 1 }}
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "sent"
                      ? "Message Sent"
                      : status === "error"
                        ? "Failed, try again"
                        : "Send Message ->"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contacts;

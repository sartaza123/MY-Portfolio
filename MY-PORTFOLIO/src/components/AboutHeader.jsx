import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const AboutHeader = ({ label, outlineTitle, scriptTitle }) => {
  const aboutRef = useRef();
  const heading1Ref = useRef();
  const heading2Ref = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 1.5,
      },
    });

    tl.from(aboutRef.current, {
      y: 40,
      opacity: 0,
    })
      .from(
        heading1Ref.current,
        {
          y: 40,
          opacity: 0,
        },
        '-=0.3',
      )
      .from(
        heading2Ref.current,
        {
          y: 40,
          opacity: 0,
        },
        '-=0.3',
      );
  });

  return (
    <section className="relative bg-white text-black py-32 px-6 md:px-16">
      <span
        ref={aboutRef}
        className="absolute top-10 left-6 md:left-16 text-4xl tracking-widest uppercase"
        style={{ fontFamily: 'Orbitron' }}
      >
        {label || 'About Me'}
      </span>

      <h1
        ref={heading1Ref}
        className="text-[150px] -mt-10 font-bold leading-none select-none"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          color: 'transparent',
          WebkitTextStroke: '2px rgba(0,0,0,0.9)',
        }}
      >
        {outlineTitle || 'WEBSITE'}
      </h1>

      <span
        ref={heading2Ref}
        className="absolute top-0 right-20 text-[400px]"
        style={{
          fontFamily: 'Mathildaine',
          color: 'black',
        }}
      >
        {scriptTitle || 'Designer'}
      </span>
    </section>
  );
};

export default AboutHeader;

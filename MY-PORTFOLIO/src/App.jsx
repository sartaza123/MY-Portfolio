import React, { lazy, Suspense, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Eagerly loaded — above the fold
import Home from "./Pages/Home";
import MouseFollower from "./components/MouseFollower";
import { PortfolioContentProvider } from "./context/PortfolioContentContext";

gsap.registerPlugin(ScrollTrigger);

// Lazy-loaded — below the fold
const About = lazy(() => import("./Pages/About"));
const Skills = lazy(() => import("./Pages/Skills"));
const Certificates = lazy(() => import("./Pages/Certificates"));
const Projects = lazy(() => import("./Pages/Projects"));
const Contacts = lazy(() => import("./Pages/Contacts"));
const Footer = lazy(() => import("./Pages/Footer"));

/** Lightweight fallback that doesn't shift layout */
const PageFallback = () => (
  <div style={{ minHeight: "100vh", background: "inherit" }} />
);

const App = () => {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 2000);
    return () => clearTimeout(id);
  }, []);

  return (
    <PortfolioContentProvider>
      <div className="relative bg-black text-white">
        <MouseFollower />
        <Home />
        <main className="relative z-10">
          <Suspense fallback={<PageFallback />}>
            <About />
          </Suspense>
          <Suspense fallback={<PageFallback />}>
            <Skills />
          </Suspense>
          <Suspense fallback={<PageFallback />}>
            <Certificates />
          </Suspense>
          <Suspense fallback={<PageFallback />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<PageFallback />}>
            <Contacts />
          </Suspense>
          <Suspense fallback={<PageFallback />}>
            <Footer />
          </Suspense>
        </main>
      </div>
    </PortfolioContentProvider>
  );
};

export default App;

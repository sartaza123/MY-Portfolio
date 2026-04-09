import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Disable browser scroll restoration and reset to top BEFORE React renders.
// Must live here (module scope) — useEffect runs after paint, too late to
// prevent GSAP from measuring wrong scroll-offset positions on reload.
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
// Remove hash from URL before React renders — browsers auto-scroll to the
// hash anchor (#skills, #contact etc.) after DOM loads, overriding scrollTo(0,0).
if (window.location.hash) {
  history.replaceState(null, "", window.location.pathname + window.location.search);
}
window.scrollTo(0, 0);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

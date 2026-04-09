import ScrollTrigger from "gsap/ScrollTrigger";

let _timer = null;
let _timer2 = null;

export function scheduleRefresh(delay = 600) {
  clearTimeout(_timer);
  clearTimeout(_timer2);
  _timer = setTimeout(() => {
    ScrollTrigger.refresh();
    // Second refresh 400 ms later catches any section whose API response
    // landed just after the first refresh fired (cached responses race).
    _timer2 = setTimeout(() => ScrollTrigger.refresh(), 400);
  }, delay);
}

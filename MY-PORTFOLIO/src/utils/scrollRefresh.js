import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Debounced ScrollTrigger.refresh().
 *
 * Skills and Projects both call this after setting up their ScrollTriggers.
 * Because they finish within milliseconds of each other (both are API-driven),
 * the debounce collapses the two calls into a single refresh that fires AFTER
 * both pin-spacer elements are in the DOM — fixing the cross-section overlap.
 */
let _timer = null;

export function scheduleRefresh(delay = 400) {
  clearTimeout(_timer);
  _timer = setTimeout(() => ScrollTrigger.refresh(), delay);
}

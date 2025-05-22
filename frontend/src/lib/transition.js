// src/lib/transition.js
import { writable, derived } from "svelte/store";

export const isTransitioning = writable(false);
export const transitionDirection = writable("out"); // 'out' or 'in'
export const transitionProgress = writable(0);

// Derived store for transition state
export const transitionState = derived(
  [isTransitioning, transitionDirection, transitionProgress],
  ([$isTransitioning, $transitionDirection, $transitionProgress]) => ({
    active: $isTransitioning,
    direction: $transitionDirection,
    progress: $transitionProgress,
  }),
);

let transitionTimeout;

export function startTransition(callback, options = {}) {
  const {
    duration = 600,
    easing = "cubic-bezier(0.4, 0, 0.2, 1)",
    showProgress = false,
  } = options;

  // Clear any existing transition
  if (transitionTimeout) {
    clearTimeout(transitionTimeout);
  }

  isTransitioning.set(true);
  transitionDirection.set("out");
  transitionProgress.set(0);

  // Animate progress if requested
  if (showProgress) {
    const progressInterval = setInterval(() => {
      transitionProgress.update((p) => {
        const newProgress = p + 2;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, duration / 50);
  }

  // Wait for the out transition to complete
  transitionTimeout = setTimeout(() => {
    callback(); // This should change the page content
    transitionDirection.set("in");
    transitionProgress.set(100);

    // Wait for the in transition to complete
    transitionTimeout = setTimeout(() => {
      isTransitioning.set(false);
      transitionProgress.set(0);
    }, duration);
  }, duration);
}

// Utility function for custom transitions
export function createCustomTransition(name, config = {}) {
  const {
    duration = 600,
    beforeTransition = () => {},
    afterTransition = () => {},
  } = config;

  return function (callback) {
    beforeTransition();

    startTransition(
      () => {
        callback();
        afterTransition();
      },
      { duration },
    );
  };
}

// Pre-defined transition types
export const transitions = {
  fade: createCustomTransition("fade", { duration: 400 }),
  slide: createCustomTransition("slide", { duration: 600 }),
  zoom: createCustomTransition("zoom", { duration: 500 }),
  swim: createCustomTransition("swim", {
    duration: 800,
    beforeTransition: () => console.log("Swimming to new page..."),
    afterTransition: () => console.log("Arrived at destination!"),
  }),
};

// Page transition observer for automatic transitions
export function observePageTransitions() {
  if (typeof window === "undefined") return;

  // Observe all internal links
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="/"]');
    if (link && !link.hasAttribute("data-no-transition")) {
      e.preventDefault();
      const href = link.getAttribute("href");

      startTransition(() => {
        window.history.pushState({}, "", href);
        // Trigger SvelteKit navigation
        window.dispatchEvent(new PopStateEvent("popstate"));
      });
    }
  });
}

// Initialize transition system
export function initTransitions() {
  if (typeof window === "undefined") return;

  // Set up page transition observer
  observePageTransitions();

  // Handle browser back/forward buttons
  window.addEventListener("popstate", () => {
    // Add subtle transition for browser navigation
    isTransitioning.set(true);
    transitionDirection.set("out");

    setTimeout(() => {
      transitionDirection.set("in");
      setTimeout(() => {
        isTransitioning.set(false);
      }, 300);
    }, 300);
  });
}

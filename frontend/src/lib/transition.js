// src/lib/transition.js
import { writable } from "svelte/store";

export const isTransitioning = writable(false);
export const transitionDirection = writable("out"); // 'out' or 'in'

export function startTransition(callback) {
  isTransitioning.set(true);
  transitionDirection.set("out");

  // Wait for the out transition to complete
  setTimeout(() => {
    callback(); // This should change the page content
    transitionDirection.set("in");

    // Wait for the in transition to complete
    setTimeout(() => {
      isTransitioning.set(false);
    }, 600); // Match the CSS transition duration
  }, 600); // Match the CSS transition duration
}

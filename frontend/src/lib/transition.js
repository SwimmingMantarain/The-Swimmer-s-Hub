// src/lib/transition.js
import { writable } from "svelte/store";

export const isTransitioning = writable(false);

export function fadeTransition(callback, duration = 300) {
  isTransitioning.set(true);

  setTimeout(() => {
    callback();
    setTimeout(() => {
      isTransitioning.set(false);
    }, duration);
  }, duration);
}

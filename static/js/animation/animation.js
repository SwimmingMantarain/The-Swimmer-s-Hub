document.addEventListener("DOMContentLoaded", () => {
  // Enhance bubble animation
  const body = document.body;

  // Create bubbles with varied sizes and animations
  for (let i = 0; i < 30; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    // Random sizes between 10px and 40px
    const size = 10 + Math.random() * 30;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;

    // Random position
    bubble.style.left = `${Math.random() * 100}%`;

    // Random delay and duration for more natural movement
    bubble.style.animationDelay = `${Math.random() * 15}s`;
    bubble.style.animationDuration = `${8 + Math.random() * 20}s`;

    // Random opacity
    bubble.style.opacity = `${0.1 + Math.random() * 0.5}`;

    body.appendChild(bubble);
  }

  // Add gradient animation to background
  document.body.classList.add("animate-bg");

  // Animate elements as they enter viewport
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all fieldsets, session-containers and other major elements
  document
    .querySelectorAll(
      "fieldset, .session-container, .profile-header, .action-buttons a",
    )
    .forEach((el) => {
      el.classList.add("animate-element");
      observer.observe(el);
    });
});

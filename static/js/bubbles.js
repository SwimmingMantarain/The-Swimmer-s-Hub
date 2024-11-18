document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;

    for (let i = 0; i < 20; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        bubble.style.animationDuration = `${5 + Math.random() * 5}s`;
        body.appendChild(bubble);
    }
});
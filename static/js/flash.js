document.addEventListener("DOMContentLoaded", function () {
  const flashes = document.querySelectorAll(".flashes li");

  flashes.forEach((flash) => {
    // Add entrance animation
    flash.style.transform = "translateY(-20px)";
    flash.style.opacity = "0";

    setTimeout(() => {
      flash.style.transition = "all 0.3s ease";
      flash.style.transform = "translateY(0)";
      flash.style.opacity = "1";
    }, 10);

    // Make flashes clickable to dismiss
    flash.addEventListener("click", function () {
      this.style.opacity = "0";
      this.style.transform = "translateY(-10px)";

      setTimeout(() => {
        this.remove();
      }, 300);
    });

    // Auto remove after delay
    setTimeout(() => {
      flash.style.opacity = "0";
      flash.style.transform = "translateY(-10px)";

      setTimeout(() => {
        flash.remove();
      }, 300);
    }, 3000);
  });
});

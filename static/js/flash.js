document.addEventListener("DOMContentLoaded", function () {
  const flashes = document.querySelectorAll(".flashes li");
  flashes.forEach((flash) => {
    flash.addEventListener("click", function () {
      this.style.opacity = "0";
      this.remove();
    });
    setTimeout(() => {
      flash.remove();
    }, 2000);
  });
});

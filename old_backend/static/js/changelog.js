document.addEventListener("DOMContentLoaded", function () {
  const changelogModal = document.getElementById("changelog-modal");
  const closeChangelogBtn = document.querySelector(".close-changelog");

  // Note: Modal open is now handled by markdown-renderer.js
  
  // Close modal when X is clicked
  if (closeChangelogBtn && changelogModal) {
    closeChangelogBtn.addEventListener("click", function () {
      changelogModal.style.display = "none";
    });
  }

  // Close modal when clicking outside
  if (changelogModal) {
    window.addEventListener("click", function (event) {
      if (event.target === changelogModal) {
        changelogModal.style.display = "none";
      }
    });
  }
});
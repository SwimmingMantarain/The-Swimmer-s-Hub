document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('input[type="text"]');

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();
    filterMeets(searchTerm);
  });

  function filterMeets(searchTerm) {
    const rows = document.querySelectorAll("table tbody tr:not(:first-child)");

    rows.forEach(function (row) {
      const meetNameCell = row.querySelector("td.Name a");
      if (!meetNameCell) return;

      const meetName = meetNameCell.textContent.toLowerCase();

      if (meetName.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
});

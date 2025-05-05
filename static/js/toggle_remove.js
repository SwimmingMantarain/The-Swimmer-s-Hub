document.addEventListener("DOMContentLoaded", function () {
  const removeToggle = document.getElementById("remove-toggle");
  let removeModeString = document.getElementById("is-toggled");
  let removeMode = removeModeString.value === "true";
  const meatTable = document.getElementById("meat-table");

  // Update the toggle button text initially
  removeToggle.textContent = removeMode ? "Remove Mode On" : "Remove Mode Off";

  removeToggle.addEventListener("click", function () {
    removeMode = !removeMode;
    removeToggle.textContent = removeMode
      ? "Remove Mode On"
      : "Remove Mode Off";
    removeModeString.value = removeMode;

    // Update the table class based on mode
    if (removeMode) {
      meatTable.classList.add("remove-mode");
    } else {
      meatTable.classList.remove("remove-mode");
    }

    // Add or remove delete buttons
    updateDeleteButtons();
  });

  function updateDeleteButtons() {
    const meetRows = document.querySelectorAll(
      "#meat-table tbody tr:not(:first-child)",
    );
    const headerRow = document.querySelector(
      "#meat-table tbody tr:first-child",
    );

    if (removeMode) {
      // Add header column for delete buttons if not present
      if (headerRow && !headerRow.querySelector(".actions-header")) {
        const actionsHeader = document.createElement("th");
        actionsHeader.className = "actions-header";
        actionsHeader.textContent = "Actions";
        headerRow.appendChild(actionsHeader);
      }

      // Add delete buttons to each row
      meetRows.forEach((row) => {
        if (!row.querySelector(".delete-btn")) {
          const deleteCell = document.createElement("td");
          deleteCell.className = "delete-cell";

          const deleteBtn = document.createElement("button");
          deleteBtn.className = "delete-btn";
          deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

          deleteBtn.addEventListener("click", function () {
            deleteMeet(row);
          });

          deleteCell.appendChild(deleteBtn);
          row.appendChild(deleteCell);
        }
      });
    } else {
      // Remove delete buttons and header column
      if (headerRow) {
        const actionsHeader = headerRow.querySelector(".actions-header");
        if (actionsHeader) {
          headerRow.removeChild(actionsHeader);
        }
      }

      // Remove delete cells from each row
      meetRows.forEach((row) => {
        const deleteCell = row.querySelector(".delete-cell");
        if (deleteCell) {
          row.removeChild(deleteCell);
        }
      });
    }
  }

  function deleteMeet(row) {
    // Get the meet ID from a data attribute
    const meetId = row.getAttribute("data-meet-id");

    if (!meetId) {
      console.error("No meet ID found for this row");
      return;
    }

    // Send AJAX request to delete the meet
    fetch("/db/api/delete_meet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ meet_id: meetId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Remove row from the DOM
          row.remove();

          // Show a success message
          const flashContainer = document.querySelector(".flash-container");
          const flashMessage = document.createElement("ul");
          flashMessage.className = "flashes";
          flashMessage.innerHTML = `<li class="flash">${data.message}</li>`;
          flashContainer.appendChild(flashMessage);

          // Hide the message after 3 seconds
          setTimeout(() => {
            flashMessage.remove();
          }, 3000);

          // Check if there are any meets left
          const remainingMeets = document.querySelectorAll(
            "#meat-table tbody tr:not(:first-child)",
          );
          if (remainingMeets.length === 0) {
            // Replace table with empty state
            const meatSection = document.getElementById("meat-section");
            const table = document.getElementById("meat-table");
            const actionButtonsDiv = document.querySelector(
              ".meets-action-buttons",
            );

            // Remove table and action buttons div
            if (table) meatSection.removeChild(table);
            if (actionButtonsDiv) meatSection.removeChild(actionButtonsDiv);

            // Add empty state
            const emptyState = document.createElement("div");
            emptyState.className = "empty-state";
            emptyState.innerHTML = `
            No upcoming meets yet!
            <button class="add-meets-btn" onclick="location.href = '/user/meets/add';">Add some Meets!</button>
          `;
            meatSection.appendChild(emptyState);
          }
        } else {
          console.error("Error deleting meet:", data.message);
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while deleting the meet");
      });
  }

  // Initialize delete buttons if remove mode is active on page load
  if (removeMode) {
    meatTable.classList.add("remove-mode");
    updateDeleteButtons();
  }
});

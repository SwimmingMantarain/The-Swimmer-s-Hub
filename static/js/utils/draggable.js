document.addEventListener("DOMContentLoaded", function () {
  const draggableElements = document.querySelectorAll(".profile-section");

  // Load any saved positions from localStorage
  loadPositions();

  draggableElements.forEach((element) => {
    makeDraggable(element);
  });

  function makeDraggable(element) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    let isDragging = false;

    // Use the legend as the handle for dragging
    const header = element.querySelector("legend");

    if (header) {
      // Add visual indicator that it's draggable
      header.style.cursor = "move";
      header.innerHTML += ' <span style="font-size: 0.8em;">✥</span>';

      // Set up the drag event on the header
      header.onmousedown = dragMouseDown;

      // Double click to reset position
      header.addEventListener("dblclick", function () {
        resetPosition(element);
      });
    } else {
      element.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();

      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;

      // Set up the document-level event listeners
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;

      // Mark as dragging and style
      isDragging = true;
      element.classList.add("dragging");
      element.style.opacity = "0.8";
      element.style.zIndex = "1000";
    }

    function elementDrag(e) {
      if (!isDragging) return;

      e = e || window.event;
      e.preventDefault();

      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      // Set the element's new position
      if (element.style.position !== "absolute") {
        const rect = element.getBoundingClientRect();
        element.style.position = "absolute";
        element.style.top = rect.top + window.scrollY + "px";
        element.style.left = rect.left + "px";
        element.style.width = rect.width - 40 + "px"; // Adjust width for padding
      } else {
        element.style.top = element.offsetTop - pos2 + "px";
        element.style.left = element.offsetLeft - pos1 + "px";
      }
    }

    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;

      if (isDragging) {
        element.classList.remove("dragging");
        element.style.opacity = "1";

        // Save the position
        savePositions();

        isDragging = false;
      }
    }
  }

  // Reset element to its original position in the flow
  function resetPosition(element) {
    element.style.position = "";
    element.style.top = "";
    element.style.left = "";
    element.style.width = "";
    element.style.zIndex = "";

    // Remove from localStorage
    const id = element.id;
    const savedPositions = JSON.parse(
      localStorage.getItem("profileLayout") || "{}",
    );
    if (savedPositions[id]) {
      delete savedPositions[id];
      localStorage.setItem("profileLayout", JSON.stringify(savedPositions));
    }
  }

  // Save positions to localStorage
  function savePositions() {
    const positions = {};

    draggableElements.forEach((element) => {
      if (element.style.position === "absolute") {
        positions[element.id] = {
          top: element.style.top,
          left: element.style.left,
          width: element.style.width,
          zIndex: element.style.zIndex,
        };
      }
    });

    localStorage.setItem("profileLayout", JSON.stringify(positions));
  }

  // Load positions from localStorage
  function loadPositions() {
    const savedPositions = JSON.parse(
      localStorage.getItem("profileLayout") || "{}",
    );

    draggableElements.forEach((element) => {
      const id = element.id;
      if (savedPositions[id]) {
        element.style.position = "absolute";
        element.style.top = savedPositions[id].top;
        element.style.left = savedPositions[id].left;
        element.style.width = savedPositions[id].width;
        element.style.zIndex = savedPositions[id].zIndex || "1000";
      }
    });
  }

  // Add reset button
  const profileContainer = document.querySelector(".profile-container");
  if (profileContainer) {
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "layout-controls";
    controlsDiv.style.cssText =
      "position: fixed; bottom: 20px; right: 20px; z-index: 1001; display: flex; gap: 10px;";

    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Layout";
    resetButton.className = "reset-layout-btn";
    resetButton.onclick = function () {
      draggableElements.forEach((element) => resetPosition(element));
      localStorage.removeItem("profileLayout");
    };

    const helpText = document.createElement("div");
    helpText.innerHTML =
      "Tip: Drag sections by their headers. Double-click a header to reset its position.";
    helpText.style.cssText =
      "position: fixed; bottom: 60px; right: 20px; color: #61dafb; font-size: 0.8em; max-width: 200px; text-align: right;";

    controlsDiv.appendChild(resetButton);
    profileContainer.appendChild(controlsDiv);
    profileContainer.appendChild(helpText);
  }
});

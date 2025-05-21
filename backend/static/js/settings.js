const clear_id_button = document.getElementById("clear_id");
const delete_account_button = document.getElementById("delete_account");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModalBtn");
const modalLegend = document.getElementById("modal-legend");

if (clear_id_button) {
  clear_id_button.addEventListener("click", function () {
    fetch("/db/post/remove_sr_id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("beans"),
    })
      .then((response) => response.json())
      .then((data) => location.reload());
  });
}

delete_account_button.addEventListener("click", function () {
  fetch("/db/post/delete_account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify("beans"),
  }).then((response) => location.reload());
});

closeBtn.onclick = function () {
  modal.style.display = "none";
};

// Close modal when clicking outside of the modal content
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

const chgPswrdBtn = document.getElementById("change_password");

chgPswrdBtn.addEventListener("click", function () {
  modalLegend.textContent = "Change Password";
  modal.style.display = "flex";

  let modal_content = document.getElementById("modal-content");

  modal_content.innerHTML = `
    <form id="password-form" class="modal-form">
        <div class="form-group">
            <label for="old_pswd">Old Password</label>
            <input type="password" id="old_pswd" name="old_pswd" required />
        </div>
        <div class="form-group">
            <label for="new_pswd">New Password</label>
            <input type="password" id="new_pswd" name="new_pswd" required />
        </div>
        <div class="form-group">
            <label for="confirm_pswd">Confirm New Password</label>
            <input
                type="password"
                id="confirm_pswd"
                name="confirm_pswd"
                required
            />
        </div>
        <button type="submit" id="chg-pswd">Change Password</button>
    </form>
  `;

  // Add event listener to the newly created form
  document
    .getElementById("password-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const newPassword = document.getElementById("new_pswd").value;
      const confirmPassword = document.getElementById("confirm_pswd").value;

      // Check if passwords match
      if (newPassword !== confirmPassword) {
        displayFormError("Passwords do not match!");
        return;
      }

      // Collect form data
      const formData = new FormData(this);

      // Send password change request
      fetch("/db/post/change_password", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Close modal
          modal.style.display = "none";

          // Create a flash message element
          const flashMessage = document.createElement("li");
          flashMessage.className = "flash";
          flashMessage.textContent = "Password changed successfully!";

          // Find or create flashes container
          let flashes = document.querySelector(".flashes");
          if (!flashes) {
            flashes = document.createElement("ul");
            flashes.className = "flashes";
            document.querySelector(".flash-container").appendChild(flashes);
          }

          // Add the flash message
          flashes.appendChild(flashMessage);

          // Set timeout to remove the flash message
          setTimeout(() => {
            flashMessage.style.opacity = "0";
            setTimeout(() => {
              if (flashMessage.parentNode) {
                flashMessage.parentNode.removeChild(flashMessage);
              }
            }, 500);
          }, 3000);

          // Reload page after a short delay
          setTimeout(() => {
            location.reload();
          }, 1000);
        })
        .catch((error) => {
          displayFormError("An error occurred. Please try again.");
          console.error("Error:", error);
        });
    });
});

// Function to display form errors
function displayFormError(message) {
  // Check if an error message already exists and remove it if it does
  const existingError = document.querySelector(".form-error");
  if (existingError) {
    existingError.remove();
  }

  // Create error element
  const errorElement = document.createElement("div");
  errorElement.className = "form-error";
  errorElement.textContent = message;
  errorElement.style.color = "var(--error)";
  errorElement.style.marginTop = "10px";
  errorElement.style.marginBottom = "10px";
  errorElement.style.padding = "8px";
  errorElement.style.borderRadius = "var(--border-radius)";
  errorElement.style.backgroundColor = "rgba(214, 40, 40, 0.1)";

  // Insert before the submit button
  const submitButton = document.getElementById("chg-pswd");
  submitButton.parentNode.insertBefore(errorElement, submitButton);
}

document.addEventListener("DOMContentLoaded", function () {
  const removeToggle = document.getElementById("remove-toggle");
  let removeModeString = document.getElementById("is-toggled");
  let removeMode = removeModeString === "true";

  removeToggle.addEventListener("click", function () {
    removeMode = !removeMode;
    removeToggle.textContent = removeMode
      ? "Remove Mode On"
      : "Remove Mode Off";
    removeModeString.value = removeMode;

    console.log(removeMode);
  });
});

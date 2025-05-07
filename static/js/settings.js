const clear_id_button = document.getElementById("clear_id");
const change_id_button = document.getElementById("change_id");

clear_id_button.addEventListener("click", function () {
  fetch("/db/post/remove_sr_id", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify("beans"),
  })
    .then((response) => response.json())
    .then((data) => location.reload());
});

change_id_button.addEventListener("click", function () {
  console.log("change");
});

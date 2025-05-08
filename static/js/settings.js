const clear_id_button = document.getElementById("clear_id");
const delete_account_button = document.getElementById("delete_account");

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

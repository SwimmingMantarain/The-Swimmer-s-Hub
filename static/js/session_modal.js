function openModal(session_id) {
  const modal = document.getElementById("myModal");

  // Find session info from the clicked element
  const sessionElement = document.getElementById(session_id);
  const sessionDate = sessionElement.textContent.trim().split("@")[0].trim();
  const sessionTime = sessionElement.textContent
    .trim()
    .split("@")[1]
    .split("Delete")[0]
    .trim();

  // Update session details in modal
  const detailsElement = modal.querySelector(".session-details");
  detailsElement.textContent = `Date: ${sessionDate} | Time: ${sessionTime}`;

  getSessionImage(session_id).then((image_url) => {
    // edit the <img> tag source
    const tag = modal.getElementsByTagName("img")[0];
    tag.src = image_url;
  });

  modal.style.display = "flex";
}

async function getSessionImage(session_id) {
  const response = await fetch(`/fetch_session/${session_id}`);
  const data = await response.blob();
  const image_url = URL.createObjectURL(data);
  return image_url;
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

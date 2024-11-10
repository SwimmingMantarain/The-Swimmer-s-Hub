function openModal(session_id) {
    modal = document.getElementById("myModal");

    getSessionImage(session_id).then(image_url => {
        // edit the <img> tag source
        tag = modal.getElementsByTagName("img")[0];
        tag.src = image_url;
    });

    modal.style.display = "block";

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
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

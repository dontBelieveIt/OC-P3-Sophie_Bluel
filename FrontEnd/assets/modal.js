const openModal = document.querySelector("#data-open-modal");
const modal = document.querySelector("#data-modal");
const closeModal = document.querySelector("#data-close-modal");
const dialog = document.querySelector("dialog");

// To open the Modal onclick
openModal.onclick = function() {
  modal.style.display = "block"; 
  dialog.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
  dialog.style.display = "none";
};
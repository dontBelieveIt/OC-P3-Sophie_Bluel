const openModal = document.querySelector("#data-open-modal"),
      modal = document.querySelector("#data-modal"),
      closeModal = document.querySelector("#data-close-modal"),
      dialog = document.querySelector("dialog");
      ;
      

openModal.addEventListener("click", () => {
  modal.style.display = "block"; 
  dialog.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  dialog.style.display = "none";
});

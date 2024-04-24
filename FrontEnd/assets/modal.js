// To fetch the ressources in the gallerie-content of the modal
const response = await fetch('http://localhost:5678/api/works');
let works = await response.json(); 

// const for first modal
const openModal = document.querySelector("#data-open-modal");
const modal = document.querySelector("#data-modal");
const closeModal = document.querySelector(".btn-close-modal");
const dialog = document.querySelector("dialog");
// const for the add photo modal
const openAddPhotoModal = document.getElementById("openAddModal"); 
const addPhotoModal = document.getElementById("addPhotoModal");
const btnReturnMainModal = document.getElementById("return-main-modal");
// const overlay = document.querySelector(".overlay");
/**********************************************Open and close modal**********************************************************/
// To open the Modal onclick
openModal.onclick = function() {
  modal.style.display = "block"; 
  dialog.style.display = "block";

  addPhotoModal.style.display = "none";
  // overlay.style.display = "block"; 
};

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
  dialog.style.display = "none";

  addPhotoModal.style.display = "none";
  // overlay.style.display = "none";
};

/**********************************************generer photo galerie for modal**********************************************************/
const modalWorks = document.querySelector(".gallery-content");
function genererModalPhotos(works){
    for (let i = 0; i < works.length; i++) {

        const modalPhotos = works[i];
        const modalFigure = document.createElement("figure");
        const modalPhotoURL = document.createElement("img");
        modalPhotoURL.src = modalPhotos.imageUrl;
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = `<span class="material-symbols-outlined">
        delete
        </span>`

        modalWorks.appendChild(modalFigure);
        modalFigure.appendChild(modalPhotoURL); 
        modalFigure.appendChild(deleteButton);
     }
}
genererModalPhotos(works);

/**********************************************Add photo Modal**********************************************************/
openAddPhotoModal.onclick = function() {
  modal.style.display = "none"; 
  addPhotoModal.style.display = "block";
}
btnReturnMainModal.onclick = function() {
  modal.style.display = "block"; 
  addPhotoModal.style.display = "none";
}


// // Check if the user has a token
// const token = sessionStorage.getItem("authToken");
// if (token) {
//     // User has a token, perform actions accordingly
//     showDialog(); // Show the dialog
//     openModal.style.display = 'block'; // Display the logout button
// } else {
//     // User does not have a token, perform other actions if needed
//     // For example, redirect to the login page
//     openModal.style.display = "none";
//     window.location.href = "login.html";
// }

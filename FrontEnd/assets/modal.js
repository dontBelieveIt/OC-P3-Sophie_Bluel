// To fetch the ressources in the gallerie-content of the modal
const response = await fetch('http://localhost:5678/api/works');
let works = await response.json(); 
/**********************************************Open and close modal**********************************************************/
const openModal = document.querySelector("#data-open-modal");
const modal = document.querySelector("#data-modal");
const closeModal = document.querySelector(".btn-close-modal");
const dialog = document.querySelector("dialog");
// const overlay = document.querySelector(".overlay");

// To open the Modal onclick
openModal.onclick = function() {
  modal.style.display = "block"; 
  dialog.style.display = "block";
  // overlay.style.display = "block"; 
};

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function() {
  modal.style.display = "none";
  dialog.style.display = "none";
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
        
        modalWorks.appendChild(modalFigure);
        modalFigure.appendChild(modalPhotoURL); 
     }
}
genererModalPhotos(works);


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

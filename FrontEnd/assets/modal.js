/**
 *Here is all element in regards with the Modal and its functions. 

Contents: 
  Open and close modal :  Line "" 
  *Open modal & Close modal onlick function(); 
  Generate Photos : Line "" ;
  Delete Photo Modal : Line ""; 
  Add Photo Modal : Line ""; 

  For the login() and looged() function, go see the userLogin.js file (../assets/userLogin.js); 
  For the gallery section of the index.html file and the filter button, see the filter.js file (../assets/filter.js); 
 */



// To fetch the ressources in the gallerie-content for the modal
  const resp = await fetch('http://localhost:5678/api/works');
  let works = await resp.json(); 
// Authentification token requiered for the modals to appear as well as the "Delete" and "Add Work" functions. 
  let token = sessionStorage.getItem("authenticationToken");  



/**********************************************Open and close modal**********************************************************/

// Query selector elements for first modal
  const openModal = document.querySelector("#data-open-modal");
  const modal = document.querySelector("#data-modal");
  const closeModal = document.getElementById("data-close-modal");
  const dialog = document.querySelector("dialog");
// Query selector element for the add photo modal to appear (from the first modal, via the "Add Photo" Button)
  const openAddPhotoModal = document.getElementById("openAddModal"); 
  const addPhotoModal = document.getElementById("addPhotoModal");
  const btnReturnMainModal = document.getElementById("return-main-modal");
// const overlay = document.querySelector(".overlay");

// To open the Modal onclick
openModal.onclick = function() {
  // for the main modal, the one appearing as you cilck "Modifier" from the index.html file. 
  modal.style.display = "block"; 
  dialog.style.display = "block";

  // for the modal accessible via the main modal ; this one appears while clicking on the "Ajouter Photo" from the main modal
  // this modal will be qualified as the addPhoto modal in this whole file, whislt the initial modal will be defined as, simply, the modal. 
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



/**********************************************Generate photo**********************************************************/

// Function for the photos to appear in the modal, (duplication from the generatePhoto(works) (function from the "assets/filter.js" file))
const modalWorks = document.querySelector(".gallery-content");
function genererModalPhotos(works){
    for (let i = 0; i < works.length; i++) {

        const modalPhotos = works[i];
        const modalFigure = document.createElement("figure");
        const modalPhotoURL = document.createElement("img");
        modalPhotoURL.src = modalPhotos.imageUrl;
        modalPhotoURL.alt = modalPhotos.alt; 
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = `<span class="material-symbols-outlined">
        delete
        </span>`;
        // deleteButton.id = `${works[i].id}`;
        // worksdid = deleteButton.id ;
        // console.log(deleteButton.id);
        
        modalWorks.appendChild(modalFigure);
        modalFigure.appendChild(modalPhotoURL); 
        modalFigure.appendChild(deleteButton);

        // deleteButtonFunction(modalFigure);
    }
}
genererModalPhotos(works);



/******************************************************************************************************************************************
 *********************************************** delete photo modal***************************************************************************
 ******************************************************************************************************************************************/

//  async function deleteWork(worksid) {

//   deleteBtn = document.querySelectorAll("delete-btn");
//     console.log(deleteBtn);

//   deleteBtn.addEventListener('click', () => {
//     try {
//         fetch(`http://localhost:5678/api/works/${worksdid}`, {
//         method: "DELETE",
//         headers: {
//           accept: "*/*",
//           authorization: `Bearer ${token}`,
//       }
//       })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Erreur lors de la suppression  du travail'); 
//         }
//         return response; 
//       })
//     } catch (error) {
//       console.error(error);
//     };
//   })
// }

// async function deleteButtonFunction(imgFigure, imgGallery) {

//   if (worksid === deleteButton.id) {
//     await deleteWork(worksid); 

//     imgGallery.remove();
//     imgFigure.remove();
//     location.reload();

//     alert("Suppression réussie"); 
//   };
  
//   console.error(error); 
// }
  

/******************************************************************************************************************************************
 *********************************************** add photo modal***************************************************************************
 ******************************************************************************************************************************************/
openAddPhotoModal.onclick = function() {
  modal.style.display = "none"; 
  addPhotoModal.style.display = "block";
 
  const closeAddModal = document.getElementById("add-close-modal"); 
  closeAddModal.onclick = function() {
    modal.style.display = "none"; 
    addPhotoModal.style.display = "none";
  }
}; 

btnReturnMainModal.onclick = function() {
  modal.style.display = "block"; 
  addPhotoModal.style.display = "none";
};

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



// Authentification token requiered for the modals to appear as well as the "Delete" and "Add Work" functions. 
  let token = sessionStorage.getItem("authenticationToken");  
  console.log(token);


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

function genererModalPhotos(){
  // To fetch the ressources in the gallerie-content for the modal
  fetch('http://localhost:5678/api/works')
    .then(resp => resp.json())
    .then(works => {
    
      console.log(works);
      works.forEach(item => {

        // Creation des figures et images de la modal
        const modalFigure = document.createElement("figure");
        modalFigure.id = `figure-${item.id}`;
        const modalPhotoURL = document.createElement("img");
        modalPhotoURL.src = item.imageUrl;
        modalPhotoURL.alt = item.alt; 
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
        deleteButton.setAttribute("dataId", item.id);
        
        modalWorks.appendChild(modalFigure);
        modalFigure.appendChild(modalPhotoURL); 
        modalFigure.appendChild(deleteButton);

        // Event listener for the delete work function 
        deleteButton.addEventListener("click", deleteWork);         
      })
    })
}
genererModalPhotos();



/******************************************************************************************************************************************
 *********************************************** delete photo modal***************************************************************************
 ******************************************************************************************************************************************/
function deleteWork(e) {

  console.log(e.currentTarget);
  const thisShit = e.currentTarget.getAttribute("dataId");
  console.log(thisShit);
  document.getElementById(`figure-${thisShit}`).style.backgroundColor = "blue"; 

  fetch(`http://localhost:5678/api/works/${thisShit}`, {
    method: 'DELETE',
    headers: { 
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    } 
 })
 .then(response => {
    if (response.ok) {
        alert("Delete successful !")
    }
    return response.json();
  })
.catch(error => {
  console.error(error);
  alert('Une erreur s\'est produite lors de l\'ajout du travail');
  reject(error);
});
};

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

/**
 *Here is all element in regards with the Modal and its functions. 

Contents: 
  editMode function : Line ""
  Open and close modal :  Line "" 
  *Open modal & Close modal onlick function(); 
  Generate Photos : Line "" ;
  Delete Photo Modal : Line ""; 
  Add Photo Modal : Line ""; 

  For the login() and looged() function, go see the userLogin.js file (../assets/userLogin.js); 
  For the gallery section of the index.html file and the filter button, see the filter.js file (../assets/filter.js); 
 */



// Authentification token requiered for the modals to appear as well as the "Delete" and "Add Work" functions. 


/**********************************************Open and close modal**********************************************************/

// Query selector elements for first modal
const openModal = document.getElementById("data-open-modal");
const modal = document.querySelector("#data-modal");
const closeModal = document.getElementById("data-close-modal");
const dialog = document.querySelector("dialog");
// Query selector element for the add photo modal to appear (from the first modal, via the "Add Photo" Button)
const openAddPhotoModal = document.getElementById("openAddModal"); 
const addPhotoModal = document.getElementById("addPhotoModal");
const btnReturnMainModal = document.getElementById("return-main-modal");
// const overlay = document.querySelector(".overlay");

// This function check, in the first place, the presence of the authentication token. If present, then the "edit" button is present. 
//***if not present, the edit button is hidden. 
//***if the edit button is shown, then, once clicked, it opens the modal, where deleting and/or adding a new work is possible. 
function editMode() {
const token = sessionStorage.getItem("authenticationToken");
if (token) {
  openModal.style.display = "flex"; 

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
} else {
  // openModal.style.display = "none";
}
}

/*
function showModal() {
const modalLocation = document.getElementById("modalsAreHere"); 
modalLocation.innerHTML = `
  <!-- main modal -->
  <dialog hidden id="data-modal" class="modal">
    <div class="modal-content">
      <button id="data-close-modal" class="btn-close-modal"><span class="material-symbols-outlined">close</span></button>
      <h1>Galerie photo</h1>
      <div class="gallery-content"></div>
      <hr>
      <button id="openAddModal" class="dialog-btn btn-green btn">Ajouter une photo</button>
    </div>
  </dialog>

  <!-- add photo modal -->
  <dialog hidden id="addPhotoModal" class="modal">
    <div class="add-photo-modal modal-content">
      <button id="add-close-modal" class="btn-close-modal"><span class="material-symbols-outlined">close</span></button>
      <button id="return-main-modal" class="btn-return"><span class="material-symbols-outlined">arrow_back</span></button>
      <h1>Ajout photo</h1>
      <form action="#" method="post" id="addPhoto">
        <div class="add-img">
          <span class="material-symbols-outlined">image</span>
          <input type="file" name="myImage" accept="image/png, image/jpeg" /><br>
          <p>jpg, png: 4mo max</p>
          </div>
        <label for="title">Titre</label><br>
        <input type="text" name="title" id="title" autocomplete="off" requiered><br>
        <label for ="categorie-listbox">Catégories</label><br>
        <select name="categorie-listbox" id="categorie-listbox" autocomplete="off" requiered>
          <option value="1">Objet</option>
          <option value="2">Appartements</option>
          <option value="3">Hôtels et Restaurants</option>
        </select><br>
        <hr>
        <input type="submit" id="submit-grey" class="btn" value="Valider">
      </form>
    </div>
  </dialog>`
}
*/
editMode();
/**********************************************Generate photo**********************************************************/

// Function for the photos to appear in the modal, (duplication from the generatePhoto(works) (function from the "assets/filter.js" file))
const modalWorks = document.querySelector(".gallery-content");

function genererModalPhotos(){
// To fetch the ressources in the gallerie-content for the modal
fetch('http://localhost:5678/api/works')
  .then(resp => resp.json())
  .then(works => {
  
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
const token = sessionStorage.getItem("authenticationToken");  
const itemId = e.currentTarget.getAttribute("dataId");

fetch(`http://localhost:5678/api/works/${itemId}`, {
  method: 'DELETE',
  headers: { 
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  } 
})
.then(response => {
  if (response.ok) {
      alert("Delete successful !");
      window.location.reload();
  }
})
.catch(error => {
  console.error(error);
  alert('Une erreur s\'est produite lors de la suppression du travail');
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

/**********************************************add file section**********************************************************/
// select div in the index.html file
const fileZone = document.querySelector("#addImg"); 
fileZone.classList.add("add-img");

//create element of the div for the adding file section
const addImgPicture = document.createElement("span"); 
addImgPicture.innerText= `image`;
addImgPicture.classList.add("material-symbols-outlined");
const addImgFile = document.createElement("input");
addImgFile.type = "file"; 
addImgFile.name = "myImage"; 
addImgFile.id = "myImage";
addImgFile.accept = "image/png, image/jpeg";
addImgFile.required = true;
const addImgP = document.createElement("p"); 
addImgP.innerText = `jpg, png: 4mo max`; 

fileZone.appendChild(addImgPicture); 
fileZone.appendChild(addImgFile); 
fileZone.appendChild(addImgP); 

addImgFile.addEventListener('input', () => { 
  const imgFileLength = addImgFile.files[0].size; 
  console.log(imgFileLength);
  if(imgFileLength > 0){
      let fileSizeMb = imgFileLength /1024 / 1024 ; //convert byte to kiloBytes (first 1024) then to Megabytes (second 1024); 
      let fileSizeLimit = 32 //Megabits : because 4Mo = 32Mb. 
      if (fileSizeMb < fileSizeLimit) {
        console.log("Your image respect the size limit."); 
        addImgPicture.remove(); 
        addImgFile.remove(); 
        addImgP.remove(); 
    
        const previewImg = document.createElement('img');
        previewImg.style.display = "block"; 
        previewImg.style.height = "169px"; 

        previewImg.src = URL.createObjectURL(addImgFile.files[0]); 
        fileZone.appendChild(previewImg);

        return true
      } else { 
        alert("Image trop lourde. Veuillez choisir un autre fichier.")
        return false 
      };
  } else { 
    alert("Fichier invalide. Veuillez choisir un autre fichier.")
    return false
  };


//   const imgFileLength = addImgFile.files.length;
//   console.log("This is working!");
//   console.log(imgFileLength);
//   const imgPreview = document.getElementById("myAddedImage");
//   if (imgPreview.files[0].size > 4 * 1024 * 1024) {
//     alert("Test");
//   } else { 
//     if (addImgFile.files[0].size <= 4 * 1024 * 1024) {
//       addImgPicture.remove(); 
//       addImgFile.remove(); 
//       addImgP.remove(); 
  
//   const previewImg = document.createElement('img');
//   previewImg.src = URL.createObjectURL(addImgFile.files[0]); 
//   fileZone.appendChild(previewImg);

//     }
//   }
// //  console.log("No file selected.");
});

/**********************************************Generate photo**********************************************************/

const addImgForm = document.getElementById("addPhoto");

function addImg() {
const token = sessionStorage.getItem("authenticationToken");
const formData = new FormData(); 

formData.append("title", document.getElementById("title").value); 
formData.append("category", document.getElementById("categorie-listbox").value); 
formData.append("image", addImgFile.files[0]);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {'Authorization': `Bearer ${token}`},
        body: formData
    })

    .then(response => {
        if (response.status !== 201) {
            alert("Erreur : l'image n'a pas pu être ajoutée. Veuillez réessayer.");
        } else {
            return response.json();
        }
        
    })
    .then(authorization => {
        const token = authorization.token;
        sessionStorage.setItem("authenticationToken", token);
        window.location.href = "index.html";
    })
    .catch(err => {
        console.log(err);
        alert("Une erreur s'est produite lors de l'importation du fichier'. Veuillez réessayer plus tard.");
    });
};

// function deleteWork(e) {
//   const token = sessionStorage.getItem("authenticationToken");  
//   const itemId = e.currentTarget.getAttribute("dataId");

//   fetch(`http://localhost:5678/api/works/${itemId}`, {
//     method: 'DELETE',
//     headers: { 
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     } 
//   })
//   .then(response => {
//     if (response.ok) {
//         alert("Delete successful !");
//         window.location.reload();
//     }
//   })
//   .catch(error => {
//     console.error(error);
//     alert('Une erreur s\'est produite lors de la suppression du travail');
//     reject(error);
//   });
// };

/*Add Event Listener for the Submit button from the form present  on the addImg.html file*/
addImgForm.addEventListener("submit", (e) => {
e.preventDefault();
console.log("This is working !");
addImg();
});
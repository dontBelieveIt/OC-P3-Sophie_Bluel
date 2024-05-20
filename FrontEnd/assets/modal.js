import {updatePhoto, galleryContent} from "../assets/filter.js"; 
//updatePhoto function : is the generatePhoto function, to allow work to appear in the gallery and the page to be updated.
//galleryContent : is the <div class="gallery"></div>
/************************************************************
 *Here is all element in regards with the Modal and its functions. 

Contents: 
  editMode function : Line 31-56;
  showModals function : Line 70-429 ;
  ***GenererModalPhotos function : Line 124-153 ;
  ***DeleteWork function : Line 158-189; 
  ***Add Photo Modal function : Line 195-; 
  ******formSubmitBtnActive : Line 369-374; 
  ******addImg function : Line 377-429;
  tokenExpiredFunction : Line 432-435; 

  For the login() and looged() function, go see the userLogin.js file (../assets/userLogin.js); 
  For the gallery section of the index.html file and the filter button, see the filter.js file (../assets/filter.js); 
 */

// Authentification token requiered for the modals to appear as well as the "Delete" and "Add Work" functions. 
const token = sessionStorage.getItem("authenticationToken");  
/**********************************************Open and close modal**********************************************************/
// This function check, in the first place, the presence of the authentication token. If present, then the "edit" button is present. 
//***if not present, the edit button is hidden. 
//***if the edit button is shown, then, once clicked, it opens the modal, where deleting and/or adding a new work is possible. 
const editModeButton = document.getElementById("mesProjets");
const filterDiv = document.querySelector(".filter");
const headerEdit = document.querySelector("header"); 
//if the edit button is present, the modals : main modale (delete function) and add photo modal (add work function) are both accessible.
function editMode() {
  if (token) {
    // To remove the fitler buttons, which are not active on the edit mode;
    filterDiv.classList.remove("filter");
    filterDiv.style.display = "none"; 
    //To modify the header in edit mode 
    headerEdit.style.margin = "6rem 0 4rem 0";
    // To open the Modal onclick
    editModeButton.style.display = "flex";
    const openModal = document.createElement("button"); 
      openModal.id = "data-open-modal"; 
      openModal.classList.add("mes-projets-btn"); 
      openModal.innerHTML = `<span class="material-symbols-outlined">edit_square</span>`+ `  ` + `modifier`;
      editModeButton.appendChild(openModal);
    //call the function to show the modal (100% javascript code, see below : showModals() and addPhotoModal())
    openModal.onclick = function() {
      showModals();
    };
  } else { 
    filterDiv.classList.add("filter");
    headerEdit.style.margin = "50px 0";
  }
};
editMode();

//This is to create the main modal, where it is possible to delete photos, or go to the "ajouter une photo" modal
/***The Show Modals function combine multiple other functions: 
 * ***genereModal Function : to generate the works in the modal; 
 * ***deleteWork function : to delete the work available on the main modal; 
 * ***addPhoto modal : the second available modal
 * ******functionSubmitBtnActive : To allow, on the second modal, the submit of the new work
 * ******addImg : this funciton to add new work, is called when the submit button is clicked. 
 */
//modals appears from the <div id="ModalsAreHere"> from the index.html file
const modalLocation = document.getElementById("modalsAreHere"); 
const body = document.querySelector("body");
//allow the modal to be built
function showModals() {

  //the black background behind the modal
  const overlay = document.createElement("div"); 
    overlay.classList.add("overlayed");  
    body.appendChild(overlay);

  //creation of the Main Modal and the event linked to button
  const mainModal = document.createElement("dialog"); 
    mainModal.classList.add("modal"); 
    mainModal.id = "data-modal"; 
    mainModal.style.display = "block"; 
    modalLocation.appendChild(mainModal); 
  const modalContent = document.createElement("div"); 
    modalContent.classList.add("modal-content"); 
    mainModal.appendChild(modalContent); 
  const buttonCloseModal = document.createElement("button");
    buttonCloseModal.id = "data-close-modal"; 
    buttonCloseModal.classList.add("btn-close-modal"); 
    buttonCloseModal.innerHTML = `<span class="material-symbols-outlined">close</span>`; 
    modalContent.appendChild(buttonCloseModal); 
    buttonCloseModal.addEventListener("click", () => {
      mainModal.remove();
      overlay.remove();
    }); //end of the buttonCloseModal Event listener
  const galleryPhotoH1 = document.createElement("h1"); 
    galleryPhotoH1.innerText = `Galerie photo`; 
    modalContent.appendChild(galleryPhotoH1);
  const galleryContentDiv = document.createElement("div"); 
    galleryContentDiv.classList.add("gallery-content"); 
    modalContent.appendChild(galleryContentDiv);
  const modalHr = document.createElement("hr"); 
    modalContent.appendChild(modalHr);
  const buttonOpenAddModal = document.createElement("button"); 
    buttonOpenAddModal.classList.add("btn", "green", "btn-modal"); 
    buttonOpenAddModal.id = "openAddModal";
    buttonOpenAddModal.innerText = `Ajouter une photo`; 
    modalContent.appendChild(buttonOpenAddModal);
    buttonOpenAddModal.addEventListener("click", () => { 
      mainModal.remove();
      overlay.remove();
      addPhotoModal(); 
    });
    //when clicked, the overlay allow the modals to be cloded
    overlay.addEventListener("click", () => {
      mainModal.remove();
      overlay.remove()
    })//end of the overlay addEventListener

  /**********************************************Generate photo***(main modal)*******************************************************/
  // Function for the photos to appear in the modal, (duplication from the generatePhoto(works) (function from the "assets/filter.js" file))
  function genererModalPhotos(){
    //To fetch the ressources in the gallerie-content for the modal
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
          
          galleryContentDiv.appendChild(modalFigure);
          modalFigure.appendChild(modalPhotoURL); 
          modalFigure.appendChild(deleteButton);

          // Event listener for the delete work function 
          deleteButton.addEventListener("click", deleteWork);         
        })
      })
  }; //function genererModalPhotos() 
  genererModalPhotos();//still in the showModals function

  /******************************************************************************************************************************************
  *********************************************** delete photo (main Modal)***************************************************************************
  ******************************************************************************************************************************************/
  function deleteWork(e) {
    if (token === undefined || token === null) {
      tokenExpired(); //this function appears in case of an authentication problem, to avoid a error 401 whislt edit mode is still on
    } else { 
      e.preventDefault(); //prevent the page from reloading
      const itemId = e.currentTarget.getAttribute("dataId"); //get the id of the work in question

      fetch(`http://localhost:5678/api/works/${itemId}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } 
      })
      .then(response => {
        if (response.ok) {
          galleryContent.innerHTML = ""; 
          galleryContentDiv.innerHTML = "";  
          genererModalPhotos(); 
          updatePhoto();
        }
        if (response.status === 401) {
          tokenExpired(); //the user is asked to try after login again
        }
      })
      .catch(error => {
        console.log(error)
      });
    }//end of the if statement; 
  };  //function deleteWork(e)
  //still in the showModals function

  /******************************************************************************************************************************************
  *********************************************** add photo modal***(secondary modal)************************************************************************
  ******************************************************************************************************************************************/
  function addPhotoModal() {
    //create the overlay for the second modal
    const overlay2 = document.createElement("div"); 
    overlay2.classList.add("overlayed"); 
    const body = document.querySelector("body"); 
    body.appendChild(overlay2);
    
    const dialogAddPhoto = document.createElement("dialog"); 
      dialogAddPhoto.classList.add("modal"); 
      dialogAddPhoto.style.display = "block"; 
    const addPhotoDiv = document.createElement("div"); 
      addPhotoDiv.classList.add("add-photo-modal", "modal-content"); 
    const btnCloseAddModal = document.createElement("button"); 
      btnCloseAddModal.id = "add-close-modal"; 
      btnCloseAddModal.classList.add("btn-close-modal"); 
      btnCloseAddModal.innerHTML = `<span class="material-symbols-outlined">close</span>`; 
      btnCloseAddModal.addEventListener("click", () => {
        dialogAddPhoto.remove(); 
        overlay2.remove();
      }) 
    const btnBackMainModal = document.createElement("button"); 
      btnBackMainModal.id = "return-main-modal"; 
      btnBackMainModal.classList.add("btn-return"); 
      btnBackMainModal.innerHTML = `<span class="material-symbols-outlined">arrow_back</span></button>`;
      //close the second modal and goes back to the first
      btnBackMainModal.addEventListener("click", () => {
        dialogAddPhoto.remove(); 
        showModals(); 
      } )
    const titleAddModal = document.createElement("h1"); 
      titleAddModal.innerText = "Ajout photo"; 
      overlay2.addEventListener("click", () => {
        dialogAddPhoto.remove();
        overlay2.remove()
      })
    /****************************add form***(secondary modal)*********************************************/
    //still in the addPhotoModal Function
    //Form  
    const newWorkForm = document.createElement("form"); 
      newWorkForm.id = "addPhoto"; 
      
      //create element of the div for the adding file section
      const addImgFileDiv = document.createElement("div"); 
        addImgFileDiv.id = "addImg";  
        addImgFileDiv.classList.add("add-img");
      const addImgPicture = document.createElement("span"); 
        addImgPicture.innerText= `image`;
        addImgPicture.classList.add("material-symbols-outlined");
      const addImgFileLabel = document.createElement("label"); 
        addImgFileLabel.htmlFor = "myImage";
        addImgFileLabel.href = "myImage";
        addImgFileLabel.innerText = `+ Ajouter photo`;  
      const addImgFile = document.createElement("input");
        addImgFile.type = "file"; 
        addImgFile.name = "myImage"; 
        addImgFile.id = "myImage";
        addImgFile.accept = "image/png, image/jpeg";
        addImgFile.required = true;
        addImgFile.style.display = "none";
      const addImgP = document.createElement("p"); 
        addImgP.innerText = `jpg, png: 4mo max`; 
      const breakTag = document.createElement("br"); 

      //Title input 
      const formTitleLabel = document.createElement("label"); 
        formTitleLabel.htmlFor = "title"; 
        formTitleLabel.innerText = "Title"; 
        const breakTag2a = document.createElement("br"); 
      const formTitleInput = document.createElement("input");
        formTitleInput.setAttribute("type", "text");
        formTitleInput.name = "title"; 
        formTitleInput.id = "title"; 
        formTitleInput.required = true; 
        formTitleInput.autocomplete = "off";
        const breakTag2b = document.createElement("br"); 
      
      //Categorie input 
      const formCatLabel = document.createElement("label");
        formCatLabel.htmlFor = "categorie-listbox"; 
        formCatLabel.innerText = "Catégories"; 
      const formCatInput = document.createElement("select"); 
        formCatInput.name = "categorie-listbox"; 
        formCatInput.id = "categorie-listbox"; 
        formCatInput.required = true; 
        const breakTag3a = document.createElement("br"); 
        const option1 = document.createElement("option");
          option1.text = "Objet";
          option1.value = 1; 
          formCatInput.add(option1);
        const option2 = document.createElement("option");
          option2.text = "Appartements";
          option2.value = 2; 
          formCatInput.add(option2);
        const option3 = document.createElement("option");
          option3.text = "Hôtels et Restaurants";
          option3.value = 3; 
          formCatInput.add(option3);
        const breakTag3b = document.createElement("br"); 
        const addPhotoModalHr = document.createElement("hr"); 
  
      //Submit button 
      const formSubmitBtn = document.createElement("input"); 
        formSubmitBtn.setAttribute("type", "submit");
        formSubmitBtn.classList.add("btn"); 
        formSubmitBtn.value = "Valider"; 
        formSubmitBtn.disabled = true;
        newWorkForm.appendChild(formSubmitBtn); 
        
      modalLocation.appendChild(dialogAddPhoto); 
      dialogAddPhoto.appendChild(addPhotoDiv); 
      addPhotoDiv.appendChild(btnCloseAddModal); 
      addPhotoDiv.appendChild(btnBackMainModal); 
      addPhotoDiv.appendChild(titleAddModal); 
      //form
      addPhotoDiv.appendChild(newWorkForm); 
      newWorkForm.appendChild(addImgFileDiv);
      addImgFileDiv.appendChild(addImgPicture); //the add image input
      addImgFileDiv.appendChild(addImgFileLabel);
      addImgFileDiv.appendChild(addImgFile);
      addImgFileDiv.appendChild(addImgP); 
      addImgFileDiv.appendChild(breakTag);
      newWorkForm.appendChild(formTitleLabel); //title input 
      newWorkForm.appendChild(breakTag2a);
      newWorkForm.appendChild(formTitleInput); 
      newWorkForm.appendChild(breakTag2b);
      newWorkForm.appendChild(formCatLabel); //catgegie input
      newWorkForm.appendChild(formCatInput); 
      newWorkForm.appendChild(breakTag3a);
      newWorkForm.appendChild(breakTag3b);
      newWorkForm.appendChild(addPhotoModalHr);
      newWorkForm.appendChild(formSubmitBtn); //submit button
      //still in the addPhotoModal function
      /****************************addImgFile btn***(secondary modal)*********************************************/
      newWorkForm.addEventListener('change', (e) => { 
        e.preventDefault();
        formSubmitBtnActive(); //the submut button is active only when the requiered field are filled
      });
      newWorkForm.addEventListener('submit', (e) => {
        e.preventDefault();
      });

      //***Add event listener : for the add file section
      addImgFile.addEventListener('input', (e) => { 
        const imgFileLength = addImgFile.files[0].size; 
        if(imgFileLength > 0){
            let fileSizeMb = imgFileLength / 1024 / 1024 ; //convert byte to kiloBytes (first 1024) then to Megabytes (second 1024); 
            let fileSizeLimit = 32 //Megabits : because 4Mo = 32Mb. 
            if (fileSizeMb < fileSizeLimit) {
              addImgPicture.remove(); 
              addImgFileLabel.remove(); 
              addImgFile.remove();
              addImgP.remove();
              addImgFileDiv.style.padding = "0";
              addImgFileDiv.style.justifyContent = "flex-end";
              
              const addPreviewImg = document.createElement("img"); 
                addPreviewImg.classList.add("addedPhoto");
                addPreviewImg.src = URL.createObjectURL(addImgFile.files[0]);
                addImgFileDiv.appendChild(addPreviewImg);              
              return true
            } else { 
              alert("Image trop lourde. Veuillez choisir un autre fichier.")
              return false 
            };
        } else { 
          alert("Fichier invalide. Veuillez choisir un autre fichier.")
          return false
        };
      });

      function formSubmitBtnActive() {
        if (addImgFile.files[0] != undefined && formTitleInput.value != "") {
          formSubmitBtn.disabled = false; 
        }
      };
    // /**********************************************add photo function***API*******************************************************/

    function addImg() {

      if (token === undefined || token === null) {
        tokenExpired(); 
      } else { 
        const dialogModal = document.querySelector("dialog");
        dialogModal.classList.add("loading"); 
        formSubmitBtn.disabled = true; 

        const formData = new FormData(); 
          let titleInput = formTitleInput.value; 
          let categoryInput = formCatInput.value; 
          let addedFile = addImgFile.files[0];
        formData.append("title", titleInput); 
        formData.append("category", categoryInput); 
        formData.append("image", addedFile);
          fetch("http://localhost:5678/api/works", {
              method: "POST",
              headers: {'Authorization': `Bearer ${token}`},
              body: formData
          })
          .then(response => {
              if (response.ok) {
                galleryContent.innerHTML = ""; 
                alert("Image ajoutée avec succès !");
                dialogModal.classList.remove("loading");
                overlay2.remove();
                dialogAddPhoto.remove();
                showModals();
                galleryContentDiv.innerHTML = "";  
                genererModalPhotos(); 
                updatePhoto(); //function imported from the ""../assets/filter.js", namely : genererPhoto()
              } else {
                return response.json();
              }
          })
          .then(authorization => {
              sessionStorage.setItem("authenticationToken", authorization.token);
              window.location.href = "index.html";
          })
          .catch(error => {
              console.log(error);
          });
      }//end of the if(token) treat
    };
    formSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      addImg();
    });
  } //end of the addModalPhoto() function 
};//end of function 

//ask the user to login again if token become : "undefined";
function tokenExpired() {
  alert("Erreur lors de l'authentification. Veuillez réessayer."); 
  window.location.href = "login.html";
};
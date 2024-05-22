/**
 *Here is all element in regards with the gallery present on the portfolio part of the index.html file, as well as the filter functions.  

Contents: 
  Generer photo galerie :  Line 23-48; 
  Filtered Functions and Add Event Listener : Line 60-152
    *No filter, show all works : Line 60;
    ***nofilterBtn Event Listener : Line 60-72 ; 
    *Function needed for the following Event Listener : filterThis() : Line 82-111 ;
    btnClass() : Line 113-125;
    ***Filter for objets : 128-134; 
    ***Filters for Appartements : 137-143;
    ***Filter for Hotels and Restaurants: 145-152;

  For the login() and looged() function, go see the userLogin.js file (../assets/userLogin.js); 
  For the modals gestions and their functions, go see the userLogin.js file (../assets/modal.js); 
 */

// Get for categories (filtered Work) from backend
const resp = await fetch('http://localhost:5678/api/categories');
let category = await resp.json();
/**********************************************generer photo galerie**********************************************************/
const photoZone = document.querySelector(".gallery");
function genererPhotos(){
    //fetch the data from the API
    fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(works => {
        //from each image fetched from the API, those elements are created
        works.forEach(image => {
            const figurePhotos = document.createElement("figure");
                figurePhotos.classList.add("figureImg");
            const photoUrl = document.createElement("img");
                photoUrl.src = image.imageUrl;
                photoUrl.alt = image.title;
                photoUrl.setAttribute("loading", "lazy");
            const photoTitle = document.createElement("figcaption");
            const photoCaption = document.createElement("p"); 
                photoCaption.innerText = image.title;
            
            photoZone.appendChild(figurePhotos);
            figurePhotos.appendChild(photoUrl); 
            figurePhotos.appendChild(photoTitle); 
            photoTitle.appendChild(photoCaption);  
        })
    })
}
genererPhotos();

/********************************************************************************************************************************
 ********************************FILTERED FUNCTION AND EVENTS LISTENER***********************************************************
 ********************************************************************************************************************************/
// The No Filter Button (Tous), show all works, with no distinction between the work's cathegories. 
// ***It has a default style : ".active", which is removed when another button from the filters is being clicked on. 
// ***The ".active" style is reapplied once the "Tous" button is selected anew. 
// ***".filtered-btn" is the default class for all other filter buttons.

/**********************************************Event Listener**********************************************************/
// no filter, "show all" (Tous) button
const noFilterBtn = document.querySelector(".all-btn");
noFilterBtn.addEventListener("click", () => {
    photoZone.innerHTML = "";
    // btn-class
    btnClass(noFilterBtn, objectsFilterBtn, appartementsFilterBtn)
    if (hotelRestoFilterBtn.classList.contains("active")) {
        hotelRestoFilterBtn.classList.remove("active")
        hotelRestoFilterBtn.classList.add("filter-btn"); 
    }
    
    // filter
    genererPhotos(); 
});

// The works fit into either of three cathegories : Objets, Appartements, Hotel and Restaurants.
// The functions delete works (photo.Zone.innerHTML = ""), before generating works anew with the genererPhotos() function.  
// ***Work's cathegories are fetched via the "api/cathegories" at the top of the page. 
// ******Targetted item for the filter option are the categoryId, with a value of : 
// *********1 (Objets); 
// *********2 (Appartements); 
// *********3 (Hotel and Restaurants). 

function filterThis(categorie) {
    //no filter button class gestion ("Tous");
    noFilterBtn.classList.add("filter-btn"); 
    noFilterBtn.classList.remove("active");

    photoZone.innerHTML = "";
    fetch('http://localhost:5678/api/works')
    .then(resp => resp.json())
    .then(photo => {
        let filtered = photo.filter((photo) => photo.categoryId === categorie);
        photoZone.innerHTML = ""; 
        
        filtered.forEach(image => {
            const figurePhotos = document.createElement("figure");
                figurePhotos.classList.add("figureImg");
            const photoUrl = document.createElement("img");
                photoUrl.src = image.imageUrl;
                photoUrl.alt = image.title;
                photoUrl.setAttribute("loading", "lazy");
            const photoTitle = document.createElement("figcaption");
            const photoCaption = document.createElement("p"); 
                photoCaption.innerText = image.title;
            
            photoZone.appendChild(figurePhotos);
            figurePhotos.appendChild(photoUrl); 
            figurePhotos.appendChild(photoTitle); 
            photoTitle.appendChild(photoCaption);  
        })
    })
};

function btnClass(thisButton, otherBtn1, otherBtn2) {
    thisButton.classList.add("active"); 
    thisButton.classList.remove("filter-btn");

    if (otherBtn1.classList.contains("active")) {
        otherBtn1.classList.remove("active")
        otherBtn1.classList.add("filter-btn"); 
    }
    if (otherBtn2.classList.contains("active")) {
        otherBtn2.classList.remove("active")
        otherBtn2.classList.add("filter-btn"); 
    }
}

// Filter for Objets, categoryId = 1
const objectsFilterBtn = document.querySelector(".objects-btn");
objectsFilterBtn.addEventListener("click", () => {
    //filter functions
    filterThis(1); 
    //Classes gestions for the buttons once clicked
    btnClass(objectsFilterBtn, appartementsFilterBtn, hotelRestoFilterBtn);
}); 

// Filter for appartements, categoryId = 2
const appartementsFilterBtn = document.querySelector(".appart-btn");
appartementsFilterBtn.addEventListener("click", () => {
    //filter functions
    filterThis(2);
    //Classes gestions for the buttons once clicked
    btnClass(appartementsFilterBtn, hotelRestoFilterBtn, objectsFilterBtn);
});

// Filter for hotels and resto, categoryId = 3
const hotelRestoFilterBtn = document.querySelector(".hotelResto-btn"); 
hotelRestoFilterBtn.addEventListener("click", () => {
    //filter functions
    filterThis(3);
    //Classes gestions for the buttons once clicked
    btnClass(hotelRestoFilterBtn, objectsFilterBtn, appartementsFilterBtn);
});

//export those functions and variables to the modal.js file
export { genererPhotos as updatePhoto, photoZone as galleryContent};
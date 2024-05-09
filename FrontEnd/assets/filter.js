/**
 *Here is all element in regards with the gallery present on the portfolio part of the index.html file, as well as the filter functions.  

Contents: 
  Generer photo galerie :  Line "" 
    *Open modal & Close modal onlick function(); 
  Filtered Functions adn Add Event Listener : Line "" ;
    *No filter, show all works : 
    *Filter for objets : 
    *Filters for Appartements : 
    *Filter for Hotels and Restaurants: 

  For the login() and looged() function, go see the userLogin.js file (../assets/userLogin.js); 
  For the modals gestions and their functions, go see the userLogin.js file (../assets/modal.js); 
 */

// Get for works from backend
const response = await fetch('http://localhost:5678/api/works');
let works = await response.json(); 
// Get for categories (filtered Work) from backend
const resp = await fetch('http://localhost:5678/api/categories');
let category = await resp.json();

/**********************************************generer photo galerie**********************************************************/
const photoZone = document.querySelector(".gallery");
function genererPhotos(works){
    console.log("genener photo function has been called !"); 
    for (let i = 0; i < works.length; i++) {

        const workPhoto = works[i];
        const figurePhotos = document.createElement("figure");
        const photoUrl = document.createElement("img");
        photoUrl.src = workPhoto.imageUrl;
        photoUrl.alt = workPhoto.title;
        const photoTitle = document.createElement("figcaption");
        const photoCaption = document.createElement("p"); 
        photoCaption.innerText = workPhoto.title;
        
        photoZone.appendChild(figurePhotos);
        figurePhotos.appendChild(photoUrl); 
        figurePhotos.appendChild(photoTitle); 
        photoTitle.appendChild(photoCaption);  
     }
}
genererPhotos(works);

/********************************************************************************************************************************
 ********************************FILTERED FUNCTION AND EVENTS LISTENER***********************************************************
 ********************************************************************************************************************************/
// The No Filter Button (Tous), show all works, with no distinction between the work's cathegories. 
// ***It has a default style : ".active", which is removed when another button from the filters is being clicked on. 
// ***The ".active" style is reapplied once the "Tous" button is selected anew. 
// ***".filtered-btn" is the default class for all other filter buttons.
function noFilterBtnClass(noFilterBtn) {
    noFilterBtn.classList.add("filter-btn"); 
    noFilterBtn.classList.remove("active");
};

/**********************************************Event Listener**********************************************************/
// no filter, show all button
const noFilterBtn = document.querySelector(".all-btn");
noFilterBtn.addEventListener("click", () => {
    // btn-class
    noFilterBtn.classList.add("active"); 
    noFilterBtn.classList.remove("filter-btn");
    // filter
    genererPhotos(works); 
});

// The works fit into either of three cathegories : Objets, Appartements, Hotel and Restaurants.
// The functions delete works (photo.Zone.innerHTML = ""), before generating works anew with the genererPhotos() function.  
// ***Work's cathegories are fetched via the "api/cathegories" at the top of the page. 
// ******Targetted item for the filter option are the categoryId, with a value of : 
// *********1 (Objets); 
// *********2 (Appartements); 
// *********3 (Hotel and Restaurants). 

// Filter for Objets, categoryId = 1
const objectsFilterBtn = document.querySelector(".objects-btn");
objectsFilterBtn.addEventListener("click", () => {
    //function for button class 
    noFilterBtnClass(noFilterBtn);
    //supression of the photo gallery content for update
    photoZone.innerHTML = "";
    //filter the concerned works
    const filtered = works.filter((x) => x.categoryId === 1);
    //function to generate gallery anew with filter
    genererPhotos(filtered);   
}); 

// Filter for appartements, categoryId = 2
const appartementsFilterBtn = document.querySelector(".appart-btn");
appartementsFilterBtn.addEventListener("click", () => {
    noFilterBtnClass(noFilterBtn); 
    photoZone.innerHTML = "";
    const filtered = works.filter((x) => x.categoryId === 2);
    genererPhotos(filtered); 
});

// Filter for hotels and resto, categoryId = 3
const hotelRestoFilterBtn = document.querySelector(".hotelResto-btn"); 
hotelRestoFilterBtn.addEventListener("click", () => {
    noFilterBtnClass(noFilterBtn);
    photoZone.innerHTML = "";
    const filtered = works.filter((x) => x.categoryId === 3);
    genererPhotos(filtered); 
});
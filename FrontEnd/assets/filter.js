// Get for works from backend
const response = await fetch('http://localhost:5678/api/works');
let works = await response.json(); 
// Get for categories (filtered Work) from backend
const resp = await fetch('http://localhost:5678/api/categories');
let category = await resp.json();

/**********************************************generer photo galerie**********************************************************/
const photoZone = document.querySelector(".gallery");
function genererPhotos(works){
    for (let i = 0; i < works.length; i++) {

        const workPhoto = works[i];
        const figurePhotos = document.createElement("figure");
        const photoUrl = document.createElement("img");
        photoUrl.src = workPhoto.imageUrl;
        const photoTitle = document.createElement("figcaption");
        const photoCaption = document.createElement("p"); 
        const photoCaptionContent = ""; 
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


// Filter for Objects
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

// Filter for appartements
const appartementsFilterBtn = document.querySelector(".appart-btn");
appartementsFilterBtn.addEventListener("click", () => {
    noFilterBtnClass(noFilterBtn); 
    photoZone.innerHTML = "";
    const filtered = works.filter((x) => x.categoryId === 2);
    genererPhotos(filtered); 
});

// Filter for hotels and resto
const hotelRestoFilterBtn = document.querySelector(".hotelResto-btn"); 
hotelRestoFilterBtn.addEventListener("click", () => {
    noFilterBtnClass(noFilterBtn);
    photoZone.innerHTML = "";
    const filtered = works.filter((x) => x.categoryId === 3);
    genererPhotos(filtered); 
});


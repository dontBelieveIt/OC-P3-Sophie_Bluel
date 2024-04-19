// Get for works
const response = await fetch('http://localhost:5678/api/works');
let works = await response.json(); 
// Get for categories (filtered Work)
const resp = await fetch('http://localhost:5678/api/categories');
let category = await resp.json();

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

/**********************************************All Functions**********************************************************/
function noFilterBtnClass(noFilterBtn) {
    noFilterBtn.classList.add("filter-btn"); 
    noFilterBtn.classList.remove("active");
};

function filterThis(filteredWork) {
    photoZone.innerHTML = "";
    for (let i = 0; i < works.length; i++) {
        const workPhoto = works[i];
        const workCategory = workPhoto.category; 
        const categoryName = workCategory.name; 

        if (workCategory === categoryId) {
            return true
        }
        return filteredWork;
    }
    genererPhotos(filteredWork); 

}
      

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
   noFilterBtnClass(noFilterBtn);
   filterThis(filteredWork, objects);
}); 

const appartementsFilterBtn = document.querySelector(".appart-btn");
appartementsFilterBtn.addEventListener("click", () => {
    noFilterBtnClass(noFilterBtn); 
    photoZone.innerHTML = ""; 

});

const hotelRestoFilterBtn = document.querySelector(".hotelResto-btn"); 
hotelRestoFilterBtn.addEventListener("click", () => {
    // btn-class
    noFilterBtnClass(noFilterBtn);
    photoZone.innerHTML = ""; 

});


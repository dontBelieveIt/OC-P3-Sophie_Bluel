const response = await fetch('http://localhost:5678/api/works');
let works = await response.json(); 

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
        console.log(photoTitle)
        console.log(workPhoto.title)
        
        photoZone.appendChild(figurePhotos);
        figurePhotos.appendChild(photoUrl); 
        figurePhotos.appendChild(photoTitle); 
        photoTitle.appendChild(photoCaption);  
     }
}

genererPhotos(works);

/**********************************************variables declaration for all following function**********************************************************/
// "Tous" button
const noFilterBtn = document.querySelector(".all-btn");
const noFilter = document.querySelector(".all"); 
// Objects button
const objectsFilterBtn = document.querySelector(".objects-btn");
const objectsFilter = document.querySelector(".objects"); 
// appartement and hotel button
const appartementsFilterBtn = document.querySelector(".appart-btn");
const appartementsFilter = document.querySelector(".appartements"); 
// hotel and resto button
const hotelRestoFilterBtn = document.querySelector(".hotelResto-btn"); 
const hotelRestoFilter = document.querySelector(".hotelResto"); 

/**********************************************All Functions**********************************************************/

function noFilterBtnClass(noFilterBtn) {
    noFilterBtn.classList.add("filter-btn"); 
    noFilterBtn.classList.remove("active");
};

function filtrerPhotos(c, allOtherElements) {
    photoZone.innerHTML = ""; 
    c.style.display = "block"; 
    allOtherElements.style.display = "none";
};

/**********************************************Event Listener**********************************************************/

// no filter, show all button
noFilterBtn.addEventListener("click", () => {
    // btn-class
    noFilterBtn.classList.add("active"); 
    noFilterBtn.classList.remove("filter-btn");
    // filter
    let allOtherElements = ""; 
    filtrerPhotos(all, allOtherElements); 
});


// Filter for Objects

objectsFilterBtn.addEventListener("click", () => {
    noFilterBtnClass(noFilterBtn);
    
    let allOtherElements = [appartementsFilter, hotelRestoFilter]; 
    filtrerPhotos(objectsFilter, allOtherElements); 
}); 


appartementsFilterBtn.addEventListener("click", () => {
    noFilterBtnClass(noFilterBtn); 
    let allOtherElements = [objectsFilter, hotelRestoFilter]
    filtrerPhotos(appartementsFilter, allOtherElements); 
});


hotelRestoFilterBtn.addEventListener("click", () => {
    // btn-class
    noFilterBtnClass(noFilterBtn);
    let allOtherElements = [objectsFilter, appartementsFilter]
    filtrerPhotos(hotelRestoFilter, allOtherElements); 
});


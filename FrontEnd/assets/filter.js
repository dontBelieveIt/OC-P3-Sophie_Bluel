alert("test1"); 
const response = await fetch('http://localhost:5678/api/works');
console.log("test1"); 
let projet = await response.json(); 
console.log("test 2");
console.log(projet);
// const requestOption = {methode : 'GET', 
//     header: {'Content-Type':'application/json'}
// };
// .then(response => {});
// const works = reponse.json();
// SELECT `works`.`id`, `works`.`title`, `works`.`imageUrl`, `works`.`categoryId`, `works`.`userId`, `category`.`id` AS `category.id`, `category`.`name` AS `category.name` FROM `works` AS `works` LEFT OUTER JOIN `categories` AS `category` ON `works`.`categoryId` = `category`.`id`;
/*
function genererPhotos(photos){
    for (let i = 0; i < works.length; i++) {

        const workPhoto = works[i];
        const figurePhotos = document.createElement("figure");
        const figureClass = document.classList.createElement(workCategory);
        figureClass.src = works.category;
        const photoUrl = document.createElement("img");
        photoUrl.src = works.imageURL;
        const photoTitle = document.createElement("figcaption");
        photoTitle.innerText = works.title;
        
        // On rattache la balise article a la section Fiches
        figurePhotos.appendChild(photoZone);
        figurePhotos.appendChild(photoUrl);
        figurePhotos.appendChild(photoTitle);
     }
}

genererPhotos(photos);
*/
/**********************************************variables declaration for all following function**********************************************************/
/*
const photoZone = document.querySelector(".gallery");

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
*/
/**********************************************All Functions**********************************************************/

/*function noFilterBtnClass(noFilterBtn) {
    noFilterBtn.classList.add("filter-btn"); 
    noFilterBtn.classList.remove("active");
};

function filtrerPhotos(c, allOtherElements) {
    photoZone.innerHTML = ""; 
    c.style.display = "block"; 
    allOtherElements.style.display = "none";
};
*/
/**********************************************Event Listener**********************************************************/
/*
// no filter, show all button
noFilterBtn.addEventListener("click", () => {
    // btn-class
    noFilterBtn.classList.add("active"); 
    noFilterBtn.classList.remove("filter-btn");
    // filter
    let allOtherElements = ""; 
    filtrerPhotos(all, allOtherElements); 
});
*/

// Filter for Objects
/*
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
*/

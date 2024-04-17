const photoZone = document.querySelector(".gallery"); 

const noFilter = document.querySelector(".all"); 
const objectsFilter = document.querySelector(".objects"); 
const appartementsFilter = document.querySelector(".appartements"); 
const hotelRestoFilter = document.querySelector(".hotelResto"); 

objectsFilter.addEventListener("click", () => {
    const objectsPhotos = galleryPhotos.filter(function () {
        return galleryPhotos.class
    }); 
    noFilter.classList.remove("active"); 
    noFilter.classList.add("filter-btn");
    objectsFilter.classList.remove("filter-btn"); 
    objectsFilter.classList.add("active");

})
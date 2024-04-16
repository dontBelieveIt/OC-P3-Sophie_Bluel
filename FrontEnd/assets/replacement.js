// login script
const loginForm = document.getElementById("loginBox");
const email = document.getElementById("loginMail");
const password = document.getElementById("loginPassword");

function validerMail(email) {
    let mailRegEx = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[[a-z0-9._-]+]")
    if (mailRegEx.test(email)) {
        return true
        email.value ="";
    }
    return false
}

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validerMail();
    
    if (email.value === "sophie.bluel@test.tld" && password.value === "S0phie") {
        window.location.href = 'homepageLoggedIn.html';
        console.log("Login sucessful")
    }

    console.log("Login unsuccessful")

});

/*********************************************************************************************************************************/
//LOCAL STORAGE
/**********************************************************************************************************************************/
let galleryPhotos = window.localStorage.getItem('images');

// Fonction qui génère toute la page web
function genererPhotos(galleryPhotos) {
    for (let i = 0; i < galleryPhotos.length; i++) {
        const article = galleryPhotos[i];
        const galleryZone = document.querySelector(".galerie-content");
        const currentPhoto = document.createElement("img");
    
        currentPhoto.appendChild(galleryZone);
    
    }

    ajoutListenersAvis();
}
 
genererPieces(galleryPhotos);


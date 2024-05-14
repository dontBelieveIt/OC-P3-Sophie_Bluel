/**
 *Here is all element in regards with the loggin and logged functions. 
 As well as the gestion and storage of the authentication token once logged in successfully. 

*Contents: 
    Function login() : Line 
    ***Submit Form add Event Listener
    login/logout Button : Line 
    ***edition mode header : Line

  For the modals gestions and their functions, go see the userLogin.js file (../assets/modal.js); 
  For the gallery section of the index.html file and the filter button, see the filter.js file (../assets/filter.js); 
 */
/**********************************************Login Function and Add Event listener**********************************************************/
//Use the api to search whether the user is registered or not. 
//*** IF the user is registered, produce a authentication token to access the edition mode 
//*** if the user is not registered, or if the informations provideed (email/mdp) are not correct, return an error message 
const loginForm = document.querySelector("form");
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const errorMsgZone = document.getElementById("errorMsg"); 
    errorMsgZone.style.display = "none"; 
    console.log("Login function has been called !");
    
    const user = {
        email: e.target.querySelector("[name=email]").value,
        password: e.target.querySelector("[name=password]").value,
    };

    const formData = JSON.stringify(user);
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData
    })

    .then(response => {
        if (response.status !== 200) {
            errorMsgZone.style.display = "block";
            errorMsgZone.innerText = "Erreur : les informations de connexion sont incorrectes. Veuillez réessayer.";
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
        errorMsgZone.style.display = "block";
        errorMsgZone.innerText = "Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.";
    });
});

/**********************************************login/logout button**********************************************************/
// This function takes into account wheter the user is successfully logged in or not. 
// *if successfully logged in, the user will be presented with tle logout button, from the navigation, to logout and remove the authentication token 
// ***This way, they won't be able to  edit the document on index.html (adding and deleting photos). 
// *if unsuccessfully logged, the user will still see the "login" button present in the navigation and will be able to try to loggin again. 
// ***editing works on the index.html file will be impossible. 

function logged() {
    //For the Login/Log out button, depending whether the user has been successfully logged in 
    //***if the logged in is successful, then the log out option will be presented, and it will erase the token */
    const logoutBtn = document.querySelector('.logOut');
    const loginBtn = document.querySelector('.logIn');

    //If the user is successfully logged in, a top banner will be displayed on which can be read "Edition Mode"
    const editModeBanner = document.querySelector(".edit-mode"); 

    const token = sessionStorage.getItem("authenticationToken");
    console.log(token);
    console.log("logged function is being called !")

    if (token) {
        logoutBtn.style.display = "block"; 
        loginBtn.style.display = "none"; 

        editModeBanner.style.display = "flex"; 
    } else {
        logoutBtn.style.display = "none"; 
        loginBtn.style.display = "block"; 

        editModeBanner.style.display = "none";
    };

    // Once the token has been verified as present and the logout button has appeared, it's possible for the user to log out by clicking on this button. 
    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("authenticationToken"); 
        window.location.href = "index.html"; 
        console.log(token);
        alert("Log out successful !")
    });
}
logged();

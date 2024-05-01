/**
 *Here is all element in regards with the loggin and logged functions. 
 As well as the gestion and storage of the authentication token once logged in successfully. 

*Contents: 
    Function login() : Line 
    **Submit Form add Event Listener

    login/logout Button : Line 

  For the modals gestions and their functions, go see the userLogin.js file (../assets/modal.js); 
  For the gallery section of the index.html file and the filter button, see the filter.js file (../assets/filter.js); 
 */



/**********************************************Login Function and Add Event listener**********************************************************/
function login() {
     
    // Define first the elements we will need to identify the user
    const user = {
        email: document.querySelector("[name=email]").value,
        password: document.querySelector("[name=password]").value,
    };

    // Elements to define the user are then sent to the login API
    const formData = JSON.stringify(user);
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: formData
    })

    .then(res => {
        if (res.status !== 200) {
            alert("Erreur : les informations de connexion sont incorrectes. Veuillez réessayer.");
        } else {
            return res.json();
        }
        
    })
    .then(auth => {
        const authorization = data.token;
        sessionStorage.setItem("authenticationToken", token);
        window.location.href = "index.html";
    })
    .catch(err => {
        console.log(err);
        alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
    });
};

/*Add Event Listener for the Submit button from the form present  on the login.html file*/
const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    login();
});



/**********************************************login/logout button**********************************************************/
// This function takes into account wheter the user is successfully logged in or not. 
// *if successfully logged in, the user will be presented with tle logout button, from the navigation, to logout and remove the authentication token 
// ***This way, they won't be able to  edit the document on index.html (adding and deleting photos). 
// *if unsuccessfully logged, the user will still see the "login" button present in the navigation and will be able to try to loggin again. 
// ***editing works on the index.html file will be impossible. 

function logged() {
    const logoutBtn = document.querySelector('.logOut');
    const loginBtn = document.querySelector('.logIn');

    const token = sessionStorage.getItem("authenticationToken");
    console.log(token);

    if (token) {
        logoutBtn.style.display = "block"; 
        loginBtn.style.display = "none"; 
    } else {
        logoutBtn.style.display = "none"; 
        loginBtn.style.display = "block"; 
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

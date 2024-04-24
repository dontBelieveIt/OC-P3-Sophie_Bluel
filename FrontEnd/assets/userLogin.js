function login() {
    const loginForm = document.querySelector("form");
    
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        
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
                alert("Erreur : les informations de connexion sont incorrectes. Veuillez réessayer.");
            } else {
                return response.json();
            }
            
        })
        .then(data => {
            const token = data.token;
            sessionStorage.setItem("authToken", token);
            window.location.href = "index.html";
        })
        .catch(err => {
            console.log(err);
            alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
        });
    });
}
login();

/**********************************************login/logout button**********************************************************/
function logged() {
    const logoutBtn = document.querySelector('.logOut');
    const loginBtn = document.querySelector('.logIn');
    const openModal = document.querySelector(".mes-projets-btn");

    const token = sessionStorage.getItem("authToken");
    console.log(token);

    if (token) {
        logoutBtn.style.display = "block"; 
        loginBtn.style.display = "none"; 
        openModal.style.display = "flex"; 
    } else {
        logoutBtn.style.display = "none"; 
        loginBtn.style.display = "block"; 
        openModal.style.display = "none";
    };

    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("authToken"); 
        window.location.href = "index.html"; 
        console.log(token);
        alert("Log out successful !")
    });
}
logged();

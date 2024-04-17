// login script
const loginForm = document.getElementById("loginBox");
const email = document.getElementById("email");
const password = document.getElementById("password");
const apiUrl = await "http://localhost:5678/api"

/*
function validerMail(email) {
    let mailRegEx = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[[a-z0-9._-]+]")
    if (mailRegEx.test(email)) {
        return true
    }
    return false
}
*/

loginForm.addEventListener("submit", () => {
    preventDefault();
    alert("loginform complete");
    
    const email = document.getElementById("loginMail"); 
    const password =document.getElementById("loginPassword"); 
    const loginData = JSON.stringify({"email":email.value, "password":password.value});
    fetch(apiUrl + '/users/login', {
        method: 'POST',
        body: loginData
    })
    
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        
    })
    .then(data => {
        // Handle successful login response
        // For example, you can redirect the user to another page
        window.location.href = 'homepageLoggedIn.html';
    })
    .catch(error => {
        // Handle errors, e.g., incorrect credentials
        // document.getElementById('message').innerText = 'Incorrect username or password';
        console.error('There was a problem with the fetch operation:', error);
    });
    
});


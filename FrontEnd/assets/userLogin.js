const apiUrl = 'http://localhost:5678/api/users/login';
const requestBody = {
"email": "string",
"password": "string"
}
// login script
const loginForm = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitInfo = document.getElementById("submit");


submitInfo.addEventListener('click', (e) => {
    e.preventDefault();
    
    const userInfo = new FormData(form);
    console.log(...userInfo);
    
   fetch('http://localhost:5678/api/users/login', {
    method: "POST", 
    body: userInfo
   })  
   .then(res => res.json())
   .then(data => console.log(data))
   .catch(err => console.log(err))      
});


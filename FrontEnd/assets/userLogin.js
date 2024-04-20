/**********************************************Login Functions**********************************************************/
// login script
const loginForm = document.getElementById("loginBox");
const email = document.getElementById("email");
const password = document.getElementById("password");
const submitInfo = document.getElementById("seConnecter");

export function loginUsers() {
    submitInfo.addEventListener("submit", function (event) {
        event.preventDefault();

        const loginAuthentification = {
            email : parseInt(event.target.email.value),
            password : parseInt(event.target.password.value)
        };

        const loginUsers = JSON.stringify(loginAuthentification);
        fetch("http://localhost:5678/api/users/login", {
            method: "POST", 
            headers: {"Content-Type": "application/json"}, 
            body: loginUsers
        });
    });
}


/*
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
 */

/*
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
            throw new Error('Networks response was not ok');
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
*/


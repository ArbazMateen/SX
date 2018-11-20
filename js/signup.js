

const usernameField = document.querySelector("#validationUsername");
const emailField = document.querySelector("#validationEmail");
const passwordField = document.querySelector("#validationPassword");
const confirmPasswordField = document.querySelector("#validationConfirmPassword");
const signupBtn = document.querySelector("#signupBtn");

const invalidUsernameMsg = document.querySelector("#invalidUsernameMsg");
const invalidEmailMsg = document.querySelector("#invalidEmailMsg");
const invalidPasswordMsg = document.querySelector("#invalidPasswordMsg");
const invalidConfirmPasswordMsg = document.querySelector("#invalidConfirmPasswordMsg");

var username;

signupBtn.onclick = function() {
	username = usernameField.value;
	var email = emailField.value;
	var password = passwordField.value;
	var confirmPassword = confirmPasswordField.value;

	if(username === "") {
		usernameField.className += " is-invalid";
		invalidUsernameMsg.style.display = "block";
	} else {
		usernameField.classList.remove("is-invalid");
		invalidUsernameMsg.style.display = "none";
	}

	if(email === "") {
		emailField.className += " is-invalid";
		invalidEmailMsg.style.display = "block";
	} else {
		emailField.classList.remove("is-invalid");
		invalidEmailMsg.style.display = "none";
	}

	if(password === "") {
		passwordField.className += " is-invalid";
		invalidPasswordMsg.style.display = "block";
	} else {
		passwordField.classList.remove("is-invalid");
		invalidPasswordMsg.style.display = "none";
	}

	if(confirmPassword === "" || confirmPassword != password) {
		confirmPasswordField.className += " is-invalid";
		invalidConfirmPasswordMsg.style.display = "block";
	} else {
		confirmPasswordField.classList.remove("is-invalid");
		invalidConfirmPasswordMsg.style.display = "none";
	}

	if(username && email && password && (password === confirmPassword)) {
		signup(email, password);
	}
}

function signup(email, password) {
	firebase.auth().createUserWithEmailAndPassword(email, password)
	.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;

		window.alert("Registraction Error.\nError Code: " + errorCode + "\nError Message: " + errorMessage);

	});
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		if(username) {
			firestore.collection(USERS).doc(user.uid).set({
				name: username,
				role: "Admin"
			}, { merge: true}).then(function(){
				console.log("firestore update user name.")
			}, function(error) {
				console.log(error.message);
			});
		}
		// User is signed in.
		// var displayName = user.displayName;
		// var email = user.email;
		// var emailVerified = user.emailVerified;
		// var photoURL = user.photoURL;
		// var isAnonymous = user.isAnonymous;
		// var uid = user.uid;
		// var providerData = user.providerData;
		// ...
		window.location = "map.html";
	} else {
		// window.location = "login.html";
		console.log("no login user");
	}
});

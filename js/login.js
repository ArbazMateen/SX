

const emailField = document.querySelector("#validationEmail");
const passwordField = document.querySelector("#validationPassword");
const loginBtn = document.querySelector("#loginBtn");
const rememberMe = document.querySelector("#rememberMe");
// const forgotPassword document.querySelector("#forgotPassword");

const invalidEmailMsg = document.querySelector("#invalidEmailMsg");
const invalidPasswordMsg = document.querySelector("#invalidPasswordMsg");


loginBtn.onclick = function() {
	var email = emailField.value;
	var password = passwordField.value;

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

	if(email && password) {
		// if(rememberMe.checked) {
		// 	setCookie(email, password);
		// }
		login(email, password);
	}
}

function login(email, password) {
	firebase.auth().signInWithEmailAndPassword(email, password)
	.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;

		window.alert("Authentication Error.\nError Code: " + errorCode + "\nError Message: " + errorMessage);

	});
}

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
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
		console.log(user);
	} else {
		// window.location = "login.html";
		console.log("no login user");
	}
});

function forgotPassword() {
	var email = emailField.value;
	
	if(email === "") {
		emailField.className += " is-invalid";
		invalidEmailMsg.style.display = "block";
	} else {
		emailField.classList.remove("is-invalid");
		invalidEmailMsg.style.display = "none";
	}
	
	if(email) {
		firebase.auth().sendPasswordResetEmail(email);
	}

}

// function setCookie(email, password) {
//     var d = new Date();
//     d.setTime(d.getTime() + (10*24*60*60*1000));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = "Email" + "=" + email + ";" + expires + ";path=/";
//  	document.cookie = "Password" + "=" + password + ";" + expires + ";path=/";   
// }

// function getCookie(cname) {
//     var name = cname + "=";
//     var ca = document.cookie.split(';');
//     for(var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

// function checkCookie() {
//     var e = getCookie("Email");
//     var p = getCookie("Password");
//     if (e != "" && p != "") {
//         emailField.value = e;
//         passwordField.value = p;
//     }
// }

// checkCookie();

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		// currentUser = user;
		var displayName = user.displayName;
		// var email = user.email;
		// // var emailVerified = user.emailVerified;
		// // var photoURL = user.photoURL;
		// // var isAnonymous = user.isAnonymous;
		// var uid = user.uid;
		// // var providerData = user.providerData;
		console.log(displayName);
		// console.log(email);
		// console.log(uid);
		// console.log(firebase.auth().currentUser['uid']);
		// console.log("UID "+ currentUser['uid']);
		
	} else {
		window.location = "login.html";
	}
});
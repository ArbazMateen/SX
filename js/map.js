
const userProfileImage = document.querySelector("#userProfileImage");
const userProfileUsername = document.querySelector("#userProfileUsername");
const userProfileEmail = document.querySelector("#userProfileEmail");
const logoutBtn = document.querySelector("#logout");

logoutBtn.onclick = function() {
    logout();
}

let usersList = document.querySelector("#users-list");
var users = [];
var innerData = "";
var markers = {};
var focusedMarker;

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		firestore.collection(USERS).doc(user.uid).get()
		.then(function(doc) {
			if (doc.exists) {
				var user = doc.data();
				var image = user['image'] ? user['image'] : "./images/logo.png";
				userProfileImage.src = image;
				userProfileUsername.innerHTML = user['name'];
				userProfileEmail.innerHTML = user['email'];
			} 
		});
	} else {
        window.location = "login.html";
    }
});

firestore.collection("Users").where("role", "==", "User")
    .onSnapshot(function(querySnapshot) {
        innerData = "";
        users = [];
        querySnapshot.forEach(function(doc) {
            var user = doc.data();
            users.push(user);

        });
        sortUSersList(users);
        
    });

function sortUSersList(userList) {
    userList.sort((a, b) => {
        var aName = a.name;
        var bName = b.name;
        var aStatus = a.status;
        var bStatus = b.status;

        if(aStatus == bStatus) {
            return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
        } else {
            return (aStatus < bStatus) ? 1 : -1;
        }

    });
    userList.forEach( user => {
        var image = 'images/logo.png';
        if(user.image) {
            image = user.image;
        }
        innerData += '<li onclick="focusOnMarker(this.id)" id="'+user.uid+'"><div class="article-author"><div class="avatar article-avatar"><img src="'+image+'" class="user-avatar"></div><div class="article-meta"><h2 class="user-title"><span class="status '+user.status+'">&#8226; </span>'+user.name+'</h2><div class="article-updated meta-data">'+user.email+'</div></div></div></li>'
        usersList.innerHTML = innerData;
        addMarker(user);
    });
}


function addMarker(user) {
    var latLon = { lat: user.lat, lng: user.lon };
    var marker;
    if(user.uid in markers) {
        marker = markers[user.uid];
        marker.setPosition(latLon);
        var icon = marker.getIcon();
        if(user.status == "online") {
            icon.fillColor = '#4caf50';
            icon.strokeColor = '#4caf50';
        } else {
            icon.fillColor = '#ff0000';
            icon.strokeColor = '#ff0000';
        }
        icon.rotation = user.bearing;
        marker.setIcon(icon);
    } else {
        var iconOpt = {
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 6,
                fillOpacity: 1.0,
                fillColor: user.status == "offline" ? '#ff0000' : '#4caf50',
                strokeColor: user.status == "offline" ? '#ff0000' : '#4caf50',
                strokeWeight: 2,
                rotation: user.bearing,
                anchor: {x: 0, y: 2},
                text: user.uid
            };
        marker = new google.maps.Marker({
            position: latLon,
            map: mGoogleMap,
            title: user.name,
            icon: iconOpt
        });
    }
    
    markers[user.uid] = marker;
    google.maps.event.addListener(marker, 'click', function() {
        // mGoogleMap.setZoom(12);
        mGoogleMap.panTo(marker.position);
        focusedMarker = marker;
        openInfoWindow(marker, marker.getIcon().text);
    });

    if(focusedMarker) {
        mGoogleMap.panTo(focusedMarker.position);
    }

    google.maps.event.addListener(mGoogleMap, 'click', function(event) {
       focusedMarker = null;   
    });
}

function focusOnMarker(uid) {
    var mark = markers[uid];
    focusedMarker = mark;
    mGoogleMap.setZoom(16);
    mGoogleMap.panTo(mark.position);
}

function openInfoWindow(marker, uid) {
    var user = users.find(u => u.uid === uid);
	var geocoder = new google.maps.Geocoder();
    var latlon = {lat: user.lat, lng: user.lon};
	var address = "Not Available";
	var image = (user.image) ? user.image : "./images/logo.png";
	geocoder.geocode({ 'latLng': latlon }, function (results, status) {
		if(status == "OK") {
			address = results[1].formatted_address;
		} 
		var contentString = '<div class="media info">'+
			'<image class="logo-small-info mr-2" src="'+image+'"/>'+
			'<div class="media-body">'+
			'<h1 class="title-user-info">'+user.name+'</h1>'+
			'<h5 class="email-user-info">'+user.email+'</h5>'+
			'</div></div><br />'+
			'<h5 class="email-user-info">Location: '+user.lat+', '+user.lon+'</h5>'+
			'<h5 class="email-user-info">Address: '+address+'</h5>';
		var infowindow = new google.maps.InfoWindow({
	        content: contentString,
	        maxWidth: 400
	    });
	    infowindow.open(mGoogleMap, marker);
	});
	
}

function logout() {
	firebase.auth().signOut();
    window.location = "login.html";
}
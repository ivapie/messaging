
import firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOJYJvQzhEHfhv3-AJyDV280Ax0vR0UnY",
    authDomain: "hello-siru.firebaseapp.com",
    databaseURL: "https://hello-siru.firebaseio.com",
    projectId: "hello-siru",
    storageBucket: "hello-siru.appspot.com",
    messagingSenderId: "855739992361"
};
firebase.initializeApp(config);

var provider = new firebase.auth.GoogleAuthProvider();


function signIn() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
    
        console.log("aqui", user )
        alert("aa")
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("ddd", error)
        // ...
      });
}

firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    console.log( user )
} else {
    signIn()
}
});





const messaging = firebase.messaging();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function (registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);

        document.getElementById("token").innerHTML = err;
        });
    });
} else {
    document.getElementById("token").innerHTML = JSON.stringify(navigator);
}

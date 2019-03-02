import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDOJYJvQzhEHfhv3-AJyDV280Ax0vR0UnY",
    authDomain: "hello-siru.firebaseapp.com",
    databaseURL: "https://hello-siru.firebaseio.com",
    projectId: "hello-siru",
    storageBucket: "hello-siru.appspot.com",
    messagingSenderId: "855739992361"
  };
  firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);

        document.getElementById("token").innerHTML = err;
      });
    });
  }else{
    document.getElementById("token").innerHTML = JSON.stringify(navigator);
  }

  const messaging = firebase.messaging();
  messaging.usePublicVapidKey("BAWXXHVp21JVH8-O9x1RttRrdGlJAqfGbK_NrCwKrNCvLVsvOliYvY-rTdrUniroWkHJQ9hpqwMN97qq00_ojx4");

  messaging.requestPermission().then(function() {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // ...
    }).catch(function(err) {
      console.log('Unable to get permission to notify.', err);
    });


  messaging.getToken().then(function(currentToken) {
    if (currentToken) {
        //sendTokenToServer(currentToken);
        //updateUIForPushEnabled(currentToken);

        console.log("currentToken", currentToken)

        document.getElementById("token").innerHTML = currentToken;

    } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        //updateUIForPushPermissionRequired();
        //setTokenSentToServer(false);
    }
    }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        //showToken('Error retrieving Instance ID token. ', err);
        //setTokenSentToServer(false);
    });


    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a service worker
    //   `messaging.setBackgroundMessageHandler` handler.
    messaging.onMessage(function(payload) {
        console.log('Message received. ', payload);
    // ...
    });

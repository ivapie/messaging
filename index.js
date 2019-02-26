import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCTLeugFbn5gzu-aORckb8Je_Ty_I7M8bI",
  authDomain: "monkeyjungle.firebaseapp.com",
  databaseURL: "https://monkeyjungle.firebaseio.com",
  projectId: "monkeyjungle",
  storageBucket: "monkeyjungle.appspot.com",
  messagingSenderId: "849160282804"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

var counter = 1;
var query = db.collection("Sensors")
  .orderBy('createdAt', 'desc')
  .limit(10)

query
    .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {

            console.log( new Date(), counter++ )
            if (change.type === "added") {
                console.log("New city: ", change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    });

    const messaging = firebase.messaging();
    messaging.usePublicVapidKey("BDOo2vCDBfwrozL6_jELYTT28Q0gFxgFyiXgBUoGrw6a_rePxVgFFpzquwON-wIkB2ZhlzCpu-VrCPaHF55rplM");

    messaging.requestPermission().then(function() {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
      }).catch(function(err) {
        console.log('Unable to get permission to notify.', err);
      });

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then(function(currentToken) {
    if (currentToken) {
        //sendTokenToServer(currentToken);
        //updateUIForPushEnabled(currentToken);

        console.log("currentToken", currentToken)
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

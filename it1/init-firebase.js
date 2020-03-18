
var init = function() {
    var firebaseConfig = {
        apiKey: "AIzaSyAhU3F-De17VAsUgpRjj25f48QiXycorD4",
        authDomain: "it1-heimdal-vgs.firebaseapp.com",
        databaseURL: "https://it1-heimdal-vgs.firebaseio.com",
        projectId: "it1-heimdal-vgs",
        storageBucket: "it1-heimdal-vgs.appspot.com",
        messagingSenderId: "206703382262",
        appId: "1:206703382262:web:be48f32d11a15fa28f26d7"
    }
    return firebase.initializeApp(firebaseConfig)
}

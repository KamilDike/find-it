import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDih9xCY6lYqOx-aUEt9w8G8saPXty3N2I",
    authDomain: "find-it-game.firebaseapp.com",
    projectId: "find-it-game",
    storageBucket: "find-it-game.appspot.com",
    messagingSenderId: "479377336680",
    appId: "1:479377336680:web:7ce1da68efe5ab1ea70edd",
    measurementId: "G-N632QSXPKY"
};

firebase.initializeApp(firebaseConfig);

const Firestore = firebase.firestore()

export default Firestore



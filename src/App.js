import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app"
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useState } from 'react';



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

function App() {
  const [user, setUser] = useState({});
  var provider = new firebase.auth.GoogleAuthProvider();
  var fbProvider = new firebase.auth.FacebookAuthProvider();
  var GithubProvider = new firebase.auth.GithubAuthProvider();
  const handleGoogleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
        console.log(user)
        setUser(user);

      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorMessage, errorCode, email)
      });
  }

  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var accessToken = credential.accessToken;

        // ...
        setUser(user)
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential)
        // ...
      });
  }

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(GithubProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        console.log(user)
        setUser(user)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(errorCode,errorMessage, email, credential)
        // ...
      });
  }
  return (
    <div className="App">
    <button onClick={handleGoogleSignIn}>Sign In via Google</button>
    <br></br>
    <button onClick={handleFbSignIn}>Sign In via Facebook</button>
    <br></br>
    <button onClick={handleGithubSignIn}>Sign In via Github</button>
    <h3>Name: {user.displayName}</h3>
    <img src={user.photoURL}></img>
    </div>
  );
}

export default App;

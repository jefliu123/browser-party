import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import generate from "project-name-generator";
import db from "firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCi1DIq90GIhBHDoQNQp5jAA5DqgmyQnLc",
  authDomain: "browserparty.firebaseapp.com",
  projectId: "browserparty",
  storageBucket: "browserparty.appspot.com",
  messagingSenderId: "477711712483",
  appId: "1:477711712483:web:bf4c204e171208b9a445d6",
  measurementId: "G-TBF684DB8P",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const firestore = firebase.firestore();

function LobbyPage() {
  const [redirect, setRedirect] = useState(false);
  const [rooms, setRooms] = useState([]);
  //const gamesRef = firestore.collection("games");
  let db = firebase.firestore();
  //real time listener
  useEffect(() => {
    setRooms([]);
    let unsubscribe = db
      .collection("games")
      .where("status", "==", "waiting")
      .onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          //setRooms(change.doc.id);
          setRooms((rooms) => [rooms, change.doc.id]);
        });
      });
    return () => unsubscribe();
  }, []);

  if (redirect) {
    return <Redirect to={redirect} push />;
  }

  return (
    <div>
      <h1>BrowserParty</h1>
      <button onClick={() => setRedirect("/room/" + generate().dashed)}>
        New Room
      </button>
      <h2>Existing Rooms</h2>
      <p>{rooms}</p>
      <button onClick={() => setRedirect("/room/kangaroo")}>Join</button>
    </div>
  );
}

export default LobbyPage;

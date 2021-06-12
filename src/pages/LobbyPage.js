import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import generate from "project-name-generator";

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
	const [rooms, setRooms] = useState([]);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		let unsubscribe = firestore
			.collection("games")
			.where("status", "==", "waiting")
			.onSnapshot((snapshot) => {
				setRooms(snapshot.docs.map((doc) => doc.id));
			});
		return () => unsubscribe();
	}, []);

	if (redirect) {
		return <Redirect to={redirect} push />;
	}

	return (
		<div className="lobbyPage">
			<h1>BrowserParty</h1>
			<button onClick={() => setRedirect("/room/" + generate().dashed)}>
				New Room
			</button>
			<h2>Public Rooms</h2>
			<div>
				{rooms.map((room) => (
					<div key={room}>
						{room}
						<button onClick={() => setRedirect("/room/" + room)}>
							Join Room
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default LobbyPage;

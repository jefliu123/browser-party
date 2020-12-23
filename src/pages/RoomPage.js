import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";

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

function RoomPage({ gameId }) {
	//game data
	const [game, setGame] = useState(null);
	//text box value
	const [value, setValue] = useState("");
	//boolean for whether player joined
	const [joined, setJoined] = useState(true);
	const [redirect, setRedirect] = useState(false);

	const gameRef = firestore.collection("games").doc(`${gameId}`);


	useEffect(() => {
		function update(snapshot) {
			if (snapshot.exists) {
				//get state of game if it exists
				setGame(snapshot.data());
			} else {
				//initialize state of game
				gameRef.set({
					state: "",
					status: "waiting",
					players: [],
				});
			}
		}

		const unsubscribe = gameRef.onSnapshot("value", update);
		return () => unsubscribe();
	}, [gameId]);

	function startGame() {
		firebase
		  .database()
		  .ref(`games/${gameId}`)
		  gameRef.update({
			status: "ingame",
		  });
		  setRedirect("/game/" + `${gameId}`)
	  }

	  if (redirect) {
		return <Redirect to={redirect} push />;
	}
	  
	function joinRoom(e) {
		e.preventDefault();

		if (value) {
			gameRef.update({
				players: firebase.firestore.FieldValue.arrayUnion(value),
			});
			setJoined(false);
		}
	}

	const link = "localhost:3010/room/" + gameId;

	return (
		<div>
			<h1>Room: {gameId}</h1>
			{game && game.status === "waiting" &&(
				<div>
					<p>
						Share this link with your friends to invite them:{" "}
						<a href={link}>{link}</a>
					</p>
					<p>Status: {game.status}</p>
					<div>
						{game.players.map((player, index) => (
							<p>
								Player {index + 1}: {player}
							</p>
						))}
					</div>
					<div>
						{joined && (
							<form onSubmit={joinRoom}>
								<label>
									Join as:
									<input
										type="text"
										value={value}
										onChange={(e) => setValue(e.target.value)}
									/>
								</label>
								<input type="submit" value="Enter" />
							</form>
						)}
					</div>
					<div>
						<button
						 variant="contained"
						 color="primary"
						 onClick={startGame}
						>
							Start
						</button>
						</div>
				</div>
			)}
		</div>
	);
}

export default RoomPage;

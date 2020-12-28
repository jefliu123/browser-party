import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

//context
import { PlayerContext } from "../context/player";

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

function GamePage({ gameId }) {
	const { name, isRegistered } = useContext(PlayerContext);

	const [game, setGame] = useState(null);
	const [playerOrder, setPlayerOrder] = useState([]);

	useEffect(() => {
		firestore
			.collection("games")
			.doc(`${gameId}`)
			.get()
			.then((snapshot) => {
				setPlayerOrder(snapshot.get("playerOrder"));
			});

		function update(snapshot) {
			if (snapshot.exists) {
				//get state of game if it exists
				setGame(snapshot.data());
			} else {
				console.error("Game doesn't exist");
			}
		}
		const unsubscribe = firestore
			.collection("games")
			.doc(`${gameId}`)
			.onSnapshot("value", update);

		return () => unsubscribe();
	}, [gameId]);

	return (
		<div>
			{isRegistered && (
				<div>
					<p>You are {name}</p>
				</div>
			)}
			<h1>Game: {gameId}</h1>
			{game &&
				(game.status === "ingame" ? (
					<div>
						<p>Status: {game.status}</p>
						<div>
							{playerOrder.map((player, index) => (
								<div key={index}>
									<p>
										Player {index + 1}: {player}
									</p>
								</div>
							))}
						</div>
					</div>
				) : (
					<div>
						<p>Game has not been started or has already ended</p>
					</div>
				))}
		</div>
	);
}

export default GamePage;

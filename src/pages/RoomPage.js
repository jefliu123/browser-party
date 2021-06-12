import React, { useState, useEffect, useContext } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import { Redirect } from "react-router-dom";

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

function RoomPage({ gameId }) {
	const { name, isRegistered, registerPlayer, unregisterPlayer } = useContext(
		PlayerContext
	);

	const [game, setGame] = useState(null);
	const [players, setPlayers] = useState([]);
	const [value, setValue] = useState("");
	const [redirect, setRedirect] = useState(false);

	const gameRef = firestore.collection("games").doc(`${gameId}`);

	useEffect(() => {
		function update(snapshot) {
			if (snapshot.exists) {
				//get state of game if it exists
				setGame(snapshot.data());
				setPlayers(Object.keys(snapshot.data().gameData.players));
			} else {
				//initialize state of game
				firestore
					.collection("games")
					.doc(`${gameId}`)
					.set({
						createdAt: firebase.firestore.FieldValue.serverTimestamp(),
						type: "public",
						status: "waiting",
						playerOrder: [],
						gameData: {
							players: {},
							phase: "rolling",
							turn: 0,
							roll: 0,
							starPos: 19,
							stealCoins: false,
							stealTarget: "",
							rps1: "",
							rps2: "",
							minigame: Math.floor(Math.random(0, 6)),
						},
					});
			}
		}

		const unsubscribe = firestore
			.collection("games")
			.doc(`${gameId}`)
			.onSnapshot("value", update);

		return () => unsubscribe();
	}, [gameId]);

	function joinRoom(e) {
		e.preventDefault();

		if (value) {
			gameRef.update({
				[`gameData.players.${value}`]: { coins: 10, stars: 0, boardPos: 0 },
			});
			registerPlayer(value);
		}
	}

	function startGame() {
		gameRef.update({
			status: "ingame",
			playerOrder: players,
		});
		setRedirect(`/game/${gameId}`);
	}

	function unregister() {
		gameRef.set(
			{
				gameData: {
					players: {
						[name]: firebase.firestore.FieldValue.delete(),
					},
				},
			},
			{ merge: true }
		);
		unregisterPlayer();
	}

	function populate() {
		gameRef.update({
			"gameData.players.ashley": { coins: 10, stars: 0, boardPos: 0 },
			"gameData.players.emily": { coins: 10, stars: 0, boardPos: 0 },
			"gameData.players.alan": { coins: 10, stars: 0, boardPos: 0 },
			"gameData.players.aaron": { coins: 10, stars: 0, boardPos: 0 },
			"gameData.players.brian": { coins: 10, stars: 0, boardPos: 0 },
		});
	}

	if (redirect) {
		return <Redirect to={redirect} push />;
	}

	const link = "browserparty.web.app/room/" + gameId;

	return (
		<div>
			{isRegistered && (
				<div>
					<p>You are registered as {name}</p>
					<button onClick={unregister}>Unregister</button>
					{/* <button onClick={populate}>Test Populate</button> */}
				</div>
			)}
			<h1>Room: {gameId}</h1>
			{game &&
				(game.status === "waiting" ? (
					<div>
						<p>
							Share this link with your friends to invite them:{" "}
							<a href={link}>{link}</a>
						</p>
						<p>Room Type: {game.type}</p>
						<p>Status: {game.status}</p>
						<div>
							{players.map((player, index) => (
								<div key={index}>
									{player !== name ? (
										<p>
											Player {index + 1}: {player}
										</p>
									) : (
										<p>
											Player {index + 1}: {player} (you)
										</p>
									)}
								</div>
							))}
						</div>
						<div>
							{!isRegistered && (
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
							{players.length > 0 && <button onClick={startGame}>Start</button>}
						</div>
					</div>
				) : (
					<div>
						<p>Already in game...</p>
						<button
							onClick={() => {
								setRedirect(`/game/${gameId}`);
							}}
						>
							Go to Game
						</button>
					</div>
				))}
		</div>
	);
}

export default RoomPage;

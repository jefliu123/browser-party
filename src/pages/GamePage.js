import "./styles.css";
import React, { useState, useEffect, useContext } from "react";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

//context
import { PlayerContext } from "../context/player";

//components
import PlayerBar from "../components/PlayerBar";
import GameBoard from "../components/GameBoard";
import ActionSideBar from "../components/ActionSideBar";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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

const useStyles = makeStyles((theme) => ({
	container: {
		height: "100%",
	},
	playerBar: {
		textAlign: "center",
		zoom: "80%",
	},
	gameBoard: {
		textAlign: "center",
		maxWidth: 1040,
	},
}));

function GamePage({ gameId }) {
	const classes = useStyles();

	const { name, isRegistered } = useContext(PlayerContext);

	const [game, setGame] = useState(null);
	const [currentPlayer, setCurrentPlayer] = useState("");

	useEffect(() => {
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

	useEffect(() => {
		if (game) {
			let playerNum = game.gameData.turn % game.playerOrder.length;
			setCurrentPlayer(game.playerOrder[playerNum]);
		}
	}, [game]);

	return (
		<div className="gamePage">
			<div id="cloud-intro">
				{game && game.status === "ingame" ? (
					<Grid container spacing={0} className={classes.container}>
						<Grid item xs={1}></Grid>
						<Grid item xs={10} className={classes.playerBar}>
							<PlayerBar game={game} currentPlayer={currentPlayer} />
						</Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={7}>
							<Paper className={classes.gameBoard} elevation={10}>
								<GameBoard game={game} />
							</Paper>
						</Grid>
						<Grid item xs={3}>
							<ActionSideBar
								game={game}
								currentPlayer={currentPlayer}
								gameId={gameId}
							/>
						</Grid>
						<Grid item xs={1}></Grid>
					</Grid>
				) : (
					<div style={{ "text-align": "center", height: "100%" }}>
						<h1 style={{ "padding-top": "100px", "padding-bottom": "100px" }}>
							No active game found.
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default GamePage;

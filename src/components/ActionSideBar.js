import React, { useState, useEffect, useContext } from "react";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

//context
import { PlayerContext } from "../context/player";

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
	root: {
		flexGrow: 1,
	},
}));

function ActionSideBar({ game, currentPlayer, gameId }) {
	const classes = useStyles();
	const { name, isRegistered } = useContext(PlayerContext);

	function incrementTurn() {
		if (
			game.gameData.turn % game.playerOrder.length ===
			game.playerOrder.length - 1
		) {
			firestore
				.collection("games")
				.doc(`${gameId}`)
				.update({
					"gameData.turn": firebase.firestore.FieldValue.increment(1),
					"gameData.phase": "minigame",
				});
		} else {
			firestore
				.collection("games")
				.doc(`${gameId}`)
				.update({
					"gameData.turn": firebase.firestore.FieldValue.increment(1),
				});
		}
	}

	function incrementBoardPos() {
		firestore
			.collection("games")
			.doc(`${gameId}`)
			.update({
				[`gameData.players.${name}.boardPos`]: firebase.firestore.FieldValue.increment(
					1
				),
			});
	}

	function decrementBoardPos() {
		firestore
			.collection("games")
			.doc(`${gameId}`)
			.update({
				[`gameData.players.${name}.boardPos`]: firebase.firestore.FieldValue.increment(
					-1
				),
			});
	}

	function endMinigamePhase() {
		firestore.collection("games").doc(`${gameId}`).update({
			"gameData.phase": "rolling",
		});
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={0}>
				<Grid item xs={12}>
					<Paper>
						{name === currentPlayer && game.gameData.phase !== "minigame" && (
							<div>
								<h2>It is your turn {name}</h2>
								{game.gameData.phase === "rolling" && (
									<div>
										<button onClick={incrementBoardPos}> Go forward </button>
										<button onClick={decrementBoardPos}> Go back </button>
									</div>
								)}
							</div>
						)}

						<div>
							<button onClick={incrementTurn}>End Turn</button>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={12}></Grid>
				<Grid item xs={12}>
					{game.gameData.phase === "minigame" && (
						<div>
							<p>--------------------------------</p>
							<h2>MINIGAME TIME</h2>
							<p>Go to ...................... blah blah</p>
							<p>Input Scores ...................... blah blah</p>
							<button onClick={endMinigamePhase}>Next</button>
						</div>
					)}
				</Grid>
			</Grid>
		</div>
	);
}

export default ActionSideBar;

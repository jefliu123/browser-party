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
import Modal from "@material-ui/core/Modal";

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
		fontFamily: "cursive",
	},
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	minigameBox: {
		fontFamily: "cursive",
		outline: 0,
		marginTop: 10,
		padding: 20,
		textAlign: "center",
		minHeight: "70vh",
		minWidth: "50vw",
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

	function renderMinigameRules(minigameId) {
		switch (minigameId) {
			case 0:
				return (
					<div className="minigameRules">
						<button className="getStartedButton" onClick={rerollMinigame}>
							REROLL
						</button>
						<h1>Game: Scribbl</h1>
						<h2>
							<a
								style={{ color: "white" }}
								href="https://skribbl.io/"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://skribbl.io/
							</a>{" "}
							<br></br>
							Create private room -<br></br>
							Share link<br></br>
							Rounds: 1<br></br>
							Draw time: 30 seconds<br></br>
						</h2>
						<h1>TOP 3 WIN</h1>
					</div>
				);
			case 1:
				return (
					<div className="minigameRules">
						<button className="getStartedButton" onClick={rerollMinigame}>
							REROLL
						</button>
						<h1>Game: Tetris</h1>
						<h2>
							<a
								style={{ color: "white" }}
								href="https://jstris.jezevec10.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://jstris.jezevec10.com/
							</a>{" "}
							<br></br>
							Lobby - Create Room -<br></br>
							Share link<br></br>
							Private: check<br></br>
							Presets: default<br></br>
						</h2>
						<h1>TOP 3 WIN</h1>
					</div>
				);
			case 2:
				return (
					<div className="minigameRules">
						<button className="getStartedButton" onClick={rerollMinigame}>
							REROLL
						</button>
						<h1>Game: Typeracer</h1>
						<h2>
							<a
								style={{ color: "white" }}
								href="https://play.typeracer.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://play.typeracer.com/
							</a>{" "}
							<br></br>
							Race Your Friends -<br></br>
							Share link<br></br>
						</h2>
						<h1>TOP 3 WIN</h1>
					</div>
				);
			case 3:
				return (
					<div className="minigameRules">
						<button className="getStartedButton" onClick={rerollMinigame}>
							REROLL
						</button>
						<h1>Game: Codenames</h1>
						<h2>
							<a
								style={{ color: "white" }}
								href="https://codies.xyz/"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://codies.xyz/
							</a>{" "}
							<br></br>
							Enter name, password - Create New Game -<br></br>
							Share link<br></br>
							Randomize teams once<br></br>
							30 second timer if necessary<br></br>
						</h2>
						<h1>WINNING TEAM WINS</h1>
					</div>
				);
			case 4:
				return (
					<div className="minigameRules">
						<button className="getStartedButton" onClick={rerollMinigame}>
							REROLL
						</button>
						<h1>Game: Spyfall</h1>
						<h2>
							<a
								style={{ color: "white" }}
								href="https://spyfall.adrianocola.com/#"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://spyfall.adrianocola.com/#
							</a>{" "}
							<br></br>
							Create Room -<br></br>
							Share link<br></br>
							Timer: 6:00<br></br>
						</h2>
						<h1>SPY OR EVERYONE ELSE WINS</h1>
					</div>
				);
			case 5:
				return (
					<div className="minigameRules">
						<button className="getStartedButton" onClick={rerollMinigame}>
							REROLL
						</button>
						<h1>Game: Trivia</h1>
						<h2>
							<a
								style={{ color: "white" }}
								href="https://protobowl.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								https://protobowl.com/
							</a>{" "}
							<br></br>
							Go to Room -<br></br>
							Share link<br></br>
							Difficulty: Middle School, Everything<br></br>
							Play at least 10 questions<br></br>
						</h2>
						<h1>TOP 3 WIN</h1>
					</div>
				);
			default:
				return (
					<div className="minigameRules">
						<button className="getStartedButton" onClick={rerollMinigame}>
							REROLL
						</button>
						<h1>ERROR PLEASE REROLL</h1>
					</div>
				);
		}
	}

	function rerollMinigame() {
		firestore
			.collection("games")
			.doc(`${gameId}`)
			.update({
				"gameData.minigame": Math.floor(Math.random() * 6),
			});
	}

	function winMinigame() {
		firestore
			.collection("games")
			.doc(`${gameId}`)
			.update({
				[`gameData.players.${name}.coins`]: firebase.firestore.FieldValue.increment(
					10
				),
			});
	}

	function revertWinMinigame() {
		firestore
			.collection("games")
			.doc(`${gameId}`)
			.update({
				[`gameData.players.${name}.coins`]: firebase.firestore.FieldValue.increment(
					-10
				),
			});
	}

	function endMinigamePhase() {
		firestore
			.collection("games")
			.doc(`${gameId}`)
			.update({
				"gameData.phase": "rolling",
				"gameData.minigame": Math.floor(Math.random() * 6),
			});
	}

	return (
		<div className="gamePage">
			<div id="cloud-intro">
				{game && game.status === "ingame" ? (
					<Grid container spacing={0} className={classes.container}>
						<Modal
							className={classes.modal}
							open={game.gameData.phase === "minigame"}
						>
							<Paper className={classes.minigameBox}>
								<h1>Minigame Time!</h1>
								{renderMinigameRules(game.gameData.minigame)}
								<div>
									<button className="getStartedButton" onClick={winMinigame}>
										I WON
									</button>
									<span> </span>
									<button
										className="getStartedButton"
										onClick={revertWinMinigame}
									>
										NVM
									</button>
									<span> </span>
									<button
										className="getStartedButton"
										onClick={endMinigamePhase}
									>
										FINISH
									</button>
								</div>
								<h2>
									(ONLY CLICK FINISH AFTER ALL WINNERS HAVE RECEIVED REWARDS)
								</h2>
							</Paper>
						</Modal>
						<Grid item xs={1}></Grid>
						<Grid item xs={10} className={classes.playerBar}>
							<PlayerBar game={game} currentPlayer={currentPlayer} />
						</Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={7}>
							<Paper className={classes.gameBoard} elevation={24}>
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
					<div style={{ textAlign: "center", height: "100%" }}>
						<h1 style={{ paddingTop: "100px", paddingBottom: "100px" }}>
							No active game found.
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export default GamePage;

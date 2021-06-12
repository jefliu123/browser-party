import "./styles.css";

import React, { useState, useEffect, useContext } from "react";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";

//context
import { PlayerContext } from "../context/player";

//assets
import star from "../assets/star.png";
import character from "../assets/character.png";

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
	actionSideBar: {
		textAlign: "center",
		backgroundColor: "#00000029",
		minHeight: "75vh",
		margin: "10px",
	},
}));

function ActionSideBar({ game, currentPlayer, gameId }) {
	const classes = useStyles();
	const { name } = useContext(PlayerContext);

	const [nextBoardPos, setNextBoardPos] = useState(0);
	const [diceAnimated, setDiceAnimated] = useState(false);

	useEffect(() => {
		if (game && currentPlayer) {
			setNextBoardPos(nextPos(game.gameData.players[currentPlayer].boardPos));
		}
	}, [game, currentPlayer]);

	function rollDice() {
		firestore
			.collection("games")
			.doc(`${gameId}`)
			.update({
				"gameData.roll": Math.floor(Math.random() * 6 + 1),
				// "gameData.roll": 6,
				"gameData.phase": "rolled",
			});
		setDiceAnimated(false);
	}

	function goToMoving() {
		firestore.collection("games").doc(`${gameId}`).update({
			"gameData.phase": "moving",
		});
	}

	function setLeftFork() {
		switch (game.gameData.players[currentPlayer].boardPos) {
			case 7:
				setNextBoardPos(8);
				break;
			case 14:
				setNextBoardPos(22);
				break;
			case 25:
				setNextBoardPos(26);
				break;
			default:
		}
	}

	function setRightFork() {
		switch (game.gameData.players[currentPlayer].boardPos) {
			case 7:
				setNextBoardPos(3);
				break;
			case 14:
				setNextBoardPos(15);
				break;
			case 25:
				setNextBoardPos(32);
				break;
			default:
		}
	}

	function moveOneSpace() {
		if (game.gameData.roll > 1) {
			firestore
				.collection("games")
				.doc(`${gameId}`)
				.update({
					[`gameData.players.${name}.boardPos`]: nextBoardPos,
					"gameData.roll": firebase.firestore.FieldValue.increment(-1),
				});
		} else {
			let tempNextBoardPos = landedAt(nextBoardPos);
			firestore
				.collection("games")
				.doc(`${gameId}`)
				.update({
					[`gameData.players.${name}.boardPos`]: tempNextBoardPos,
					"gameData.roll": 0,
					"gameData.phase": "landed",
				});
		}
	}

	function buyStar() {
		if (game.gameData.players[currentPlayer].coins >= 20) {
			let newStarPos = game.gameData.players[currentPlayer].boardPos;
			switch (game.gameData.players[currentPlayer].boardPos) {
				case 30:
					newStarPos = 44;
					break;
				case 44:
					newStarPos = 19;
					break;
				case 19:
					newStarPos = 5;
					break;
				case 5:
					newStarPos = 30;
					break;
				default:
			}
			firestore
				.collection("games")
				.doc(`${gameId}`)
				.update({
					[`gameData.players.${name}.coins`]: firebase.firestore.FieldValue.increment(
						-20
					),
					[`gameData.players.${name}.stars`]: firebase.firestore.FieldValue.increment(
						1
					),
					"gameData.starPos": newStarPos,
				});
		}
	}

	function landedAt(landedPos) {
		switch (landedPos) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
			case 14:
			case 16:
			case 18:
			case 19:
			case 21:
			case 22:
			case 23:
			case 25:
			case 27:
			case 28:
			case 30:
			case 31:
			case 32:
			case 34:
			case 35:
			case 37:
			case 38:
			case 40:
			case 42:
			case 43:
			case 45:
				firestore
					.collection("games")
					.doc(`${gameId}`)
					.update({
						[`gameData.players.${name}.coins`]: firebase.firestore.FieldValue.increment(
							3
						),
					});
				return landedPos;
			case 4:
			case 9:
			case 13:
			case 20:
			case 24:
			case 33:
			case 39:
			case 44:
				firestore
					.collection("games")
					.doc(`${gameId}`)
					.update({
						[`gameData.players.${name}.coins`]: firebase.firestore.FieldValue.increment(
							-3
						),
					});
				return landedPos;
			case 2:
				return 41;
			case 17:
				return 29;
			case 29:
				return 17;
			case 41:
				return 2;
			case 6:
			case 11:
			case 15:
			case 26:
			case 36:
				let targetPos = Math.floor(Math.random() * game.playerOrder.length);
				let target = game.playerOrder[targetPos];
				if (target === name) {
					if (targetPos !== game.playerOrder.length - 1) {
						target = game.playerOrder[targetPos + 1];
					} else {
						target = game.playerOrder[targetPos - 1];
					}
				}
				firestore.collection("games").doc(`${gameId}`).update({
					"gameData.stealCoins": true,
					"gameData.stealTarget": target,
				});
				return landedPos;
			default:
		}
	}

	function landedMessage() {
		switch (game.gameData.players[currentPlayer].boardPos) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
			case 14:
			case 16:
			case 18:
			case 19:
			case 21:
			case 22:
			case 23:
			case 25:
			case 27:
			case 28:
			case 30:
			case 31:
			case 32:
			case 34:
			case 35:
			case 37:
			case 38:
			case 40:
			case 42:
			case 43:
			case 45:
				return " got 3 coins.";
			case 4:
			case 9:
			case 13:
			case 20:
			case 24:
			case 33:
			case 39:
			case 44:
				return " lost 3 coins.";
			case 2:
			case 17:
			case 29:
			case 41:
				return " teleported.";
			case 6:
			case 11:
			case 15:
			case 26:
			case 36:
				return ` are dueling ${game.gameData.stealTarget} for 5 coins.`;
			default:
		}
	}

	function incrementTurn() {
		var targetName = game.gameData.stealTarget;
		if (
			game.gameData.turn % game.playerOrder.length ===
			game.playerOrder.length - 1
		) {
			if (game.gameData.stealCoins === true) {
				switch (rpsResult(game.gameData.rps1, game.gameData.rps2)) {
					case "You win!":
						firestore
							.collection("games")
							.doc(`${gameId}`)
							.update({
								[`gameData.players.${name}.coins`]: firebase.firestore.FieldValue.increment(
									5
								),
								[`gameData.players.${targetName}.coins`]: firebase.firestore.FieldValue.increment(
									-5
								),
							});
						break;
					case "You lose.":
						firestore
							.collection("games")
							.doc(`${gameId}`)
							.update({
								[`gameData.players.${name}.coins`]: firebase.firestore.FieldValue.increment(
									-5
								),
								[`gameData.players.${targetName}.coins`]: firebase.firestore.FieldValue.increment(
									5
								),
							});
						break;
					default:
				}
			}
			firestore
				.collection("games")
				.doc(`${gameId}`)
				.update({
					"gameData.turn": firebase.firestore.FieldValue.increment(1),
					"gameData.phase": "minigame",
					"gameData.stealCoins": false,
					"gameData.stealTarget": "",
					"gameData.rps1": "",
					"gameData.rps2": "",
				});
		} else {
			if (game.gameData.stealCoins === true) {
				switch (rpsResult(game.gameData.rps1, game.gameData.rps2)) {
					case "You win!":
						firestore
							.collection("games")
							.doc(`${gameId}`)
							.update({
								[`gameData.players.${name}.coins`]: firebase.firestore.FieldValue.increment(
									5
								),
								[`gameData.players.${targetName}.coins`]: firebase.firestore.FieldValue.increment(
									-5
								),
							});
						break;
					case "You lose.":
						firestore
							.collection("games")
							.doc(`${gameId}`)
							.update({
								[`gameData.players.${name}.coins`]: firebase.firestore.FieldValue.increment(
									-5
								),
								[`gameData.players.${targetName}.coins`]: firebase.firestore.FieldValue.increment(
									5
								),
							});
						break;
					default:
				}
			}
			firestore
				.collection("games")
				.doc(`${gameId}`)
				.update({
					"gameData.turn": firebase.firestore.FieldValue.increment(1),
					"gameData.phase": "rolling",
					"gameData.stealCoins": false,
					"gameData.stealTarget": "",
					"gameData.rps1": "",
					"gameData.rps2": "",
				});
		}
	}

	function nextPos(currentPos) {
		switch (currentPos) {
			case 21:
				return 1;
			case 31:
				return 22;
			case 45:
				return 32;
			case 7:
			case 14:
			case 25:
				return 0;
			default:
				return currentPos + 1;
		}
	}

	function renderRolledDice(roll) {
		switch (roll) {
			case 1:
				return (
					<div class="side front">
						<div class="dot center"></div>
					</div>
				);
			case 2:
				return (
					<div class="side front">
						<div class="dot dtop dleft"></div>
						<div class="dot dbottom dright"></div>
					</div>
				);
			case 3:
				return (
					<div class="side front">
						<div class="dot dtop dleft"></div>
						<div class="dot center"></div>
						<div class="dot dbottom dright"></div>
					</div>
				);
			case 4:
				return (
					<div class="side front">
						<div class="dot dtop dleft"></div>
						<div class="dot dtop dright"></div>
						<div class="dot dbottom dleft"></div>
						<div class="dot dbottom dright"></div>
					</div>
				);
			case 5:
				return (
					<div class="side front">
						<div class="dot center"></div>
						<div class="dot dtop dleft"></div>
						<div class="dot dtop dright"></div>
						<div class="dot dbottom dleft"></div>
						<div class="dot dbottom dright"></div>
					</div>
				);
			case 6:
				return (
					<div class="side front">
						<div class="dot dtop dleft"></div>
						<div class="dot dtop dright"></div>
						<div class="dot dbottom dleft"></div>
						<div class="dot dbottom dright"></div>
						<div class="dot center dleft"></div>
						<div class="dot center dright"></div>
					</div>
				);
			default:
				return <div class="side front"></div>;
		}
	}

	function playerOneRock() {
		firestore.collection("games").doc(`${gameId}`).update({
			"gameData.rps1": "rock",
		});
	}

	function playerOnePaper() {
		firestore.collection("games").doc(`${gameId}`).update({
			"gameData.rps1": "paper",
		});
	}

	function playerOneScissors() {
		firestore.collection("games").doc(`${gameId}`).update({
			"gameData.rps1": "scissors",
		});
	}

	function playerTwoRock() {
		firestore.collection("games").doc(`${gameId}`).update({
			"gameData.rps2": "rock",
		});
	}

	function playerTwoPaper() {
		firestore.collection("games").doc(`${gameId}`).update({
			"gameData.rps2": "paper",
		});
	}

	function playerTwoScissors() {
		firestore.collection("games").doc(`${gameId}`).update({
			"gameData.rps2": "scissors",
		});
	}

	function rpsResult(rps1, rps2) {
		switch (rps1) {
			case "rock":
				switch (rps2) {
					case "rock":
						return "Tie";
					case "paper":
						return "You lose.";
					case "scissors":
						return "You win!";
					default:
						return "error";
				}
			case "paper":
				switch (rps2) {
					case "rock":
						return "You win!";
					case "paper":
						return "Tie";
					case "scissors":
						return "You lose.";
					default:
						return "error";
				}
			case "scissors":
				switch (rps2) {
					case "rock":
						return "You lose.";
					case "paper":
						return "You win!";
					case "scissors":
						return "Tie";
					default:
						return "error";
				}
			default:
				return "error";
		}
	}

	return (
		<div className={classes.root}>
			{currentPlayer && (
				<Grid container spacing={0}>
					<Grid item xs={12}>
						<Paper className={classes.actionSideBar}>
							{name === currentPlayer && game.gameData.phase !== "minigame" && (
								<div style={{ padding: "25px" }}>
									<h1>{currentPlayer.toUpperCase()}'S TURN</h1>
									{game.gameData.phase === "rolling" && (
										<div>
											<div id="wrapper" className="animationDiv">
												<div id="platform">
													<div
														id="dice"
														className={
															diceAnimated
																? "fastDiceAnimation"
																: "slowDiceAnimation"
														}
														onAnimationEnd={rollDice}
													>
														<div class="side front">
															<div class="dot center"></div>
														</div>
														<div class="side front inner"></div>
														<div class="side top">
															<div class="dot dtop dleft"></div>
															<div class="dot dbottom dright"></div>
														</div>
														<div class="side top inner"></div>
														<div class="side right">
															<div class="dot dtop dleft"></div>
															<div class="dot center"></div>
															<div class="dot dbottom dright"></div>
														</div>
														<div class="side right inner"></div>
														<div class="side left">
															<div class="dot dtop dleft"></div>
															<div class="dot dtop dright"></div>
															<div class="dot dbottom dleft"></div>
															<div class="dot dbottom dright"></div>
														</div>
														<div class="side left inner"></div>
														<div class="side bottom">
															<div class="dot center"></div>
															<div class="dot dtop dleft"></div>
															<div class="dot dtop dright"></div>
															<div class="dot dbottom dleft"></div>
															<div class="dot dbottom dright"></div>
														</div>
														<div class="side bottom inner"></div>
														<div class="side back">
															<div class="dot dtop dleft"></div>
															<div class="dot dtop dright"></div>
															<div class="dot dbottom dleft"></div>
															<div class="dot dbottom dright"></div>
															<div class="dot center dleft"></div>
															<div class="dot center dright"></div>
														</div>
														<div class="side back inner"></div>
														<div class="side cover x"></div>
														<div class="side cover y"></div>
														<div class="side cover z"></div>
													</div>
												</div>
											</div>
											<button
												className="gameButton"
												onClick={() => {
													setDiceAnimated(true);
												}}
											>
												ROLL
											</button>
										</div>
									)}
									{game.gameData.phase === "rolled" && (
										<div>
											<div id="wrapper" className="animationDiv">
												<div id="platform">
													<div id="dice">
														{renderRolledDice(game.gameData.roll)}
														<div class="side front inner"></div>
													</div>
												</div>
											</div>
											<button className="gameButton" onClick={goToMoving}>
												NEXT
											</button>
										</div>
									)}
									{game.gameData.phase === "moving" && (
										<div>
											<div className="animationDiv2">
												{game.gameData.players[currentPlayer].boardPos ===
												game.gameData.starPos ? (
													<div className="movingDiv">
														<img
															src={star}
															alt="star"
															style={{
																maxWidth: "50%",
																height: "auto",
															}}
														/>
														<h2>
															You are at a star<br></br>Purchase for 20 coins?
														</h2>
													</div>
												) : (
													<div className="movingDiv">
														<img
															src={character}
															alt="character"
															className="character"
														/>
													</div>
												)}
											</div>
											{nextBoardPos === 0 ? (
												<div>
													<h2>You are at a crossroads</h2>
													<div>
														<button
															className="rightLeftButton"
															onClick={setLeftFork}
														>
															LEFT
														</button>
														<span> </span>
														<button
															className="rightLeftButton"
															onClick={setRightFork}
														>
															RIGHT
														</button>
													</div>
												</div>
											) : (
												<div>
													{game.gameData.players[currentPlayer].boardPos ===
														game.gameData.starPos && (
														<div style={{ zoom: "80%" }}>
															<button className="gameButton" onClick={buyStar}>
																BUY
															</button>
															<div style={{ minHeight: "20px" }}></div>
														</div>
													)}
													<button className="gameButton" onClick={moveOneSpace}>
														MOVE
													</button>
												</div>
											)}
											<h2>{game.gameData.roll} move(s) left</h2>
										</div>
									)}
									{game.gameData.phase === "landed" && (
										<div>
											<div className="animationDiv2">
												{game.gameData.players[currentPlayer].boardPos ===
												game.gameData.starPos ? (
													<div className="movingDiv2">
														<h2>You {landedMessage()}</h2>
														<img
															src={star}
															alt="star"
															style={{
																maxWidth: "50%",
																height: "auto",
															}}
														/>
														<h2>
															You are at a star<br></br>Purchase for 20 coins?
														</h2>
													</div>
												) : (
													<div>
														<h2>You {landedMessage()}</h2>
														{game.gameData.stealCoins === true && (
															<div>
																{game.gameData.rps1 !== "" &&
																game.gameData.rps2 !== "" ? (
																	<div>
																		<h2>
																			{currentPlayer}: {game.gameData.rps1}
																		</h2>
																		<h2>
																			{game.gameData.stealTarget}:{" "}
																			{game.gameData.rps2}
																		</h2>
																		<h2>Result:</h2>
																		<h2>
																			{rpsResult(
																				game.gameData.rps1,
																				game.gameData.rps2
																			)}
																		</h2>
																	</div>
																) : (
																	<div>
																		<h2>Choose wisely:</h2>
																		{game.gameData.rps1 === "" ? (
																			<div style={{ zoom: "80%" }}>
																				<button
																					className="gameButton"
																					onClick={playerOneRock}
																				>
																					ROCK
																				</button>
																				<div
																					style={{ minHeight: "20px" }}
																				></div>
																				<button
																					className="gameButton"
																					onClick={playerOnePaper}
																				>
																					PAPER
																				</button>
																				<div
																					style={{ minHeight: "20px" }}
																				></div>
																				<button
																					className="gameButton"
																					onClick={playerOneScissors}
																				>
																					SCISSORS
																				</button>
																			</div>
																		) : (
																			<h2>Waiting for opponent..</h2>
																		)}
																	</div>
																)}
															</div>
														)}
													</div>
												)}
											</div>
											<div>
												{game.gameData.players[currentPlayer].boardPos ===
													game.gameData.starPos && (
													<div style={{ zoom: "80%" }}>
														<button className="gameButton" onClick={buyStar}>
															BUY
														</button>
														<div style={{ minHeight: "20px" }}></div>
													</div>
												)}
												<button className="gameButton" onClick={incrementTurn}>
													END
												</button>
											</div>
										</div>
									)}
								</div>
							)}
							{name !== currentPlayer && game.gameData.phase !== "minigame" && (
								<div style={{ padding: "25px", opacity: 0.7 }}>
									<h1>{currentPlayer.toUpperCase()}'S TURN</h1>
									{game.gameData.phase === "rolling" && (
										<div>
											<div id="wrapper" className="animationDiv">
												<div id="platform">
													<div
														id="dice"
														className={"fastDiceAnimationInfinite"}
													>
														<div class="side front">
															<div class="dot center"></div>
														</div>
														<div class="side front inner"></div>
														<div class="side top">
															<div class="dot dtop dleft"></div>
															<div class="dot dbottom dright"></div>
														</div>
														<div class="side top inner"></div>
														<div class="side right">
															<div class="dot dtop dleft"></div>
															<div class="dot center"></div>
															<div class="dot dbottom dright"></div>
														</div>
														<div class="side right inner"></div>
														<div class="side left">
															<div class="dot dtop dleft"></div>
															<div class="dot dtop dright"></div>
															<div class="dot dbottom dleft"></div>
															<div class="dot dbottom dright"></div>
														</div>
														<div class="side left inner"></div>
														<div class="side bottom">
															<div class="dot center"></div>
															<div class="dot dtop dleft"></div>
															<div class="dot dtop dright"></div>
															<div class="dot dbottom dleft"></div>
															<div class="dot dbottom dright"></div>
														</div>
														<div class="side bottom inner"></div>
														<div class="side back">
															<div class="dot dtop dleft"></div>
															<div class="dot dtop dright"></div>
															<div class="dot dbottom dleft"></div>
															<div class="dot dbottom dright"></div>
															<div class="dot center dleft"></div>
															<div class="dot center dright"></div>
														</div>
														<div class="side back inner"></div>
														<div class="side cover x"></div>
														<div class="side cover y"></div>
														<div class="side cover z"></div>
													</div>
												</div>
											</div>
											<button className="gameButton" onClick={() => {}}>
												ROLL
											</button>
										</div>
									)}
									{game.gameData.phase === "rolled" && (
										<div>
											<div id="wrapper" className="animationDiv">
												<div id="platform">
													<div id="dice">
														{renderRolledDice(game.gameData.roll)}
														<div class="side front inner"></div>
													</div>
												</div>
											</div>
											<button className="gameButton" onClick={() => {}}>
												NEXT
											</button>
										</div>
									)}
									{game.gameData.phase === "moving" && (
										<div>
											<div className="animationDiv2">
												{game.gameData.players[currentPlayer].boardPos ===
												game.gameData.starPos ? (
													<div className="movingDiv">
														<img
															src={star}
															alt="star"
															style={{
																maxWidth: "50%",
																height: "auto",
															}}
														/>
														<h2>
															You are at a star<br></br>Purchase for 20 coins?
														</h2>
													</div>
												) : (
													<div className="movingDiv">
														<img
															src={character}
															alt="character"
															className="character"
														/>
													</div>
												)}
											</div>
											{nextBoardPos === 0 ? (
												<div>
													<h2>You are at a crossroads</h2>
													<div>
														<button
															className="rightLeftButton"
															onClick={() => {}}
														>
															LEFT
														</button>
														<span> </span>
														<button
															className="rightLeftButton"
															onClick={() => {}}
														>
															RIGHT
														</button>
													</div>
												</div>
											) : (
												<div>
													{game.gameData.players[currentPlayer].boardPos ===
														game.gameData.starPos && (
														<div style={{ zoom: "80%" }}>
															<button className="gameButton" onClick={() => {}}>
																BUY
															</button>
															<div style={{ minHeight: "20px" }}></div>
														</div>
													)}
													<button className="gameButton" onClick={() => {}}>
														MOVE
													</button>
												</div>
											)}
											<h2>{game.gameData.roll} move(s) left</h2>
										</div>
									)}
									{game.gameData.phase === "landed" && (
										<div>
											<div className="animationDiv2">
												{game.gameData.players[currentPlayer].boardPos ===
												game.gameData.starPos ? (
													<div className="movingDiv2">
														<h2>You {landedMessage()}</h2>
														<img
															src={star}
															alt="star"
															style={{
																maxWidth: "50%",
																height: "auto",
															}}
														/>
														<h2>
															You are at a star<br></br>Purchase for 20 coins?
														</h2>
													</div>
												) : (
													<div>
														<h2>You {landedMessage()}</h2>
														{game.gameData.stealCoins === true && (
															<div>
																{game.gameData.rps1 !== "" &&
																game.gameData.rps2 !== "" ? (
																	<div>
																		<h2>
																			{currentPlayer}: {game.gameData.rps1}
																		</h2>
																		<h2>
																			{game.gameData.stealTarget}:{" "}
																			{game.gameData.rps2}
																		</h2>
																		<h2>Result:</h2>
																		<h2>
																			{rpsResult(
																				game.gameData.rps1,
																				game.gameData.rps2
																			)}
																		</h2>
																	</div>
																) : (
																	<div>
																		{game.gameData.stealTarget !== name ? (
																			<div>
																				<h2>Choose wisely:</h2>
																				{game.gameData.rps1 === "" ? (
																					<div style={{ zoom: "80%" }}>
																						<button
																							className="gameButton"
																							onClick={() => {}}
																						>
																							ROCK
																						</button>
																						<div
																							style={{ minHeight: "20px" }}
																						></div>
																						<button
																							className="gameButton"
																							onClick={() => {}}
																						>
																							PAPER
																						</button>
																						<div
																							style={{ minHeight: "20px" }}
																						></div>
																						<button
																							className="gameButton"
																							onClick={() => {}}
																						>
																							SCISSORS
																						</button>
																					</div>
																				) : (
																					<h2>Waiting for opponent..</h2>
																				)}
																			</div>
																		) : (
																			<div style={{ opacity: 1 }}>
																				<h2>*THAT'S YOU*</h2>
																				{game.gameData.rps2 === "" ? (
																					<div style={{ zoom: "80%" }}>
																						<button
																							className="gameButton"
																							onClick={playerTwoRock}
																						>
																							ROCK
																						</button>
																						<div
																							style={{ minHeight: "20px" }}
																						></div>
																						<button
																							className="gameButton"
																							onClick={playerTwoPaper}
																						>
																							PAPER
																						</button>
																						<div
																							style={{ minHeight: "20px" }}
																						></div>
																						<button
																							className="gameButton"
																							onClick={playerTwoScissors}
																						>
																							SCISSORS
																						</button>
																					</div>
																				) : (
																					<h2>Waiting for opponent..</h2>
																				)}
																			</div>
																		)}
																	</div>
																)}
															</div>
														)}
													</div>
												)}
											</div>
											<div>
												{game.gameData.players[currentPlayer].boardPos ===
													game.gameData.starPos && (
													<div style={{ zoom: "80%" }}>
														<button className="gameButton" onClick={() => {}}>
															BUY
														</button>
														<div style={{ minHeight: "20px" }}></div>
													</div>
												)}
												<button className="gameButton" onClick={() => {}}>
													END
												</button>
											</div>
										</div>
									)}
								</div>
							)}
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<div style={{ textAlign: "center" }}>
							<span>
								Round:{" "}
								{Math.floor(game.gameData.turn / game.playerOrder.length) + 1}{" "}
							</span>
							{/* <button onClick={incrementTurn}>Force End Turn</button> */}
						</div>
					</Grid>
				</Grid>
			)}
		</div>
	);
}

export default ActionSideBar;

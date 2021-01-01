import React, { useContext } from "react";

//context
import { PlayerContext } from "../context/player";

//assets
import coin from "../assets/coin.png";
import star from "../assets/star.png";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	playerCard: {
		textAlign: "center",
		minWidth: 200,
		maxWidth: 200,
		margin: 20,
		paddingBottom: 10,
	},
	currentPlayerCard: {
		backgroundColor: "black",
		textAlign: "center",
		minWidth: 200,
		maxWidth: 200,
		margin: 20,
		paddingBottom: 10,
	},
}));

function PlayerBar({ game, currentPlayer }) {
	const classes = useStyles();
	const { name } = useContext(PlayerContext);

	return (
		<div>
			{game.playerOrder.map((player, index) => (
				<div style={{ display: "inline-block" }}>
					{player === currentPlayer ? (
						<Paper
							key={index}
							style={{ display: "inline-block" }}
							elevation={24}
							className={classes.currentPlayerCard}
						>
							{player === name ? (
								<h1 style={{ "text-decoration": "overline" }}>{player}</h1>
							) : (
								<h1>{player}</h1>
							)}
							<p>
								<img
									src={coin}
									alt="coin"
									style={{ "max-width": "20%", height: "auto" }}
								/>
								{"       "}x {game.gameData.players[player].coins}
							</p>
							<p>
								<img
									src={star}
									alt="star"
									style={{ "max-width": "20%", height: "auto" }}
								/>
								{"       "}x {game.gameData.players[player].stars}
							</p>
						</Paper>
					) : (
						<Paper
							key={index}
							style={{ display: "inline-block" }}
							className={classes.playerCard}
						>
							{player === name ? (
								<h2 style={{ "text-decoration": "overline" }}>{player}</h2>
							) : (
								<h2>{player}</h2>
							)}
							<p>
								<img
									src={coin}
									alt="coin"
									style={{ "max-width": "20%", height: "auto" }}
								/>
								{"       "}x {game.gameData.players[player].coins}
							</p>
							<p>
								<img
									src={star}
									alt="star"
									style={{ "max-width": "20%", height: "auto" }}
								/>
								{"       "}x {game.gameData.players[player].stars}
							</p>
						</Paper>
					)}
				</div>
			))}
		</div>
	);
}
export default PlayerBar;

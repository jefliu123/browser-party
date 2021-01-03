import React, { useState, useEffect } from "react";

//assets
import star from "../assets/star.png";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import gameBoard from "../assets/gameBoard.png";
import gameBoardTwo from "../assets/gameBoardTwo.png";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		maxWidth: 1200,
		maxHeight: 900,
		zoom: 0.8,
		padding: 50,
		backgroundImage: `url(${gameBoard})`,
		borderRadius: 5,
		borderStyle: "solid",
		borderColor: "#7f3300",
	},
	paper: {
		boxShadow: "none",
		borderRadius: 25,
		padding: theme.spacing(2),
		textAlign: "center",
		minHeight: 70,
	},
	blueSquare: {
		boxShadow: "none",
		borderRadius: 25,
		padding: theme.spacing(2),
		textAlign: "center",
		backgroundColor: "#6cd0f1",
		minHeight: 70,
	},
	redSquare: {
		boxShadow: "none",
		borderRadius: 25,
		padding: theme.spacing(2),
		textAlign: "center",
		backgroundColor: "#e26868",
		minHeight: 70,
	},
	battleSquare: {
		boxShadow: "none",
		borderRadius: 25,
		padding: theme.spacing(2),
		textAlign: "center",
		backgroundColor: "orange",
		minHeight: 70,
	},
	purpleTeleportSquare: {
		boxShadow: "none",
		borderRadius: 25,
		padding: theme.spacing(2),
		textAlign: "center",
		backgroundColor: "purple",
		minHeight: 70,
	},
	darkGreenTeleportSquare: {
		boxShadow: "none",
		borderRadius: 25,
		padding: theme.spacing(2),
		textAlign: "center",
		backgroundColor: "#2c5a2c",
		minHeight: 70,
	},
	starSquare: {
		boxShadow: "none",
		borderRadius: 25,
		padding: theme.spacing(2),
		textAlign: "center",
		color: "black",
		backgroundColor: "transparent",
		minHeight: 70,
	},
	bridgeSquare: {
		boxShadow: "none",
		borderRadius: 25,
		padding: theme.spacing(2),
		textAlign: "center",
		backgroundColor: "#9c5d30",
		minHeight: 70,
	},
}));

function GameBoard({ game }) {
	const classes = useStyles();
	const [playerPositions, setPlayerPositions] = useState([]);

	useEffect(() => {
		if (game) {
			setPlayerPositions(
				Object.keys(game.gameData.players).map((player) => [
					game.gameData.players[player].boardPos,
					player,
				])
			);
		}
	}, [game]);

	function displayPlayerNamesAtPosition(pos) {
		var returnString = "";
		playerPositions.forEach(([position, player]) => {
			if (position === pos) {
				returnString = returnString.concat(`${player}\r\n`);
			}
		});
		return returnString;
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				{/* ROW 1 */}
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						{displayPlayerNamesAtPosition(9)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(10)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						{displayPlayerNamesAtPosition(11)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(12)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					{game.gameData.starPos === 30 && (
						<Paper className={classes.starSquare}>
							<img
								src={star}
								alt="star"
								style={{ maxWidth: "100%", height: "auto" }}
							/>
						</Paper>
					)}
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(30)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.darkGreenTeleportSquare}>
						{displayPlayerNamesAtPosition(29)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(28)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(27)}
					</Paper>
				</Grid>
				{/* ROW 2 */}
				<Grid item xs={1}>
					{game.gameData.starPos === 5 && (
						<Paper className={classes.starSquare}>
							<img
								src={star}
								alt="star"
								style={{ maxWidth: "100%", height: "auto" }}
							/>
						</Paper>
					)}
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(8)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						{displayPlayerNamesAtPosition(13)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(31)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						{displayPlayerNamesAtPosition(26)}
					</Paper>
				</Grid>
				{/* ROW 3 */}
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(5)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						{displayPlayerNamesAtPosition(6)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(7)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(14)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.bridgeSquare}></Paper> */}
				</Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.bridgeSquare}></Paper> */}
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(22)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(23)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						{displayPlayerNamesAtPosition(24)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(25)}
					</Paper>
				</Grid>
				{/* ROW 4 */}
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						{displayPlayerNamesAtPosition(4)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.bridgeSquare}></Paper> */}
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.bridgeSquare}></Paper> */}
				</Grid>
				<Grid item xs={5}></Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.bridgeSquare}></Paper> */}
				</Grid>
				{/* ROW 5 */}
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(3)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.bridgeSquare}></Paper> */}
				</Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.bridgeSquare}></Paper> */}
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.bridgeSquare}></Paper> */}
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(42)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(43)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						{displayPlayerNamesAtPosition(44)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(45)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(32)}
					</Paper>
				</Grid>
				{/* ROW 6 */}
				<Grid item xs={1}>
					<Paper className={classes.purpleTeleportSquare}>
						{displayPlayerNamesAtPosition(2)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					{game.gameData.starPos === 19 && (
						<Paper className={classes.starSquare}>
							<img
								src={star}
								alt="star"
								style={{ maxWidth: "100%", height: "auto" }}
							/>
						</Paper>
					)}
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.bridgeSquare}></Paper> */}
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.purpleTeleportSquare}>
						{displayPlayerNamesAtPosition(41)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					{game.gameData.starPos === 44 && (
						<Paper className={classes.starSquare}>
							<img
								src={star}
								alt="star"
								style={{ maxWidth: "100%", height: "auto" }}
							/>
						</Paper>
					)}
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						{displayPlayerNamesAtPosition(33)}
					</Paper>
				</Grid>
				{/* ROW 7 */}
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(1)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(21)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						{displayPlayerNamesAtPosition(20)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(19)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						{displayPlayerNamesAtPosition(15)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(40)}
					</Paper>
				</Grid>
				<Grid item xs={3}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(34)}
					</Paper>
				</Grid>
				{/* ROW 8 */}
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}>
						{displayPlayerNamesAtPosition(0)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(18)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.darkGreenTeleportSquare}>
						{displayPlayerNamesAtPosition(17)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(16)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						{displayPlayerNamesAtPosition(39)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(38)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(37)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						{displayPlayerNamesAtPosition(36)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						{displayPlayerNamesAtPosition(35)}
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default GameBoard;

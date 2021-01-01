import React, { useState, useEffect } from "react";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import gameBoard from "../assets/gameBoard.png";
//import gameBoardTwo from "../assets/gameBoardTwo.png";

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
		borderColor: "#525252",
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		minHeight: 70,
	},
	blueSquare: {
		padding: theme.spacing(2),
		textAlign: "center",
		backgroundColor: "#6cd0f1",
		minHeight: 70,
	},
	redSquare: {
		padding: theme.spacing(2),
		textAlign: "center",
		backgroundColor: "#e26868",
		minHeight: 70,
	},
	battleSquare: {
		padding: theme.spacing(2),
		textAlign: "center",
		backgroundColor: "orange",
		minHeight: 70,
	},
	starSquare: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: "black",
		backgroundColor: "yellow",
		minHeight: 70,
	},
	bridgeSquare: {
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
						9 <br></br>
						{displayPlayerNamesAtPosition(9)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						10 <br></br>
						{displayPlayerNamesAtPosition(10)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						11 <br></br>
						{displayPlayerNamesAtPosition(11)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						12 <br></br>
						{displayPlayerNamesAtPosition(12)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.starSquare}>
						Star <br></br>
					</Paper> */}
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						30 <br></br>
						{displayPlayerNamesAtPosition(30)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.paper}>
						29 <br></br>
						{displayPlayerNamesAtPosition(29)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						28 <br></br>
						{displayPlayerNamesAtPosition(28)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						27 <br></br>
						{displayPlayerNamesAtPosition(27)}
					</Paper>
				</Grid>
				{/* ROW 2 */}
				<Grid item xs={1}>
					{/* <Paper className={classes.starSquare}>
						Star <br></br>
					</Paper> */}
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						8 <br></br>
						{displayPlayerNamesAtPosition(8)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						13 <br></br>
						{displayPlayerNamesAtPosition(13)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						31 <br></br>
						{displayPlayerNamesAtPosition(31)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						26 <br></br>
						{displayPlayerNamesAtPosition(26)}
					</Paper>
				</Grid>
				{/* ROW 3 */}
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						5 <br></br>
						{displayPlayerNamesAtPosition(5)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						6 <br></br>
						{displayPlayerNamesAtPosition(6)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						7 <br></br>
						{displayPlayerNamesAtPosition(7)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						14 <br></br>
						{displayPlayerNamesAtPosition(14)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}></Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}></Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						22 <br></br>
						{displayPlayerNamesAtPosition(22)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						23 <br></br>
						{displayPlayerNamesAtPosition(23)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						24 <br></br>
						{displayPlayerNamesAtPosition(24)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						25 <br></br>
						{displayPlayerNamesAtPosition(25)}
					</Paper>
				</Grid>
				{/* ROW 4 */}
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						4 <br></br>
						{displayPlayerNamesAtPosition(4)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}></Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}></Paper>
				</Grid>
				<Grid item xs={5}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}></Paper>
				</Grid>
				{/* ROW 5 */}
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						3 <br></br>
						{displayPlayerNamesAtPosition(3)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}></Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}></Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}></Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						42 <br></br>
						{displayPlayerNamesAtPosition(42)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						43 <br></br>
						{displayPlayerNamesAtPosition(43)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						44 <br></br>
						{displayPlayerNamesAtPosition(44)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						45 <br></br>
						{displayPlayerNamesAtPosition(45)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						32 <br></br>
						{displayPlayerNamesAtPosition(32)}
					</Paper>
				</Grid>
				{/* ROW 6 */}
				<Grid item xs={1}>
					<Paper className={classes.paper}>
						2 <br></br>
						{displayPlayerNamesAtPosition(2)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.starSquare}>
						Star <br></br>
					</Paper> */}
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}></Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.paper}>
						41 <br></br>
						{displayPlayerNamesAtPosition(41)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					{/* <Paper className={classes.starSquare}>
						Star <br></br>
					</Paper> */}
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						33 <br></br>
						{displayPlayerNamesAtPosition(33)}
					</Paper>
				</Grid>
				{/* ROW 7 */}
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						1 <br></br>
						{displayPlayerNamesAtPosition(1)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						21 <br></br>
						{displayPlayerNamesAtPosition(21)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						20 <br></br>
						{displayPlayerNamesAtPosition(20)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						19 <br></br>
						{displayPlayerNamesAtPosition(19)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						15 <br></br>
						{displayPlayerNamesAtPosition(15)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						40 <br></br>
						{displayPlayerNamesAtPosition(40)}
					</Paper>
				</Grid>
				<Grid item xs={3}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						34 <br></br>
						{displayPlayerNamesAtPosition(34)}
					</Paper>
				</Grid>
				{/* ROW 8 */}
				<Grid item xs={1}>
					<Paper className={classes.bridgeSquare}>
						0 <br></br>
						{displayPlayerNamesAtPosition(0)}
					</Paper>
				</Grid>
				<Grid item xs={2}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						18 <br></br>
						{displayPlayerNamesAtPosition(18)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.paper}>
						17 <br></br>
						{displayPlayerNamesAtPosition(17)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						16 <br></br>
						{displayPlayerNamesAtPosition(16)}
					</Paper>
				</Grid>
				<Grid item xs={1}></Grid>
				<Grid item xs={1}>
					<Paper className={classes.redSquare}>
						39 <br></br>
						{displayPlayerNamesAtPosition(39)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						38 <br></br>
						{displayPlayerNamesAtPosition(38)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						37 <br></br>
						{displayPlayerNamesAtPosition(37)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.battleSquare}>
						36 <br></br>
						{displayPlayerNamesAtPosition(36)}
					</Paper>
				</Grid>
				<Grid item xs={1}>
					<Paper className={classes.blueSquare}>
						35 <br></br>
						{displayPlayerNamesAtPosition(35)}
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}

export default GameBoard;

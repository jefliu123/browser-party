import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//pages
import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import RoomPage from "./pages/RoomPage";
import GamePage from "./pages/GamePage";

//context providers
import { PlayerProvider } from "./context/player";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/" exact component={HomePage} />
					<Route path="/lobby" render={() => <LobbyPage />} />
					<Route
						path="/room/:id"
						render={({ match }) => <RoomPage gameId={match.params.id} />}
					/>
					<Route
						path="/game/:id"
						render={({ match }) => <GamePage gameId={match.params.id} />}
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;

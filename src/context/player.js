import { useState, useEffect, createContext } from "react";

const SESSION_NAME = "SESSION_NAME";

const PlayerContext = createContext();

function PlayerProvider({ children }) {
	const [name, setName] = useState(sessionStorage.getItem(SESSION_NAME) || "");
	const [isRegistered, setIsRegistered] = useState(false);

	useEffect(() => {
		if (name) {
			sessionStorage.setItem(SESSION_NAME, name);
			setIsRegistered(true);
		} else {
			sessionStorage.removeItem(SESSION_NAME);
			setIsRegistered(false);
		}
	}, [name]);

	function registerPlayer(playername) {
		setName(playername);
	}

	function unregisterPlayer() {
		setName("");
	}

	return (
		<PlayerContext.Provider
			value={{ name, isRegistered, registerPlayer, unregisterPlayer }}
		>
			{children}
		</PlayerContext.Provider>
	);
}
export { PlayerProvider, PlayerContext };

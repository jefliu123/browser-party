import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function HomePage() {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Redirect to="/lobby" push />;
	}

	return (
		<div>
			<h1>Welcome to BrowserParty</h1>
			<button onClick={() => setRedirect(true)}>Get Started</button>
		</div>
	);
}

export default HomePage;

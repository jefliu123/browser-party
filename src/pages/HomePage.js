import "./styles.css";

import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import generate from "project-name-generator";

function HomePage() {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Redirect to={redirect} push />;
	}

	return (
		<div className="homePage">
			<div style={{ minHeight: "30vh" }}></div>
			<h1 className="title">Browser Party</h1>
			<button className="getStartedButton" onClick={() => setRedirect("/room/" + generate().dashed)}>
				CREATE ROOM
			</button>
			{/* <div style={{ "min-height": "40px" }}></div>
			<button
				style={{ zoom: "95%" }}
				className="getStartedButton"
				onClick={() => {
					window.open("https://github.com/jefliu123/browser-party");
				}}
			>
				GITHUB
			</button> */}
		</div>
	);
}

export default HomePage;

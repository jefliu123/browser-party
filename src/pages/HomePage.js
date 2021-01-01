import "./styles.css";

import React, { useState } from "react";
import { Redirect } from "react-router-dom";

function HomePage() {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Redirect to="/lobby" push />;
	}

	return (
		<div className="homePage">
			<div style={{ "min-height": "30vh" }}></div>
			<h1 className="title">Browser Party</h1>
			<button className="getStartedButton" onClick={() => setRedirect(true)}>
				START
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
		<Button id = "button" onClick={() => setRedirect(true)}>Get Started</Button>
		<Carousel interval={3500}>
		<Carousel.Item>
		  <img  
			className="d-block w-100"
			src={tetris}
			alt="First slide"
		  />
		</Carousel.Item>
		<Carousel.Item>
		  <img 
			className="d-block w-100"
			src={skribblio}
			alt="Second slide"
		  />
		</Carousel.Item>
		<Carousel.Item>
		  <img 
			className="d-block w-100"
			src={typeracer}
			alt="Third slide"
		  />
		</Carousel.Item>
	  </Carousel>
	</Container>
	);
}

export default HomePage;

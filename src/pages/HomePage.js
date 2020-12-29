import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import skribblio from '../images/skribblio.png';
import tetris from '../images/tetris.jpg';
import typeracer from '../images/typeracer.png';

function HomePage() {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Redirect to="/lobby" push />;
	}

	return (
	<Container fluid id = "background">
		<div>
			<h1 class = "welcome">Welcome to BrowserParty</h1>	
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

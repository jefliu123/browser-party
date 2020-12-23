import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
function HomePage() {
	const [redirect, setRedirect] = useState(false);

	if (redirect) {
		return <Redirect to="/lobby" push />;
	}

	return (
		
			<body>
			<h1>Welcome to BrowserParty</h1>


			<div>

			<Button 
			variant = "danger"
			color= "blue"
			size = "lg"
			active
			onClick={() => setRedirect(true)}

			>
			Get Started
			</Button>
			</div>
			</body>

	);
}

export default HomePage;

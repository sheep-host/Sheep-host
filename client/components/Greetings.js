import React from 'react';

class Greetings extends React.Component {
	render() {
	return (
		<div className="h jumbotron">
			<h1 className="text-center">Welcome to Sheep.host</h1>
			<h2 className="text-center">A developers backend-as-a-service for MongoDB</h2>
			<div>
				<h3 className="welcome-info-tag">Multiple Mongo databases with any number of collections</h3>
			</div>
		</div>
		)
	}
}

export default Greetings;
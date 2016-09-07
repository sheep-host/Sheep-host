import React from 'react';

class Greetings extends React.Component {
	render() {
	return (
		<div className="h jumbotron">
				<h1 className="r text-center welcome">Welcome to Sheep.host</h1>
			<h2 className="text-center welcome">A developer's backend-as-a-service for MongoDB</h2>
			<hr></hr>
			<h3 className="text-center welcome">Sheep.host gives front-end developers <b>out-of-the-box access</b> to multiple MongoDB databases with just <b>a few</b> keystrokes and <b>one</b> click of a button.</h3>
			<h3 className="text-center welcome">Rest easy knowing your app's data is <b>secure</b> with <b>two-tier</b> API key security, yet <b>readily accessible</b> on our live-updating dashboard.</h3>
			<h3 className="text-center welcome">Read from and write to all of your MongoDB collections with our <b>simple, straightforward</b> SDK.</h3>
		</div>
		)
	}
}

export default Greetings;
import React from 'react';

// export default () => {
// 	return (
// 		<div className="jumbotron">
// 			<h1>Ayyyy</h1>
// 		</div>
// 		)
// }

//make all route components class components(for now...)

class Greetings extends React.Component {
	render() {
	return (
		<div className="jumbotron">
			<h1>Welcome to Sheep.host</h1>
			<h2>A developer's backend-as-a-service for MongoDB</h2>
		</div>
		)
	}
}

export default Greetings;
import React from 'react';
import NavigationBar from './NavigationBar'

class App extends React.Component {
	render() {
		return (
			<div className="a container-fluid">
				{this.props.children}
				
				<footer><div className="footer-contact">Sheep.host is in BETA, contact us at <a href="mailto:administrator@sheep.host">administrator@sheep.host</a> with feedback!</div></footer>
			</div>
		)
	} 
}

export default App;
import React from 'react';
import NavigationBar from './NavigationBar'




class App extends React.Component {
	render() {
		return (
			<div className="a container-fluid">
				{this.props.children}
				<div style={{textAlign:'center'}}>Sheep.host is in BETA, contact us at <a href="mailto:administrator@sheep.host">administrator@sheep.host</a> with feedback!</div>

			</div>
		)
	} 
}

export default App;
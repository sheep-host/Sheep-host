import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import auth from '../Auth';
import NavigationBar from './NavigationBar';
import databaseLogo from '../../Public/database.png'
import BottomGreetings from './BottomGreetings.js'


//some punctuation removed for code readbility during testing styles
class Greetings extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		if(auth.loggedIn()){
			let sheepToken = jwtDecode(localStorage.sheepToken);
			browserHistory.push('dashboard/' + sheepToken.userName);
		}
	}

	render() {
		return (
			<div className="font">
			  <NavigationBar/>
			  <div className="h jumbotron">
			    <h1 className="welcome-to-sheep font">Welcome to Sheep.host</h1>
			    <h2 className="welcome-to-sheep-tagline font">A developers backend-as-a-service for MongoDB</h2>
			    <hr>
			    </hr>
			    <Link to="/signup"><button className="landing-button font">Signup Now</button></Link>
			    <div className="landing-page-text-snippet text-center font">
			      <h4 className="landing-page-text-snippet-header font">Build fast</h4>
			      <div className="landing-page-text-snippet-buildFast font"> 
							Sheep.host gives you to multiple MongoDB databases with just a few keystrokes
			      </div>
			    <div className="landing-page-text-snippet-buildFast-bullets font"> 
						Two-tier API Security&nbsp;&nbsp;&nbsp;&nbsp;Dashboard Data Management&nbsp;&nbsp;&nbsp;&nbsp;Straightforward SDK
			      </div>
			    </div>
			  </div>
			  <BottomGreetings />
			</div>
		)
	}
}

export default Greetings;

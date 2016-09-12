import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import auth from '../Auth';
import jwtDecode from 'jwt-decode';
import NavigationBar from './NavigationBar';
import databaseLogo from '../../Public/database.png'
import BottomGreetingsButton from './BottomGreetingsButton.js'


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
			<div>
			  <NavigationBar/>
			  <div className="top jumbotron">
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
						Two-tier API security  &nbsp; &nbsp; &nbsp; &nbsp;    Easy dashboard data management   &nbsp; &nbsp; &nbsp; &nbsp;   straightforward SDK 
			      </div>
			    </div>
			  </div>
			  <BottomGreetingsButton />
			</div>
		)
	}
}


export default Greetings;


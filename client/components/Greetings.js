import React from 'react';
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
					<div className="h jumbotron">
							<h1 className="r text-center welcome">Welcome to Sheep.host</h1>
								<h2 className="text-center welcome">A developers backend-as-a-service for MongoDB</h2>
								<hr></hr>

								<button className="landing-button text-center">Signup Now</button>
					
				<div className="landing-page-left-snippet lead text-center">

					<h1 className="landing-page-left-snippet-header text-center">Build fast</h1>
						Do some other stuff 
						Then do some other really 
						cool stuff And even more 
						really cool stuff 			
						if youre up <br></br>for it 
						Maybe if you be feeling funky, 
						try more
						and more really really cool stuff dude

					</div>						
					<div className="text-right">
						Im text 
					</div>
				</div>
				<BottomGreetingsButton />
			</div>
		)
	}
}


export default Greetings;


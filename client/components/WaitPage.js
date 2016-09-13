import React from 'react';
import NavigationBar from './NavigationBar';

const WaitPage = () =>{
  return(
    <div className="welcome-to-sheep">
    	<NavigationBar/>
    	<div className="wait h">
					<h1 id="wait-header">You're almost there!</h1>
      		<h3>We have received your request to sign up with Sheep.host.<br />An email has been sent to your account.<br />Click the activation link in the message to verify your account and create your first database.</h3>
				</div>
    </div>
  )
}


export default WaitPage



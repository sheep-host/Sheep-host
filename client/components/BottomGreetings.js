import React from 'react'
import GitHubImage from '../../Public/GitHub-Mark.png'

const BottomGreetings = () => {
	return(
		<div className="text-center">
			<span className="how-it-works-title">How it works</span>
			<div className="how-works bottom">
  			<div className="step-by-step col-xs-6 col-md-4">
      		<u>Click a Button</u>
      	<br></br>
      		<small className="step-by-step-small">Spool up a database in less than 1 minute</small>
  			</div>
  			<div className="col-xs-6 col-md-4">
      		<u>Copy and Paste</u> 
      	<br></br>
      		<small className="step-by-step-small">Connect the database to your app with a script tag</small>
  			</div>
  			<div className="col-xs-6 col-md-4">
      		<u>Build</u>
      	<br></br>
      		<small className="step-by-step-small">Read and write to the database using our SDK</small>
  			</div>
  		</div>
      <h6>GitHub</h6>
      <a href="https://github.com/sheep-host/Sheep-host" target="_blank"><img src={GitHubImage} /></a>
		</div>

		)
}

export default BottomGreetings
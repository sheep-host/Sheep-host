import React from 'react'
import SheepFlowDiagram from '../../Public/HowSheepWorks.png'
import BuildFlow from '../../Public/BuildFlow.png'
import PrototypeImage from '../../Public/RapidPrototyping.png'

const BottomGreetings = () => {
	return(
		<div>
			<span className="how-it-works-title">How it works</span>
				<div className="how-works bottom font">
    			<div className="step-by-step col-xs-6 col-md-4">
        		<u>Create a database</u>
        	<br></br>
        		<small className="step-by-step-small">In the "create" tab on your dashboard </small>
    			</div>
    			<div className="col-xs-6 col-md-4">
        		<u>Insert Script Tag</u> 
        	<br></br>
        		<small className="step-by-step-small"> In the "create" tab on your dashboard </small>
    			</div>
    			<div className="col-xs-6 col-md-4">
        		<u>Build</u>
        	<br></br>
        		<small className="step-by-step-small"> In the "create" tab on your dashboard </small>
    			</div>
    		</div>
		</div>

		)
}


export default BottomGreetings
import React from 'react'
import SheepFlowDiagram from '../../Public/HowSheepWorks.png'
import BuildFlow from '../../Public/BuildFlow.png'
import PrototypeImage from '../../Public/RapidPrototyping.png'

const BottomGreetings = () => {
	return(
		<div>
			<div>
			</div>
				<img className="how-sheep-works pull-left" src={SheepFlowDiagram} />
			<div>
				<img className="prototype-image pull-right" src={PrototypeImage} />
			</div>
		</div>
		)
}


export default BottomGreetings
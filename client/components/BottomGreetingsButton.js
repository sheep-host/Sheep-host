import React from 'react'
import BottomGreetings from './BottomGreetings'
import Scroll from 'react-scroll'


var scroll = Scroll.animateScroll;
//here to add button for scroll down in future
const BottomGreetingsButton = () => {
	return (
		<div className="text-center">
		<hr></hr>
			<BottomGreetings />
		</div>
	)
}


export default BottomGreetingsButton
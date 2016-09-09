import React from 'react'
import BottomGreetings from './BottomGreetings'
import Scroll from 'react-scroll'

var scroll = Scroll.animateScroll;

const BottomGreetingsButton = React.createClass({
	scrollToBottom() {
    scroll.scrollToBottom();
  },
	render() {
		return (
			<div className="text-center">
			<button className="feature-button text-center" onClick={this.scrollToBottom}>Features</button>
			<hr></hr>
			<BottomGreetings />
			</div>
		)
	}
})


export default BottomGreetingsButton
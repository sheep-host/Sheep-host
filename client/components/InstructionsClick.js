import React, { Component } from 'react';
import Instructions from './instructions';

export default class InstructionsClick extends Component {

	render() {
		return (
			<div>

        <p onClick={this.props.onClick}>
          API Instructions<span style={{fontSize:12}}> (Click to hide/show)</span></p>
        {
          this.props.instructionsVisible
            ? <Instructions />
            : false
        }
      </div>
    )
  }
}
import React, { Component } from 'react';
import Secret from './Secret.js';

export default class SecretClick extends Component {

	render() {
    console.log('secretclick props', this.props);
		return (
			<div className='glossaryBlock'>

        <b className='glossaryTitle' onClick={this.props.onClick}>
          API Secret Key<span className='glossaryTitle' style={{fontSize:12}}> (Click to hide/show)</span></b>
        {
          this.props.secretKeyVisible
            ? <Secret />
            : false
        }
      </div>
    )
  }
}
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';


export default class SecretClick extends Component {

	render() {
    let token = jwtDecode(localStorage.sheepToken);
    console.log(token);
    let secretKey = token.secretKey; 
    console.log('secret', secretKey);
    console.log('secretclick props', this.props);
		return (
			<div className='glossaryBlock'>

        <p><b className='glossaryTitle' onClick={this.props.onClick}>
          API Secret Key</b>
        <span>{
          this.props.secretKeyVisible
            ? <span><b>:</b> {secretKey}</span>
            : false
        }</span></p>
        <p className='glossaryTitle' style={{fontSize:12}}> (Click to hide/show)</p>
      </div>
    )
  }
}
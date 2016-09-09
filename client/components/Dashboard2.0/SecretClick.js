import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';


const SecretClick = (props) => {
  let token = jwtDecode(localStorage.sheepToken);
  console.log(token);
  let secretKey = token.secretKey; 
  console.log('secret', secretKey);
  console.log('secretclick props', props);
	return (
		<div className='glossaryBlock'>
     <p><b className='glossaryTitle' onClick={props.onClick}>
        API Secret Key</b>
      <span>{
        props.secretKeyVisible
          ? <span><b>:</b> {secretKey}</span>
          : false
      }</span></p>
      <p className='glossaryTitle' style={{fontSize:12}}> (Click to hide/show)</p>
    </div>
  )
}

export default SecretClick;
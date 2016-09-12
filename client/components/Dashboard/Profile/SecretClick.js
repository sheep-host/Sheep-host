import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';


const SecretClick = (props) => {
  let token = jwtDecode(localStorage.sheepToken);
  let secretKey = token.secretKey; 
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
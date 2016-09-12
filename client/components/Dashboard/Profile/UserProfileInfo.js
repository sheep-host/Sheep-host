import React from 'react';
import SecretClick from './SecretClick'

const UserProfile = (props) => {
	let userDBProfileInfo = []
	let userInfo = []
	let infoProps = props.profileInfo

	for(var i in infoProps) {
		if(typeof infoProps[i] === 'string') userInfo.push(<p><strong>{i}: </strong> <span>{infoProps[i]}</span></p>)
		if(infoProps[i].constructor === Array) {
			userDBProfileInfo.push(<div key={i} className="panel-body">Database: {i}</div>, <li key={i+1}>Collections: {infoProps[i]}</li>)
		}	
	}
	return (
		<div>
			<div>
				<h2>Your Profile</h2>
			</div>
			<div className="user-profile well well-lg font">
				{userInfo}
				<SecretClick onClick={props.onClick} secretKeyVisible={props.secretKeyVisible}/>
			  {userDBProfileInfo}
			  <br></br>
			</div>
		</div>
	)
}

export default UserProfile;
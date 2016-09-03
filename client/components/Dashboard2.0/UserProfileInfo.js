import React from 'react';

const UserProfile = (props) => {
	let userDBProfileInfo = []
	let userInfo = []
	let infoProps = props.profileInfo

	for(var i in infoProps) {
		console.log('for in',infoProps[i])
		console.log('pr', i)
		if(typeof infoProps[i] === 'string') userInfo.push(<em>{i}</em>, <b>{infoProps[i]}</b>)
		if(infoProps[i].constructor === Array) {
		userDBProfileInfo.push(<div key={i} className="panel-body">{i}</div>, <li key={i+1}>{infoProps[i]}</li>)
		console.log('display', userDBProfileInfo)
	}	
}
		return (
			<div className="well well-lg col-md-8">
				{userInfo}
			  {userDBProfileInfo}
			</div>

	)
}



export default UserProfile;

//dev ID
//database names
	//collection names
	//Schema for each collection
//Permissions
import React from 'react';


const WelcomeBanner = (props) => {
	return (
		<h3 className="alert alert-info text-center banner" role="alert"> <b>Welcome to your Dashboard, {props.name}</b></h3>
	)
}

export default WelcomeBanner
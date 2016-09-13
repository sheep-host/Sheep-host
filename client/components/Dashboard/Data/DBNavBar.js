import React from 'react';


const DBNavBar = (props) => {

	return (
		<div className="display ">
			<ul className="nav nav-tabs col-md-8 " data-toggle="button">	
				<li><h3 className="database-display-name">Databases:</h3></li>
				{props.names.map((el, i)=> {
					return <button className="tabs btn btn-primary info" aria-pressed="true" role="button" onClick={props.click} id={i} key={i} role="presentation">{el}</button>;
				})}
			</ul>
		</div>
	)
}


export default DBNavBar;
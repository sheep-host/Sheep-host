import React from 'react';


const DatabaseForm = (props) => {
	return (
		<div>
			<input 
			onChange={props.onChange}
			placeholder="Database Name"
			type="text"
			name="dbName">

			</input>
			<button
				className="btn btn-primary">
				Create MongoDB
			</button>
		</div>
	)
}

export default DatabaseForm;
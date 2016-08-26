import React from 'react';


const DatabaseForm = (props) => {
	return (
		<div className="input-group input-group-sm">
			<input 
			className="form-control"
			onChange={props.onChange}
			placeholder="Database Name"
			type="text"
			name="dbName">

			</input>
		</div>
	)
}

export default DatabaseForm;
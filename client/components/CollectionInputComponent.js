import React from 'react';


const CollectionForm = (props) => {
	return (
	<div className="input-group input-group-sm">
		<input 
			className="form-control"
			onChange={props.onChange}
			placeholder="Collection Name"
			type="text"
			name="collectionName">

			</input>
		</div>
		
	)
}

export default CollectionForm;
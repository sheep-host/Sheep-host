import React from 'react';


const CollectionForm = (props) => {
	return (
	
		<input 
			onChange={props.onChange}
			placeholder="Collection Name"
			type="text"
			name="collectionName">

			</input>
		
	)
}

export default CollectionForm;
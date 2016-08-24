import React from 'react';


const CollectionForm = (props) => {
	return (
	
		<input 
			onChange={props.onChange}
			placeholder="Database Name"
			type="text"
			name="collectionName">

			</input>
		
	)
}

export default CollectionForm;
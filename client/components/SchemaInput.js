import React from 'react';


const SchemaForm = (props) => {
	return (
			<div>
				<textarea 
					onChange={props.onChange}
					placeholder="Schema"
					type="text"
					name="schema">
				</textarea>
			</div>
		
	)
}

export default SchemaForm;
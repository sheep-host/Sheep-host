import React from 'react';


const SchemaForm = (props) => {
	return (
			<div>
			<div>
				<textarea 
					onChange={props.onChange}
					placeholder="Schema"
					type="text"
					name="schema">
				</textarea>

			
			<button
				className="btn btn-primary">
				Create MongoDB
			</button>
			</div>
		</div>
		
	)
}

export default SchemaForm;
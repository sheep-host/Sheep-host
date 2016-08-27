import React from 'react';


const ClientInput = React.createClass({
	getInitialState() {
	    return {
	        hide: false  
	    };
	},
	
	propTypes: {
	    onSubmit: React.PropTypes.func,
	    onDbNameChange: React.PropTypes.func,
	    onCollectionNameChange: React.PropTypes.func,
	    onSchemaChange: React.PropTypes.func,
  	
  	},
	onClick() {
		this.setState({hide: !this.state.hide})
	},

	render() {
		if(this.props.shouldShow === undefined) {
		return (
		<form onSubmit={this.props.onSubmit} className={'hide-' + this.state.hide}>
				<div className="Client-Input">
					
					<div className="input-group input-group-sm">
						<input 
							className="form-control"
							onChange={this.props.onDbNameChange}
							placeholder="Database Name"
							type="text"
							name="dbName">

						</input>
					</div>
				<div className="input-group input-group-sm">
					<input 
						className="form-control"
						onChange={this.props.onCollectionNameChange}
						placeholder="collection Name"
						type="text"
						name="collectionName">

					</input>
					</div>
				<div>
					<textarea 
						onChange={this.props.onSchemaChange}
						placeholder="Schema"
						type="text"
						name="schema">
					</textarea>

				
				<button
					className="btn btn-primary"
					onClick={this.onClick}>
					Create MongoDB
				</button>
				
				</div>
			</div>
			</form>
		)
	}

	else {
		return (
				<div>
				
				</div>
			)
	}
}
})


export default ClientInput;

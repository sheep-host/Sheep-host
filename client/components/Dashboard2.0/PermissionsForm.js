import React from 'react';

const Permissions = React.createClass({
	render(){
		let that = this;
		console.log('permission props', that.props.permissions);
		let radioArray = [];
		for(let permission in that.props.permissions){
			let permissionObj = {};
			permissionObj[permission] = that.props.permissions[permission];
			radioArray.push(permissionObj);
		}
		console.log('radioArray', radioArray);
		return(
			<div>
			<h2>Set Client Permissions</h2>
			<div className="jumbotron">
				{radioArray.map(function(permission){
					return(
						<div>{Object.keys(permission)[0]}
							<br></br>
							<input
								type="radio"
								value={Object.keys(permission)[0]}
								onChange={that.props.onClick}
								checked={true === permission[Object.keys(permission)[0]]}
							/> True     
							<input
								style={{marginBottom:'20px', marginLeft:'10px'}}
								type="radio"
								value={Object.keys(permission)[0]} 
								onChange={that.props.onClick}
								checked={false === permission[Object.keys(permission)[0]]}
							/> False 
							<br></br>
						</div>
					)
				})
			}
			<br></br>
			<button
				className="btn btn-primary btn-lg"
				onClick={this.props.savePermissions}
			>Save</button>
			</div>
			</div>
		)
	}
})

export default Permissions
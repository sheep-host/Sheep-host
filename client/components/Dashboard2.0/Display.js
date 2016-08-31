import React from 'react';


const Display = React.createClass({
	render() {
		return (
			<div>
				<ul className="list-group">
					{this.props.display.map((el, i) => {
						return (
							<li className="list-item" key={i}>{JSON.stringify(el)}</li>
						);
					})}
				</ul>
			</div>
		);
	}
})

export default Display;
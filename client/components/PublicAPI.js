import React from 'react';

const PublicAPI = React.createClass({
	render() {
		return (
			<div className="jumbotron">
                           <h4>Copy the following script tag into your html file to use SDK methods:</h4>
				<ul className="list-group">
                                  <pre>
                                    <code>
                                      &lt;script src="https://npmcdn.com/axios/dist/axios.min.js"&gt;&lt;/script&gt;{'\n'}
                                      &lt;script src="https://sheep.host/public_api"&gt;&lt;/script&gt;{'\n'}
                                      &lt;script&gt;{'\n'}
                                          {'  '}// Initialize Sheep.host{'\n'}
                                          {'  '}var config = &#123;{'\n'}
                                              {'    '}id: {'\''}{this.props.devId}{'\''},{'\n'}
                                              {'    '}authKey: {'\''}{'Basic: '}{this.props.authKey}{'\''},{'\n'}
                                              {'    '}url: "https://sheep.host/api/"{'\n'}
                                          {'  '}&#125;{'\n'}
                                          {'  '}sheep.dontSleep(config);{'\n'}
                                      &lt;/script&gt;{'\n'}
                                    </code>
                                  </pre>
				</ul>
			</div>
		);
	}
})

export default PublicAPI;

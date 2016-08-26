import React from 'react';

const DevInfo = (props) => {
	return (
		<div>
  		<p>Your dev ID: {props.id}</p>
  		<p>Your database: {props.databaseName}</p>
  		<p>Your collection: {props.collectionName}</p>
  		<p>Your Schema: {props.schema} </p>
      <p>Cut and paste the following code towards the bottom of the body tag of your web app:</p>
      <pre><code>
        &lt;script src="http://localhost:3000/public_api"&gt;&lt;/script&gt;{'\n'}
        &lt;script&gt;{'\n'}
        {'  '}  // Initialize Sheep.host{'\n'}
        {'  '}  var config = &#123;{'\n'}
        {'    '}    dbId: {'\''}{props.id}{'\''},{'\n'}
        {'    '}    url: "http://localhost:3000/api/"{'\n'}
        {'  '}  &#125;{'\n'}
        {'  '}  sheep.dontSleep(config);{'\n'}
        &lt;/script&gt;
      </code></pre>
  		<p>Your data:</p>
  		<div>{props.database}</div><br/>
		</div>

		)
}
export default DevInfo

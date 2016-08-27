import React from 'react';

const DevInfo = (props) => {
	return (
		<div className="panel panel-default">

      <p>Cut and paste the following code towards the bottom of the body tag of your web app:</p>
      <pre><code>
        &lt;script src="https://sheep.host/public_api"&gt;&lt;/script&gt;{'\n'}
        &lt;script&gt;{'\n'}
        {'  '}  // Initialize Sheep.host{'\n'}
        {'  '}  var config = &#123;{'\n'}
        {'    '}    dbId: {'\''}{props.id}{'\''},{'\n'}
        {'    '}    url: "https://sheep.host/api/"{'\n'}
        {'  '}  &#125;{'\n'}
        {'  '}  sheep.dontSleep(config);{'\n'}
        &lt;/script&gt;
      </code></pre>
  		<p>Your data:</p>
  		<div>{props.database}</div><br/>

  		<div className="panel heading"><b>Your dev ID</b>: {props.id}</div>
  		<ul className="list-group">
    		<li className="list-group-item">Your database: {props.databaseName}</li>
    		<li className="list-group-item">Your collection: {props.collectionName}</li>
    		<li className="list-group-item">Your Schema: {props.schema} </li>
  		</ul>
		</div>
	)
}
export default DevInfo

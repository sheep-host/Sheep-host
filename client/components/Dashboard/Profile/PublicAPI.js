import React from 'react';
import Clipboard from'react-clipboard.js';

const PublicAPI = (props) => {
	return (
    <div>
      <div>
        <h2>SDK Script Tags</h2>
      </div>
			<div className="well well-lg">
        <h4 className="user-profile">Copy the following script tag into your html file to use SDK methods:</h4>
				<ul className="list-group">
          <pre className="code">
            <code className="SDK">
              &lt;script src="https://npmcdn.com/axios/dist/axios.min.js"&gt;&lt;/script&gt;{'\n'}
              &lt;script src="https://sheep.host/public_api"&gt;&lt;/script&gt;{'\n'}
              &lt;script&gt;{'\n'}
                  {'  '}// Initialize Sheep.host{'\n'}
                  {'  '}var config = &#123;{'\n'}
                      {'    '}id: {'\''}{props.devId}{'\''},{'\n'}
                      {'    '}authKey: {'\''}{'Basic: '}{props.authKey}{'\''},{'\n'}
                      {'    '}url: "https://sheep.host/api/"{'\n'}
                  {'  '}&#125;{'\n'}
                  {'  '}sheep.dontSleep(config);{'\n'}
              &lt;/script&gt;{'\n'}
            </code>
          </pre>
				</ul>
        <Clipboard component="button" className="btn btn-primary btn-lg" button-href="#" data-clipboard-target="#code">
        Copy script tag
      </Clipboard>
			</div>
    </div>
	);
}


export default PublicAPI;

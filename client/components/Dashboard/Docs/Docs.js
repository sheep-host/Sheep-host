import React from 'react';

const Docs = () => {
	return(
		<div className="display jumbotron">
			<h2 className="api-sandbox-words font">Docs</h2>

			<h2>Navigating the Site</h2>
			<br></br>
			<div className="docs-text">
				<h3>CREATE</h3>
				<p>The <b>CREATE</b> tab is where you instantiate all of your databases and collections. You are currently limited to three (3) databases. Please email us at administrator@sheep.host if you need to rename a database or delete it or any collections within.</p>
				<h3>Creating a Database</h3>
				<p>Enter the desired name of your database and the name of its first collection.</p>
				<p>Enter your desired schema in the form of a JSON object. Incorrect schema input will be rejected and neither the database or collection will be created.</p>
				<p><b>Correct example: </b>{String.fromCharCode(123)}"firstName": "String", "lastName": "String", "age": "Number"{String.fromCharCode(125)}</p>
				<p><b>Inorrect example: </b>firstName: String, lastName: String, age: Number</p>
				<h3>Creating a Collection</h3>
				<p>To create a new collection within an existing database, simply enter the name of that database in lieu of a new one.</p>
				<br></br>

				<h3>CREATE</h3>
				<p>The <b>CREATE</b> tab is where you instantiate all of your databases and collections. You are currently limited to three (3) databases. Please email us at administrator@sheep.host if you need to rename a database or delete it or any collections within.</p>
				<h3>Creating a Database</h3>
				<p>Enter the desired name of your database and the name of its first collection.</p>
				<p>Enter your desired schema in the form of a JSON object. Incorrect schema input will be rejected and neither the database or collection will be created.</p>
				<p><b>Correct example: </b>{String.fromCharCode(123)}"firstName": "String", "lastName": "String", "age": "Number"{String.fromCharCode(125)}</p>
				<p><b>Inorrect example: </b>firstName: String, lastName: String, age: Number</p>
				<h3>Creating a Collection</h3>
				<p>To create a new collection within an existing database, simply enter the name of that database in lieu of a new one.</p>
				<br></br>

				<h3>DATA</h3>
				<p>The Dashboard tab contains all of your data we are hosting. You can navigate between all of your databases and each collection within those databases.</p>
				<p>The particular collection displayed on the dashboard at any given moment will display new documents, updates to existing documents and the removel of documents as those changes come in from your apps.</p>
				<h5>API Sandbox</h5>
				<p>Below the data is a sandbox for you to prototype your data performing simple CRUD instructions to the collection you are viewing.</p>
				<p>To <b>update</b> or <b>delete</b> documents, enter a JSON object with the {String.fromCharCode(123)}key:value{String.fromCharCode(125)} pair of the document you wish to change into the designated input field.</p>
				<p>To <b>update</b> or <b>add</b> documents, enter the desired information in the form of a JSON object the same way you enter your schema on the <b>CREATE</b> page.</p>
				<p><b>Example: </b>{String.fromCharCode(123)}"firstName": "John", "lastName": "Doe", "age": "30"{String.fromCharCode(125)}</p>
				<br></br>

				<h3>PROFILE</h3>
				<p>The <b>PROFILE</b> tab contains all of your user information, a list of your databases and collections, as well as your API key information.</p>
				<p>Below all of this information is the auto-generated series of <b>script tags</b> to access our SDK...</p>
				<br></br>

				<h4><strong>Using the SDK</strong></h4>
				<p>To use the globally exposed <b>sheep</b> object, simply copy the <b>script tags</b> and paste them into the app's HTML file above your Javascript.</p>
				<p>Call the SDK methods via the  <b>sheep</b> object, and enter the desired database name and collection as the first two arguments.</p>
				<br></br>

				<h4>GET</h4>
				<b>sheep.get( [database_name], [collection_name], callback )</b>
				<p>Returns all of the documents in the collection to the <b>callback</b> in the third argument as an array of objects.</p>
				<p><b>Example: </b></p>
				<pre className='code'>
	        <code>
	        	// Gets all records from the Users collection in the MyApp database and logs them individually{'\n'}{'\n'}
	        	sheep.get(MyApp, Users, (results => &#123;{'\n'}
	        	{'  '}results.forEach(record) &#123;{'\n'}
	        	{'    '}console.log(record);{'\n'}
	        	{'  '}&#125;);{'\n'}
	        	&#125;);{'\n'}
	        </code>
	      </pre>
				<br></br>

				<h4>POST</h4>
				<b>sheep.post( [database_name], [collection_name], {String.fromCharCode(123)}data{String.fromCharCode(125)})</b>
				<p>Adds a record to a given collection. The third argument, <b>data</b> refers to an object with the key:value pairs, that follows the schema you created for that collection. A successful post will receive a response with status code 200.</p>
				<p><b>Example: </b></p>
				<pre className='code'>
	        <code>
	        	// Adds a record with "John Doe" in the "name field" and "Los Angeles" in the "location" field from the Users collection in the MyApp database{'\n'}{'\n'}
	        	sheep.post(MyApp, Users, &#123; name: "John Doe", location: "New York" &#125;){'\n'}
	        </code>
	      </pre>
				<br></br>

				<h4>PUT</h4>
				<b>sheep.put(  [database_name], [collection_name], {String.fromCharCode(123)}query{String.fromCharCode(125)}, {String.fromCharCode(123)}data{String.fromCharCode(125)} )</b>
				<p>Updates a record in a given collection. The third argument, <b>query</b> refers to an object with the key:value pair of the record you want to change, that follows the schema you created for that collection. The fourth argument, <b>data</b> refers to an object with the key:value pair(s) to change. A successful post will receive a response with status code 200.</p>
				<p><b>Example: </b></p>
				<pre className='code'>
	        <code>
	        	// Changes the "location" field of the record with "name" of "John Doe" to "New York" in the Users collection in the MyApp database{'\n'}{'\n'}
	        	sheep.put(MyApp, Users, &#123; name: "John Doe"&#125;, &#123; location: "New York" &#125;){'\n'}
	        </code>
	      </pre>
				<br></br>

				<h4>DELETE</h4>
				<b>sheep.delete( [database_name], [collection_name], {String.fromCharCode(123)}query{String.fromCharCode(125)} )</b>
				<p>Deletes a record in a given collection. The third argument, <b>query</b> refers to an object with the key:value pair of the record you want to delete, that follows the schema you created for that collection. A successful post will receive a response with status code 200.</p>
				<p><b>Example: </b></p>
				<pre className='code'>
	        <code>
	        	// Deletes the record with "John Doe" in the "name" field from the Users collection in the MyApp database{'\n'}{'\n'}
	        	sheep.delete(MyApp, Users, &#123; name: "John Doe" &#125;){'\n'}
	        </code>
	      </pre>
				<br></br>
				<h3>Setting Client Permissions</h3>
				<p>You can modify your API Client Key permissions to your data by setting each CRUD method to TRUE or FALSE and clicking save. Changes will not be made until you click the save button. They can be changed at any time. Once a method is set to false, users on your app cannot access that route. This is helpful if you don't want to let users delete or update own records.</p>
			</div>
		</div>
	)
}


export default Docs;


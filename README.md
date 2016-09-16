# Sheep.host
Sheep.host is a backend-as-as-service built on top of MongoDB that gives developers the ability to quickly generate hosted databases with the click of a button.

Sheep was born out of our desire to make full-stack prototyping more nimble. Sheep provides an out-of-the-box backend platform that abstracts away the tedious infrastructure and API tasks required to host, save, and retrieve data.

To get started, a developer simply needs to:

- Sign-up and log-in
- Create a database by inputting their database name, collection name, and schema through their GUI dashboard
- Add the script tag that is provided on the profile page to their client side application
- Interact with the data using Sheep’s SDK

## Features:

- Dashboard GUI: View data stored in each database and collection
- API Sandbox: Developers can make CRUD instructions to their database through their GUI dashboard to create and manipulate data without writing a single line of code.
- SDK: Applications can interact directly with databases by using Sheep’s SDK/API
- 2-Tier Permissions: Since applications can interact with directly databases, developer are given a full-access secret key as well as a permissions-based client key that they can place directly in their application. Developers can dynamically change permissions through their dashboard.
- Email Verification: New accounts require email verification to create an account
- JWT: Dashboard sessions are secured using JSON web tokens
- Bcrypt: All passwords are hashed using Bcrypt

## Navigating the Site:

### CREATE

The CREATE tab is where you instantiate all of your databases and collections. You are currently limited to three (3) databases. Please email us at administrator@sheep.host if you need to rename a database or delete it or any collections within.

#### Creating a Database

Enter the desired name of your database and the name of its first collection.

Enter your desired schema in the form of a JSON object. Incorrect schema input will be rejected and neither the database or collection will be created.
- Correct example: {"firstName": "String", "lastName": "String", "age": "Number"}
- Inorrect example: firstName: String, lastName: String, age: Number

#### Creating a Collection

To create a new collection within an existing database, simply enter the name of that database in lieu of a new one.

### DATA

The Dashboard tab contains all of your data we are hosting. You can navigate between all of your databases and each collection within those databases.

The particular collection displayed on the dashboard at any given moment will display new documents, updates to existing documents and the removel of documents as those changes come in from your apps.

#### API Sandbox

Below the data is a sandbox for you to prototype your data performing simple CRUD instructions to the collection you are viewing.

To update or delete documents, enter a JSON object with the {key:value} pair of the document you wish to change into the designated input field.
To update or add documents, enter the desired information in the form of a JSON object the same way you enter your schema on the CREATE page.
- Example: {"firstName": "John", "lastName": "Doe", "age": "30"}

### PROFILE

The PROFILE tab contains all of your user information, a list of your databases and collections, as well as your API key information.

Below all of this information is the auto-generated series of script tags to access our SDK...

#### Using the SDK

To use the globally exposed sheep object, simply copy the script tags and paste them into the app's HTML file above your Javascript.

Call the SDK methods via the  sheep object, and enter the desired database name and collection as the first two arguments.

##### GET
- sheep.get( [database_name], [collection_name], callback )

Returns all of the documents in the collection to the callback in the third argument as an array of objects.

Example: 

    // Gets all records from the Users collection in the MyApp database and logs them individually{{
    sheep.get(MyApp, Users, (results => {
      results.forEach(record){
        console.log(record);
      });
    });
  
##### POST

- sheep.post( [database_name], [collection_name], {data})

Adds a record to a given collection. The third argument, data refers to an object with the key:value pairs, that follows the schema you created for that collection. A successful post will receive a response with status code 200.

Example: 

    // Adds a record with "John Doe" in the "name field" and "Los Angeles" in the "location" field from the Users collection in the MyApp database{{
    sheep.post(MyApp, Users, { name: "John Doe", location: "New York" })
  
##### PUT

- sheep.put(  [database_name], [collection_name], { query }, { data } )

Updates a record in a given collection. The third argument, query refers to an object with the key:value pair of the record you want to change, that follows the schema you created for that collection. The fourth argument, data refers to an object with the key:value pair(s) to change. A successful post will receive a response with status code 200.

Example: 

    // Changes the "location" field of the record with "name" of "John Doe" to "New York" in the Users collection in the MyApp database{{
    sheep.put(MyApp, Users,{ name: "John Doe" }, { location: "New York" })
  
##### DELETE

- sheep.delete( [database_name], [collection_name], { query } )

Deletes a record in a given collection. The third argument, query refers to an object with the key:value pair of the record you want to delete, that follows the schema you created for that collection. A successful post will receive a response with status code 200.

Example: 

    // Deletes the record with "John Doe" in the "name" field from the Users collection in the MyApp database{{
    sheep.delete(MyApp, Users, { name: "John Doe" })
  
#### Setting Client Permissions

You can modify your API Client Key permissions to your data by setting each CRUD method to TRUE or FALSE and clicking save. Changes will not be made until you click the save button. They can be changed at any time. Once a method is set to false, users on your app cannot access that route. This is helpful if you don't want to let users delete or update own records.


# Sheep-host
Sheep.host is a backend-as-as-service built on top of MongoDB that gives developers the ability to quickly generate hosted databases with the click of a button.

Sheep was born out of our desire to make full-stack prototyping more nimble. Sheep provides an out-of-the-box backend platform that abstracts away the tedious infrastructure and API tasks required to host, save, and retrieve data.

To get started, a developer simply needs to:

- Sign-up and log-in
- Create a database by inputting their database name, collection name, and schema through their GUI dashboard
- Add the script tag that is provided on the profile page to their client side application
- Interact with the data using Sheep’s SDK

Features:

- Dashboard GUI: View data stored in each database and collection
- API Sandbox: Developers can make CRUD instructions to their database through their GUI dashboard to create and manipulate data without writing a single line of code.
- SDK: Applications can interact directly with databases by using Sheep’s SDK/API
- 2-Tier Permissions: Since applications can interact with directly databases, developer are given a full-access secret key as well as a permissions-based client key that they can place directly in their application. Developers can dynamically change permissions through their dashboard.
- Email Verification: New accounts require email verification to create an account
- JWT: Dashboard sessions are secured using JSON web tokens
- Bcrypt: All passwords are hashed using Bcrypt

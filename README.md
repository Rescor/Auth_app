#  Auth App

## 1. Create the database
You need to create a MySQL database and execute a dump from /database/create_db.sql to it.

## 2. Run the backend
You need to write your database credentials into /server/db.js and add JWT token into process env or in /server/utils/jwt_secret.js
Then in the /server directory, you need to run:
### `npm install`

After that you can start the server with:
### `npm run serve`

By default, server runs at 3001 port.

## 3. Run the frontend client
In the /client directory, you need to run:
### `npm install`
If necessary, change the server address in the /client/utils/serverUrl.js config file.

After that you can start the server with:
### `npm start`
Client will be run at [http://localhost:3000](http://localhost:3000)

## 4. Create the account
Just send a POST request to http://127.0.0.1:3001/auth/register
The request body must contain a valid email and password (min. 8 characters).
Example of the request body: { "email": "admin@aww.xyz ", "password": "password" }

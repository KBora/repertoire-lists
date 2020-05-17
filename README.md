What's npm init doing when you setup your Node.js project?
Walk through the creation of package.json file

What benefit is Nodemon giving us?
Node script runs automatically when source code changes

Why do we need Babel?
Node does not have latest ECMAScript features. Babel transpiles code into vanialla JavScript so you can use latest JavaScript language feature

Why do we need Environment Variables?
Store sensitive data (passwords, credentials). Use dotenv to access .env files

What's front end and a backend application?
Front end sits on the client machine. Backend sits on the server

How do front end and back end communicate?
Via http requests

This syntax : users[req.params.userId] is NOT retrieving users by array index, but by userId


How to determine which node process to attach to?
lsof -i:3000

PostGres
https://www.robinwieruch.de/postgres-sql-macos-setup

Database: repb

list dbs: psql -l

database: repb
superuser: baba
password: kiki

How to run this thing
yarn run start

How to start postgres on local machine
pg_ctl -D /usr/local/var/postgres start

How to stop postgres
pg_ctl -D /usr/local/var/postgres stop
https://www.robinwieruch.de/postgres-sql-macos-setup

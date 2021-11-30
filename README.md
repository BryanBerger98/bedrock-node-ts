# Bedrock Node

Bedrock Node TS is a NodeJS application using TypeScript allowing to start a new Node project from a healthy and operational base.
It is already compatible with MongoDB and will be with Postgres.

## Get the project

Follow these steps to get the project on your computer:

<br>

Clone the repository:
```bash
git clone git@github.com:BryanBerger98/bedrock-node-ts.git
```
Go inside the project directory:
```bash
cd bedrock-node-ts
```
Install dependences:
```bash
npm i
```
Set up your env variables inside a `.env` file:
```dosini
PORT= #PORT OF NODE JS APPLICATION
MONGODB_URI= #URI OF YOUR MONGO DB SERVER
JWT_SECRET= #SIGNATURE OF YOUR JWTs
EMAIL_HOST= #HOST OF YOUR SMTP CONFIG
EMAIL_PORT= #PORT OF YOUR SMTP CONFIG (2525, 587, ...)
EMAIL_USER= #USER (email address) of your SMTP CONFIG
EMAIL_PASS= #PASSWORD OF YOUR SMTP CONFIG
FRONT_URL= #URL OF YOUR FRONTEND APPLICATION
```

## Development server

You need to install globaly `nodemon` to run the dev server:
```bash
npm i -g nodemon
```
Then execute `npm run dev` in your terminal. The API url is `http://localhost:3000/`.

## Documentation

[Go to docs](https://github.com/BryanBerger98/bedrock-node/wiki)
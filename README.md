# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Node, docker, npm required

### Create .env file

For security purposes the password to the docker compose file has been omitted. Before running `docker compose up` edit the `.env` file and add the password, replacing the "".

Ie if the password is `bob` the file would read `POSTGRES_PASSWORD=bob`

### Compose docker file

Run `docker compose up`

### Install react dependancies

Run `npm i`

### Run React App

Run `npm start`

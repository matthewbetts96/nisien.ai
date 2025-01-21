# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

For this project to work you will first need to install the following items:

- Docker
- Node (LTS is best)
- NPM

### Update .env file and add password

For security purposes the password to the docker compose file has been omitted. Before running `docker compose up` edit the `.env` file and add the password, replacing the "".

Ie if the password is `bob` the file would read `POSTGRES_PASSWORD=bob`

### Compose docker file

Run `docker compose up`

### Install react dependancies

Navigate to `/src` and run `npm i`

### Run React App

Run `npm start`.

The app should start up successfully in the browser.

# ADR's

To read the ADR's for this project navigate to the ADR folder [here.](./adr/)

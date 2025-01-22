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

### Run React Tests

Run `npm run test`.
The tests should start up successfully in the terminal.

# ADR's

To read the ADR's for this project navigate to the ADR folder [here.](./adr/)

# Thoughts through the development process

- Purposely kept the added libraries down as much as possible only to include what was needed.
- I did not realise that certain endpoints had restrictions on them regarding limits. Such as the fact that each user could only have one drink or that each user could only be in one drink run. These only became apparent while developing and running edge case testing during development. This discovery forced me to change my desired design to accomodate for these limitations.
- Unit tests have been done sparingly with this project. In a real project I preferably would have written tests for most if not all components in react testing library, but given the amount of time that I have already put into this project I deemed that just a few would suffice as a demonstration that I am capable of producing them.
- The translation feature that has been incorperated is borrowed from another project of mine, in it's current form it still has features that need to be developed. But for the sake of showing it off in this demonstration, it works fine here without any issues.
- The translation feature is built with testing ease in mind, by importing/exporting components through default and by named, we can use the defaults in other components and the named in the tests. This allows us to easily mock out the `t` function in tests to just return the JSON string.
- General development thoughts was for ease of use for the user, they should be able to do what they want to do in as little clicks as possible.
- This philosophy generates design patterns that guide the user through a process step by step and don't hide things behind extra options menus and the like.

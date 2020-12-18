# Spaced Repetition Capstone

<h1>Chosen Language is Italian</h1>
<ul>
<li>Sign up or Log in</li>
<li>Dashboard presents you with a list of words to practice and your total scores</li>
<li>Click the learning button to start practicing the words</li>
<li>You can enter a guess and check your answer and the score will be tallied up</li>
</ul>
<h1>Sign Up Page</h1>
<img src="src/images/signup.png"/>
<h1>Log In Page</h1>
<img src="src/images/login.png"/>
<h1>Dashboard</h1>
<img src="src/images/dashboard.png"></img>
<h1>Learning Page</h1>
<img src="src/images/learning.png" />

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application _Cypress.io_ for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

-   You have cypress installed (this is a devDependency of the project)
-   You have your application running at http://localhost:3000.
    -   You can change the address of this expectation in the `./cypress.json` file.
-   Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.

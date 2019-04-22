This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It simulates the shopping cart of an online store.<br>

The app uses Redux for managing the state of the cart. [Context/Hooks](https://www.academind.com/learn/react/redux-vs-context-api/) were not used.<br>

The code for the cart (Redux) has been fully tested using Jest, Enzyme and Moxios for 100% coverage. The code for the majority of the components has also been tested but time limitations prevented 100% coverage.<br>

Axios was used for making the Get call to products.json (with Moxios for testing).

The app uses Flow for type checking the input of the components.<br>

A CSS grid (with float) has been used to allow for a responsive design. A mobile version has not been provided.<br>

The React code is structured using the [presentation and container](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) pattern.<br>

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test -- --coverage`

Launches the test runner in the interactive watch mode with code coverage.<br>

### `npm run flow`

Type checks the components of the app using [Flow](https://flow.org/)<br>


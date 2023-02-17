# Lighthouse Dashboard PoC

This is a proof-of-concept app for generating a simple React-driven (via [Create React App](https://github.com/facebook/create-react-app)) dashboard that displays the results history of perfomance tests run through [Lighthouse](https://www.npmjs.com/package/lighthouse) for differnt URLs.
## Local Setup
- From within the `lighthouse` directory run: `npm install`
- From the repo run: `npm install`
- Update the `lighthouse/src/config` file with the URLs you want to test (see file comments for required keys/values in the json.), and the main title/url you want to use for your report dashboard.
- Run an initial analysis of your URLs and generate reports. From within the `lighthouse` directory run: `npm run lighthouse`
- Then start up the dashboard locally and view it at https://localhost:3000: `npm run start'

## Github Pages/Actions Setup
_More information coming soon._

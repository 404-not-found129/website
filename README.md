# Science Project 2025

## Project setup
1. Clone this repository using `git` or the github desktop app.
2. Run `npm install` to install javascript dependencies.
3. Run `npm run auth` to authenticate against an already created AWS account.
4. Run `npm run deploy` to deploy the AWS lambda functions using the [serverless framework](https://www.serverless.com/).
5. Update the URL in the `calculate()` function in `public/script.js` file to point to the deployed API endpoint.
6. Copy the contents of the `public` folder to an S3 bucket that has static website hosting enabled.

## Running the project locally
1. Run `npm run serve` to start the local development server.
2. Navigate to `localhost:8080` in your browser.

## File descriptions
* `package.json`: Lists the JavaScript dependencies for the project.
* `public/index.html`: Contains the HTML structure for the project's web interface.
* `public/script.js`: Contains the JavaScript code for the client-side functionality of the project, including the `calculate()` function that:
  1. Will calculate the sum within the web browser if the selected language is JavaScript. 
  2. Sends requests to the deployed API functions/endpoints when the language chosen for performing the calculation is `go` or `python`.
* `public/style.css`: Contains the CSS styles for the project's web interface.
* `science-project-2025/serverless.yml`: Contains the serverless configuration for deploying the AWS lambda functions.
* `science-project-2025/handler.py`: Contains the python code for the AWS lambda functions that perform the calculations for the `python` language.
* `science-project-2025/handler.go`: Contains the Go code for the AWS lambda functions that perform the calculations for the `go` language.
* `science-project-2025/go.mod`: Contains the Go module dependencies for the `handler.go` file.

## URLs
* Website: http://jlc-science-project.s3-website-us-east-1.amazonaws.com/
* Python function: https://8q1kodsag9.execute-api.us-east-1.amazonaws.com/calc/python
* Go function: https://8q1kodsag9.execute-api.us-east-1.amazonaws.com/calc/go

## Reference Links
* [HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
* [The \<head\> Section in HTML](https://useful.codes/the-head-section-in-html/)
* [CSS Selector Reference](https://www.w3schools.com/cssref/css_selectors.php)
* [Google Fonts](https://fonts.google.com)
* [Serverless Framework](https://github.com/serverless/serverless?tab=readme-ov-file#quick-start)
* [Serverless Framework Go Plugin](https://github.com/mthenw/serverless-go-plugin)
* [Python for New Programmers](https://wiki.python.org/moin/BeginnersGuide/NonProgrammers)
* [A Tour Of Go](https://go.dev/tour/welcome/1)
* [npm Cheat Sheet](https://www.freecodecamp.org/news/npm-cheat-sheet-most-common-commands-and-nvm/)
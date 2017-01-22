# sms-sync

## What is this?

This is a web interface for sending SMS messages through an Android phone.

## Building the app

1. Clone this repository. `$ git clone https://github.com/elklein96/sms-sync`

2. Install some dependencies. `$ npm install && bower install`

3. Run the app. `$ grunt serve-dev`

## Testing

  - This project contains configurations for the Karma test runner, Mocha test framework, Chai assertion library, and Sinon (great for creating stubs and specs for Angular unit tests).

1. Create unit tests with file name `file.being.tested.spec.js`

2. Run `$ grunt test` to run the Karma server

  - To generate a coverage report, run `$ istanbul cover --report html grunt test`
  - The report will be in an HTML file located at `/coverage/index.html`

3. Run `$ grunt analyze` to start `jshint`

And that's it! Have fun!
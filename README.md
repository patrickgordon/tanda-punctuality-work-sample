# TANDA Work Sample (Front-end) 

This is my attempt at the 'punctuality' work sample for TANDA. It uses a variety of modern front-end tech to deliver the requirements.

It has been built as a "Single Page App" (SPA) but could just be also integrated in to a more traditional web app.

#### Requirements to run:
* npm @ at least 3.0.0 (tested with 3.3.12)
* sinatra @ at least 1.4.7 (tested with this)
* node @ at least 4.5.0 (tested with 5.5.0)

#### Steps to get started
1. Install Sinatra: `gem install sinatra`
1. Install Sinatra-cross_origin: `gem install sinatra-cross_origin`
1. Install dependencies, in root directory run: `npm install`
1. Run the back end: `cd sinatra_web_server && ruby punctuality.rb`
1. Run the front end: `npm run dev`
1. Browse to [http://localhost:3000](http://localhost:3000)

#### Technology:
* React
* Redux
* Webpack
* React-router

#### Noteworthy packages used
* [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)
* [redux-api-middleware](https://github.com/agraboso/redux-api-middleware)
* [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap)
* [react-bootstrap-table](https://github.com/AllenFang/react-bootstrap-table)

#### Comments on Implementation
* explain the use of selectors
* extra functionality - bad data highlighted rows

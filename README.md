# TANDA Work Sample (Front-end) 

This is my attempt at the 'punctuality' work sample for TANDA. It uses a variety of modern front-end tech to deliver the requirements.

It has been built as a "Single Page App" (SPA) but could just be also integrated in to a more traditional web app.

#### Requirements to run:
* npm @ at least 3.0.0 (tested with 3.3.12)
* sinatra @ at least 1.4.7 (tested with this)
* node @ at least 4.5.0 (tested with 5.5.0)
* I highly suggest using Chrome to view this

#### Steps to get started
1. Install Sinatra: `gem install sinatra`
1. Install Sinatra-cross_origin: `gem install sinatra-cross_origin`
1. Install dependencies, in root directory run: `npm install`
1. Run the back end: `cd sinatra_web_server && ruby punctuality.rb`
1. Run the front end: `npm run dev`
1. Browse to [http://localhost:3000](http://localhost:3000)

#### Issues?
* If you see no data then check your console log for fetch/cross origin issues. If this occurs, then please make sure
you have installed the gem properly.

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
* The use of redux selectors (via the `reselect` library) makes determing computed values a breeze. This is how all the 
statistics are calculated. This is also extremely fast as it only recalculates when the selector's arguments change.
This is better than doing these calculations in the component as it would recalculate every time the state changed. 
It also has other benefits, but in short: selectors are awesome.
* I added some row highlighting / inclusion in 'stats' for "invalid rows". These are rows which have no time clocked for
both the start and finish of roster and shift data.
* I decided to omit the "Time Saved" section as there was not enough context in the spec to clearly understand what 
this actually was and how it was being calculated.

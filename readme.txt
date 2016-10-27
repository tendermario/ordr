TODO LIST

Note: If youre not going to demo it, dont build it

----- Customer needs -----

As a customer, I want to place an order from the restaurant I chose
  by web because I want to skip the wait

As a customer I want to be able to select multiple items because I may
  order more than one thing

Customer press submit button and get email confirming order

Customer receive notification when order is ready
  hardcode 15 min delay for text

//stretch
As a customer, I want to pay online because convenience
Pay online with Stripe integration
Passport user login/auth
Modifiers on order like no tomatoes or allergy


----- Restaurant needs -----

As a restaurant I want to be able to receive orders from my customers

As a restaurant I want to get orders read outloud to me by phone because
  I want a way to get the data while I am in the kitchen
    If this is not possible, I want an interface to see the orders for same reason, or both

Restaurant has a page that displays orders from customers

//stretch
Restaurant button to press to text customer order is ready
Restaurant manage dishes (name, price, photo, add, remove)
Multi-restaurant
Restaurant mark off the order notify customer when it is ready



----- Languages -----
  Javascript
  Ajax
  Twillio API
  Bootstrap
  Heroku // stretch


-JS Modules-
  Express (express)
  EJS (ejs)
  Postgres (pg) (database)
  Knex (knex)
  cookie-session (cookie-session)
  Bodyparser (body-parser)
  Websockets (socket.io)
  Sass (node-sass)
  Jquery (jquery)

  -JS Modules - dev environment-
  Nodemon (nodemon)
  Babel (babel-core, babel-loader, babel-preset-es2015)
  Webpack (webpack)


----- Requirements -----
Food Pick-up Ordering
A food ordering experience for a single restaurant. Hungry clients of this fictitious restaurant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as a middle-man.

You can use a modern telecomm API service such as Twilio to implement the communication from the website to the client and restaurant.

When an order is placed the restaurant is phoned and the order is read out to them. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

For inspiration check out how Ritual works, but keep in mind that's implemented as a native app and serves more than one restaurant.

Extensions:

allow clients to pay for their order online, using Stripe integration for implementing secure e-commerce. If implemented, the clients would choose wether to pay online or at the counter
allow the restaurant owner to view their orders
allow the restaurant owner to manage their dishes (prices, photos, descriptions, etc.)
support for multiple restaurants instead of just the one (making it a multi-tenant SaaS)

----- Stack Requirements -----
Project must use:

ES6 for server-side (Node) code
ES5 for front-end code
Node
Express
RESTful routes
Using AJAX or complete SPA approach is optional
One of the following two CSS grid and UI frameworks
Bootstrap 3 or Zurb Foundation 5
jQuery
SASS for styling
PostgreSQL for DB
Knex.js for querying and migrations
git for version control
heroku for hosting (hosting is optional)
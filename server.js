require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const PORT = process.env.SERVER_PORT || 8080;

const customersApi = require('./routes/customers');
const restaurantsApi = require('./routes/restaurants');
const db = require('./db/db');

//// Server

const app = express();
app.set("view engine", "ejs");
// pass app into server method on http
const server = require('http').Server(app);
// telling socket.io to use http with our express server
const io = require('socket.io')(server);

//// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'session', keys: ['key1', 'key2'] }))
app.use(express.static('public'));

//// Routes

app.get("/", (req, res) => {
  res.redirect("/customers");
});



//// Database passing its methods to the view

db.connect((dbInstance) => {
  app.use('/restaurants', restaurantsApi(dbInstance));
  app.use('/customers', customersApi(dbInstance));
});

// Start Server
app.listen(PORT, () => {
  console.log(`ordr app listening on port ${PORT}`);
} );
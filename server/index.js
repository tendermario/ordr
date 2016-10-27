const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const PORT = process.env.PORT || 8080;


//// Server

const app = express();

// pass app into server method on http
const server = require('http').Server(app);

// telling socket.io to use http with our express server
const io = require('socket.io')(server);


//// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ name: 'session', keys: ['key1', 'key2'] }))
app.use(express.static('public'));

// View Engine:
app.set("view engine", "ejs");


//// Routes

app.get("/", (req, res) => {
  res.render("index");
});


// Start Server
app.listen(PORT, () => {
  console.log(`ordr app listening on port ${PORT}`);
} );
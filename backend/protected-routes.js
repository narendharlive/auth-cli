var express = require('express'),
    jwt     = require('express-jwt');
   // config  = require('./config'),
  //  quoter  = require('./quoter');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'na12345',
  database: 'cliapp'
});

connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});


var app = module.exports = express.Router();
var config = {
  "secret": "ngEurope rocks!"
};

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/users', jwtCheck);

/*app.get('/api/protected/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});*/

app.get('/users', function (req, res) {
  connection.query('SELECT * from users LIMIT 20', function (err, rows, fields) {
    // connection.end();
    if (!err) {
      //console.log('The solution is: ', rows);
      return res.status(200).send(rows);
    }
    else {
      console.log('Error while performing Query.');
      return res.status(200).send(opps);
    }
  });
});

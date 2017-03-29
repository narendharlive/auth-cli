var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'na12345',
  database : 'cliapp'
});
var app = express();

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});


var app = express();

dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(express.logger('dev'));
  app.use(errorhandler())
}




app.get('/register', function(req, res) {
connection.query('SELECT * from tasks LIMIT 2', function(err, rows, fields) {
// connection.end();
  if (!err) {
    console.log('The solution is: ', rows);
    return res.status(200).send(rows);
   }
  else {
    console.log('Error while performing Query.');
    return res.status(200).send('error');
    }
  });
  });



/*
app.use(require('./anonymous-routes'));
app.use(require('./protected-routes'));
app.use(require('./user-routes'));
*/

var port = process.env.PORT || 4201;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});


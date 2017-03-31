var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    _ = require('lodash'),
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


var users = [{
               id: 1,
               name: 'gonto',
               email: 'gonto',
               password: 'gonto'
             }];

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




app.post('/register', function(req, res) {
    // console.log(req);
    if (!req.body.name || !req.body.email || !req.body.password) {
     return  res.status(201).send({'error': "You must send the username and the password"})
    }
   if (_.find(users, {email: req.body.email})) {
     return  res.status(201).send({'error': "A user with that username already exists"})
    }
// console.log(users, req.body)

    var profile = _.pick(req.body, 'name','email', 'password');
    profile.id = _.max(users, 'id').id + 1;

    users.push(profile);
/*    res.status(201).send({
             'data' : 'You are Successfully Registered'
             //id_token:  'test'; //createToken(profile)
            });*/
var name = req.body.name,
email = req.body.email,
password = req.body.password;


connection.query('INSERT INTO users SET ?',req.body, function(err, result) {
  if (!err) {
    console.log(result);
    return res.status(200).send({'data':'You are Successfully Registered'});
   }
  else {
    console.log(err);
    return res.status(200).send({'error': 'Error while performing  DB'});
    }
  });



 /* connection.query('INSERT INTO `users`(`name`, `email`, `password`) VALUES (req.body.name, req.body.email, req.body.password)', function(err, rows, fields) {
// connection.end();
  if (!err) {
    res.status(201).send({
         'data' : 'You are Successfully Registered'
         //id_token:  'test'; //createToken(profile)
        });
   }
  else {
   res.status(201).send({
            'error' : 'Error With Database Connection'
           });
    }
  });*/
  });

app.get('/users', function(req, res) {
  connection.query('SELECT * from users LIMIT 20', function(err, rows, fields) {
  // connection.end();
    if (!err) {
      //console.log('The solution is: ', rows);
      return res.status(200).send(rows);
     }
    else {
      console.log('Error while performing Query.');
      return res.status(200).send('error');
      }
    });
});

app.put('/users/:id', function(req, res) {
var id = req.params.id;
  connection.query('UPDATE users SET ? WHERE UID = ?', [req.body, id], function(err, rows, fields) {
  // connection.end();
    if (!err) {
      //console.log('The solution is: ', rows);
      return res.status(200).send('You Are Successfully Updated');
     }
    else {
      console.log('Error while performing Query.');
      return res.status(200).send('error');
      }
    });
});


app.delete('/users/:id', function(req, res) {
  var id = req.params.id;
 // console.log(id);
 // console.log(res);
  connection.query('DELETE FROM users WHERE UID = ?', [id], function(err, rows, fields) {
  // connection.end();
    if (!err) {
      //console.log('The solution is: ', rows);
      return res.status(200).send('You Are Successfully Updated');
     }
    else {
      console.log('Error while performing Query.');
      return res.status(200).send('error');
      }
    });
});





app.get('/tasks', function(req, res) {
  connection.query('SELECT * from tasks LIMIT 20', function(err, rows, fields) {
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

app.post('/tasks', function(req, res) {
    connection.query('INSERT INTO tasks SET ?',req.body, function(err, result) {
    if (!err) {
      console.log(result);
      return res.status(200).send({'data':'Task Created Successfully'});
    }
    else {
      console.log(err);
      return res.status(200).send({'error': 'Error while performing  DB'});
    }
  });

});

app.get('/task/:id', function (req, res) {
  var tid = req.params.id;
console.log(tid);
  connection.query('SELECT * FROM tasks WHERE TID = ?', [tid], function (err, rows, fields) {
   // console.log(tid, rows);
    if (!err) {
      //console.log('The solution is: ', rows);
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


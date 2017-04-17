import * as express from 'express';
import * as bodyParser from 'body-parser';
const app  = express();
let mysql = require('mysql');
let cors = require('cors');
let dotenv = require('dotenv');
let dbConfig = require('./db.config.json');

let connection = mysql.createConnection(dbConfig);

connection.connect(function(err){
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

dotenv.load();
export function api(req: any, res: any){
  connection.query('SELECT * from tasks LIMIT 5', function (err, rows, fields) {
    // connection.end();
    if (!err) {
      //  console.log('The solution is: ', rows);
      return res.status(200).send(rows);
    }
    else {
     // console.log('Error while performing Query.');
      return res.status(200).send('Error while performing Query.');
    }
  });


  app.get('/api/tasks', function(req, res) {
    connection.query('SELECT * from tasks LIMIT 50', function(err, rows, fields) {
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

  }


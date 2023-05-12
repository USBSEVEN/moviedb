var express = require('express')
var cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()

var app = express()
app.use(cors())
app.use(express.json())

const connection = mysql.createConnection(process.env.DATABASE_URL)
app.get('/', (req, res) => {
    res.send('Hi')
})

app.get('/movie', (req, res, next) =>{
    connection.query(
        'SELECT * FROM movie',
        function(err, results, fields){
            console.log(results)
            res.json(results);
        }
    );
})

app.get('/movie/:number', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `movie` WHERE `number` = ?',
    [number],
    function(err, results) {
      res.json(results);
    }
  );
})

app.post('/movie', function (req, res, next) {
    connection.query(
      'INSERT INTO `movie`(`name_movie`, `description`, `release_date`, `poster`) VALUES (?, ?, ?, ?)',
      [req.body.name_movie, req.body.description, req.body.release_date, req.body.poster],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.put('/movie', function (req, res, next) {
    connection.query(
      'UPDATE `movie` SET `name_movie` = ?, `description` = ?, `release_date` = ?, `poster` = ? WHERE number = ?',
      [req.body.name_movie, req.body.description, req.body.release_date, req.body.poster, req.body.number],
      function(err, results) {
        res.json(results);
      }
    );
  })

  app.delete('/movie', function (req, res, next) {
    connection.query(
      'DELETE FROM `movie` WHERE number = ?',
      [req.body.number],
      function(err, results) {
        res.json(results);
      }
    );
  })

app.listen(process.env.PORT || 3000)
// connection.end()
var express = require('express')
var cors = require('cors')
var app = express()

const mysql = require('mysql2')
require('dotenv').config()


app.use(cors())

const connection = mysql.createConnection(process.env.DATABASE_URL)
app.get('/', (req, res) => {
    res.send('Hi')
})

app.get('/moviedb', (req, res) =>{
    connection.query(
        'SELECT * FROM movie',
        function(err, results, fields){
            console.log(results)
            res.json(results)
        }
    )
})

app.post('/create', (req, res) =>{
    connection.query(
        'INSERT INTO movie (name_movie,description,release_date,poster) VALUES (?,?,?,?)',
        function(err, results, fields){
            res.send(results);
        }
    )
})

app.delete('/delete', (req, res) =>{
    connection.query(
        'DELETE FROM movie WHERE number = ?',
        // [req.body.id],
        function(err, results, fields){
            console.log(results)
            res.send(results)
        }
    )
})

app.listen(process.env.PORT || 3000)
// connection.end()
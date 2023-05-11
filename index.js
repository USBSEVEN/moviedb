const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
require('dotenv').config()
const app = express()


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
            res.send(results)
        }
    )
})

app.post('/create', (req, res) =>{
    connection.query(
        'INSERT INTO movie(name_movie,description,release_date,poster) VALUES (?,?,?,?)',
        [req.body.name_movie, req.body.description, req.body.release_date, req.body.poster],
        function(err, results, fields){
            res.json(results);
        }
    )
})

app.listen(process.env.PORT || 3000)
// connection.end()
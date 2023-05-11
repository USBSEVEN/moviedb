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

app.post('/moviedb', (req, res) =>{
    connection.query(
        'INSERT INTO moviedb.movie (name_movie,description,release_date,poster) VALUES (?,?,?,?)', [name_movie,description,release_date,poster],
        function(err, results, fields){
            console.log(results)
            res.send(results)
        }
    )
})

app.listen(process.env.PORT || 3000)
// connection.end()
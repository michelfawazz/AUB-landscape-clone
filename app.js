
require('dotenv').config();

var http = require('http');
var fs = require('fs');
var url = require('url');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');


//database
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));






//middleware
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


//routes
const PlantRouter = require('./routes/plants');
app.use('/plants', PlantRouter);




app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});





app.listen(8089);
console.log("Server created successfully!");


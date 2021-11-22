
require('dotenv').config();

var http = require('http');
var fs = require('fs');
var url = require('url');

const express = require('express');
const app = express();
const AdminRoutes = require('./routes/AdminRoutes');

const bodyParser = require('body-parser');



//database
const mongoose = require('mongoose');
const { application } = require('express');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });


const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));






//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


//routes
app.use("/admin",AdminRoutes);



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/html_files/index.html');
});

app.get('/about', function(req, res) {
    res.sendFile(__dirname + '/html_files/about.html');


});












app.listen(8089);
console.log("Server created successfully!");



require('dotenv').config();

var http = require('http');
var fs = require('fs');
var url = require('url');

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();


const bodyParser = require('body-parser');

app.use(expressLayouts);
app.set("layout" , "./Layouts/Adminlayout");
app.set("view engine", "ejs");





//database
const mongoose = require('mongoose');
const { application } = require('express');
mongoose.connect("mongodb+srv://michel:cmps278@cmps278plants.6wb92.mongodb.net/CMPS278Plants?retryWrites=true&w=majority", { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to MongoDB'));




//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


//routes
const AdminRoutes = require('./routes/AdminRoutes');
app.use("/admin",AdminRoutes);

const UserRoutes = require('./routes/UserRoutes');
app.use("/",UserRoutes);



















app.listen(8089);
console.log("Server created successfully!");


var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


// using mongodb create a database called "Plants"






app.listen(8089);
console.log("Server created successfully!");


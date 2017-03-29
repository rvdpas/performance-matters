var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

require('dotenv').config()

var apiUrl = process.env.API_URL;
var apiKey = process.env.API_KEY;
var searchKey = process.env.API_SEARCH_KEY;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// Global vars
app.use(function(req, res, next) {
	res.locals.errors = null;
	next();
});

// Overview Page
app.get('/', function (req, res) {
 request(apiUrl + apiKey + searchKey, function (error, response, body) {
   var data = JSON.parse(body)
   res.render('index.ejs', {residences: data})
 });
})

// Detail page
app.get('/residences/:GroupByObjectType', function (req, res, GroupByObjectType) {
 request(apiUrl + 'detail/' + apiKey + '/koop/' + req.params.GroupByObjectType, function (error, response, body) {
   console.log(GroupByObjectType);
   var data = JSON.parse(body)
   res.render('detail.ejs', {residence: data})
 });
})

app.listen(3000, function() {
	console.log("Server started on port 3000...");
})

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');

var app = express();

require('dotenv').config()

var apiUrl = process.env.API_URL;
var apiKey = process.env.API_KEY;
var searchKey = process.env.API_SEARCH_KEY;
var searchKeyExtended = process.env.API_SEARCH_EXTENDED;

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

// Compression
app.use(compression({
  threshold: 0,
  filter: () => true,
}));

app.post('/result', search);
function search(req, res){
  var query = req.body.input;
  request(apiUrl + apiKey + searchKey + query + searchKeyExtended, function (error, response, body) {
      if(!error && response.statusCode === 200) {
          data = JSON.parse(body);
          res.render('index.ejs', {
              residences: data
          });
      }
  });
}

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

app.get('/offline', function (req, res) {
  res.render('offline.ejs');
})


app.listen(3000, function() {
	console.log("Server started on port 3000...");
})

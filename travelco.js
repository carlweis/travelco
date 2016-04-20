var express = require('express');
var app = express();

// setup handlebars view engine
var handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// set server port
app.set('port', process.env.PORT || 3000);

// set public directory for static assets
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', function(req, res) {
  res.render('pages/home');
});
app.get('/about', function(req, res) {
  var fortunes = [
    "Conquer your fears or they will conquer you.", "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.", "Whenever possible, keep it simple.",
  ];
  var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.render('pages/about', {fortune: randomFortune});
});

// custom 404 page
app.use(function(req, res, next) {
  res.status(404);
  res.render('errors/404');
});

// custom 500 page
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('errors/500');
});

// start web server
app.listen(app.get('port'), function() {
  console.log('Express started at http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.');
});

/* import libraries */
var express      = require('express');
var logger       = require('morgan');
var httperr      = require('http-errors');
var csvdb        = require("csv-database");

/* create Express application */
var app = express();

/* models */
app.set('event_model', require('./models/event.js'));

/* controllers */
app.set('event_ctrl', require('./controllers/event.js'));

/* views */
app.set('view engine', 'pug');
app.set('views',       __dirname + '/views');

/* static */
app.use(express.static(__dirname + '/public'));

/* routes */
app.use('/',          require('./routes/index'));
app.use('/team',      require('./routes/team'));
app.use('/calendar',  require('./routes/calendar'));
app.use('/videos',    require('./routes/videos'));
app.use('/meetups',   require('./routes/meetups'));
app.use('/partners',  require('./routes/partners'));
app.use('/admin',     require('./routes/admin'));
app.use('/donate',    require('./routes/donate'));

/* logging */
app.use(logger('dev'));

/* create HTTP error 404 and forward it to error handler */
app.use(function(req, res, next) {next(httperr(404));});

/* main error handler */
app.use(function(err, req, res, next) {
  /* set locals */
  res.locals.message = err.message;
  res.locals.error   = err;
  /* change status from 200 to error code */
  res.status(err.status || 500);
  /* render the error page */
  res.render('error');
});

/* db connections */
(async function () {
  var event_csv   = __dirname + '/public/csv/events.csv';
  var event_model = app.get('event_model');
  var event_ctrl  = app.get('event_ctrl');
  var event_conn  = await csvdb(event_csv, event_model, '\t');
  event_ctrl.connect(event_conn);
})();

/* return app */
module.exports = app;

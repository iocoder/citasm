/* import libraries */
var express      = require('express');
var logger       = require('morgan');
var httperr      = require('http-errors');

/* create Express application */
var app = express();

/* logging */
app.use(logger('dev'));

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

/* return app */
module.exports = app;

/* libraries */
var express = require('express');

/* create a router */
var router = express.Router();

/* specifiy what to do when we get a GET request */
router.get('/', async function(req, res, next) {
  /* retrieve event controller */
  var event_ctrl = req.app.get('event_ctrl');

  res.locals.events = await event_ctrl.get_events();

  /* page data to be passed to the HTML renderer */
  res.locals.calendar = 'active';

  /* render HTML page as response */
  res.render('calendar');
});

/* GET request to view an event */
router.get('/view', async function(req, res, next) {

  /* page data to be passed to the HTML renderer */
  res.locals.calendar = 'active';

  /* render HTML page as response */
  res.render('event');
});

/* return the new router */
module.exports = router;

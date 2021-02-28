/* libraries */
var express = require('express');

/* create a router */
var router = express.Router();

/* specifiy what to do when we get a GET request */
router.get('/', function(req, res, next) {
  /* page data to be passed to the HTML renderer */
  res.locals.partners = 'active';

  /* render HTML page as response */
  res.render('partners');
});

/* return the new router */
module.exports = router;

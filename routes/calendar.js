/* libraries */
var express = require('express');

/* create a router */
var router = express.Router();

/* specifiy what to do when we get a GET request */
router.get('/', async function(req, res, next) {
  try {
    /* variables to hold all events */
    var events;

    /* get all events from the database */
    events = await req.app.get('event_ctrl').all_events();

    /* parameters to be passed to the HTML renderer */
    res.locals.calendar = 'active';
    res.locals.events   = events;

    /* render HTML page as response */
    res.render('calendar');
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Retrieve HTML with form to add new event */
router.get('/new', async function(req, res, next) {
  try {
    /* variables to hold events */
    var events;
    var event;

    /* get all events from the database */
    events = await req.app.get('event_ctrl').all_events();

    /* create an empty event for parsing */
    event = await req.app.get('event_ctrl').new_event();

    /* parameters to be passed to the HTML renderer */
    res.locals.calendar = 'active';
    res.locals.mode     = 'new';
    res.locals.locked   = false;
    res.locals.events   = events;
    res.locals.event    = event;

    /* render HTML page as response */
    res.render('event');
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Retrieve HTML with form to view an event */
router.get('/view', async function(req, res, next) {
  try {
    /* variables to hold events */
    var events;
    var event;

    /* get all events from the database */
    events = await req.app.get('event_ctrl').all_events();

    /* get specific event by ID */
    event = await req.app.get('event_ctrl').get_event(req.query.id);

    /* parameters to be passed to the HTML renderer */
    res.locals.calendar = 'active';
    res.locals.mode     = 'view';
    res.locals.locked   = true;
    res.locals.msg      = req.query.msg;
    res.locals.events   = events;
    res.locals.event    = event;

    /* render HTML page as response */
    res.render('event');
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Retrieve HTML with form to update an event */
router.get('/update', async function(req, res, next) {
  try {
    /* variables to hold events */
    var events;
    var event;

    /* get all events from the database */
    events = await req.app.get('event_ctrl').all_events();

    /* get specific event by ID */
    event = await req.app.get('event_ctrl').get_event(req.query.id);

    /* parameters to be passed to the HTML renderer */
    res.locals.calendar = 'active';
    res.locals.mode     = 'update';
    res.locals.locked   = false;
    res.locals.events   = events;
    res.locals.event    = event;

    /* render HTML page as response */
    res.render('event');
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Retrieve HTML with form to clone an event */
router.get('/clone', async function(req, res, next) {
  try {
    /* variables to hold events */
    var events;
    var event;

    /* get all events from the database */
    events = await req.app.get('event_ctrl').all_events();

    /* get a clone of a specific event by ID */
    event = await req.app.get('event_ctrl').get_event(req.query.id);

    /* parameters to be passed to the HTML renderer */
    res.locals.calendar = 'active';
    res.locals.mode     = 'clone';
    res.locals.locked   = false;
    res.locals.events   = events;
    res.locals.event    = event;

    /* render HTML page as response */
    res.render('event');
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Retrieve HTML with form to delete an event */
router.get('/delete', async function(req, res, next) {
  try {
    /* variables to hold events */
    var events;
    var event;

    /* get all events from the database */
    events = await req.app.get('event_ctrl').all_events();

    /* get specific event by ID */
    event = await req.app.get('event_ctrl').get_event(req.query.id);

    /* parameters to be passed to the HTML renderer */
    res.locals.calendar = 'active';
    res.locals.mode     = 'delete';
    res.locals.locked   = true;
    res.locals.events   = events;
    res.locals.event    = event;

    /* render HTML page as response */
    res.render('event');
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Retrieve HTML with form to restore an event */
router.get('/restore', async function(req, res, next) {
  try {
    /* variables to hold events */
    var events;
    var event;

    /* get all events from the database */
    events = await req.app.get('event_ctrl').all_events();

    /* get specific event by ID */
    event = await req.app.get('event_ctrl').get_event(req.query.id);

    /* parameters to be passed to the HTML renderer */
    res.locals.calendar = 'active';
    res.locals.mode     = 'restore';
    res.locals.locked   = true;
    res.locals.events   = events;
    res.locals.event    = event;

    /* render HTML page as response */
    res.render('event');
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Perform action */
router.get('/req', async function(req, res, next) {
  try {
    /* variable to hold requested event */
    var event;

    /* redirection URL*/
    var nextURL;

    /* go to calendar */
    if (req.query.action === 'calendar') {
      nextURL = "/calendar";
    }

    /* go to new form */
    if (req.query.action === 'new') {
      nextURL = "/calendar/new";
    }

    /* go to view form */
    if (req.query.action === 'view') {
      event = await req.app.get('event_ctrl').get_event(req.query.ID);
      nextURL = "/calendar/view?id=" + event["ID"];
    }

    /* go to update form */
    if (req.query.action === 'update') {
      event = await req.app.get('event_ctrl').get_event(req.query.ID);
      nextURL = "/calendar/update?id=" + event["ID"];
    }

    /* go to clone form */
    if (req.query.action === 'clone') {
      event = await req.app.get('event_ctrl').get_event(req.query.ID);
      nextURL = "/calendar/clone?id=" + event["ID"];
    }

    /* go to delete form */
    if (req.query.action === 'delete') {
      event = await req.app.get('event_ctrl').get_event(req.query.ID);
      nextURL = "/calendar/delete?id=" + event["ID"];
    }

    /* go to restore form */
    if (req.query.action === 'restore') {
      event = await req.app.get('event_ctrl').get_event(req.query.ID);
      nextURL = "/calendar/restore?id=" + event["ID"];
    }

    /* command: add new event to database */
    if (req.query.action === 'add') {
      event = req.query;
      event = await req.app.get('event_ctrl').add_event(event);
      nextURL = "/calendar/view?id=" + event["ID"] + "&msg=created";
    }

    /* command: update event details */
    if (req.query.action === 'set') {
      event = req.query;
      event = await req.app.get('event_ctrl').set_event(req.query.ID, event);
      nextURL = "/calendar/view?id=" + event["ID"] + "&msg=updated";
    }

    /* command: update event status to active */
    if (req.query.action === 'enable') {
      event = await req.app.get('event_ctrl').get_event(req.query.ID);
      event["Status"] = "Active";
      event = await req.app.get('event_ctrl').set_event(req.query.ID, event);
      nextURL = "/calendar/view?id=" + event["ID"] + "&msg=enabled";
    }

    /* command: update event status to deleted */
    if (req.query.action === 'disable') {
      event = await req.app.get('event_ctrl').get_event(req.query.ID);
      event["Status"] = "Deleted";
      event = await req.app.get('event_ctrl').set_event(req.query.ID, event);
      nextURL = "/calendar/view?id=" + event["ID"] + "&msg=disabled";
    }

    /* redirect to next URL */
    res.redirect(nextURL);
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* return the new router */
module.exports = router;

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
    res.locals.target   = '/calendar/xnew';
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
    res.locals.target   = '/calendar/xview';
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
    res.locals.target   = '/calendar/xupdate';
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
    event = await req.app.get('event_ctrl').clone_event(req.query.id);

    /* parameters to be passed to the HTML renderer */
    res.locals.calendar = 'active';
    res.locals.mode     = 'clone';
    res.locals.target   = '/calendar/xclone';
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
    res.locals.target   = '/calendar/xdelete';
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
    res.locals.target   = '/calendar/xrestore';
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

/* Submit button clicked for event-add form */
router.get('/xnew', async function(req, res, next) {
  try {
    /* variable to hold requested event */
    var event;

    /* add new event to database */
    event = await req.app.get('event_ctrl').add_event(req.query);

    /* redirect to another page */
    res.redirect("/calendar/view?id=" + event["ID"]);
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Submit button clicked for event-view form */
router.get('/xview', async function(req, res, next) {
  try {
    /* variable to hold requested event */
    var event;

    /* get specific event by ID */
    event = await req.app.get('event_ctrl').get_event(req.query.ID);

    /* redirect to another page */
    res.redirect("/calendar/" + req.query.action + "?id=" + event["ID"]);
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Submit button clicked for event-update form */
router.get('/xupdate', async function(req, res, next) {
  try {
    /* variable to hold requested event */
    var event;

    /* update existing event to database */
    event = await req.app.get('event_ctrl').set_event(req.query.ID,req.query);

    /* redirect to another page */
    res.redirect("/calendar/view?id=" + event["ID"]);
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Submit button clicked for event-clone form */
router.get('/xclone', async function(req, res, next) {
  try {
    /* variable to hold requested event */
    var event;

    /* add new event to database */
    event = await req.app.get('event_ctrl').add_event(req.query);

    /* redirect to another page */
    res.redirect("/calendar/view?id=" + event["ID"]);
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Submit button clicked for event-delete form */
router.get('/xdelete', async function(req, res, next) {
  try {
    /* variable to hold requested event */
    var event;

    /* get the required event by ID */
    event = await req.app.get('event_ctrl').get_event(req.query.ID);

    /* update event status */
    event["Status"] = "Deleted";

    /* update the required event */
    event = await req.app.get('event_ctrl').set_event(req.query.ID,event);

    /* redirect to another page */
    res.redirect("/calendar/view?id=" + event["ID"]);
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* Submit button clicked for event-restore form */
router.get('/xrestore', async function(req, res, next) {
  try {
    /* variable to hold requested event */
    var event;

    /* get the required event by ID */
    event = await req.app.get('event_ctrl').get_event(req.query.ID);

    /* update event status */
    event["Status"] = "Active";

    /* update the required event */
    event = await req.app.get('event_ctrl').set_event(req.query.ID,event);

    /* redirect to another page */
    res.redirect("/calendar/view?id=" + event["ID"]);
  } catch (err) {
    /* passes errors into the error handler */
    return next(err);
  }
});

/* return the new router */
module.exports = router;

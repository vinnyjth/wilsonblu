var Action = require('../models/Action');
var ScheduledEvent = require('../models/ScheduledEvent');
/**
 * GET /skynet
 * Home skynet page.
 */
exports.index = function(req, res) {
  res.render('skynet_home', {
    title: 'Home'
  });
};

/**
 * GET /skynet/status
 * Status skynet page.
 * Meant to be called via ajax
 */
exports.getSkynetStatus = function(req, res) {
  status = conn.status(function(data){
    currStatus = data.meshblu[0].toUpperCase() + data.meshblu.slice(1);
    res.json({status: currStatus});
  });
};

exports.getSkynetSchedule = function(req, res) {
  ScheduledEvent.find({},{}, function(e, docs){
    res.render('skynet_schedule', {
      title: 'Schedule',
      events: docs
    });
  });
};

exports.getSkynetActionSearch = function(req, res) {
  termRegExp = new RegExp(req.params.term, 'i');
  Action.find({name: termRegExp }, {}, function(e, docs){
    console.log(docs)
    res.json(docs)
  });
};

exports.postScheduledEvent = function(req, res) {

    // Get our form values. These rely on the "name" attributes
    var time = new Date(Date.parse(req.body.startdate));
    var name = req.body.name;
    var actions = [req.body.actions];
    console.log(time);

    // Submit to the DB
    event = new ScheduledEvent({
      name: name,
      time: time,
      action: actions

    });

    event.save(function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("schedule");
            // And forward to success page
            res.redirect("schedule");
        }
    });
};
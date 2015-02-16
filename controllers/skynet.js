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
  status = sky.status(function(data){
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
  var termRegExp = new RegExp(req.params.term, 'i');
  Action.find({name: termRegExp }, {}, function(e, docs){
    res.json(docs)
  });
};

exports.getSkynetActionPerform = function(req, res) {
  var id = req.params.action_id;
  Action.findById(id,function(e, doc){
    console.log(doc)
    doc.sendMessage();
    res.location('../actions');
    res.redirect('../actions');
  });
};

exports.getSkynetAction = function(req, res) {
  Action.find({}, {}, function(e, docs){
    res.render('skynet_actions', {
      actions: docs
    });
  });
};

exports.postScheduledEvent = function(req, res) {
    var time = new Date(Date.parse(req.body.startdate));
    var name = req.body.name;
    var actions = [req.body.actions];
    var event = new ScheduledEvent({
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
exports.postAction = function(req, res) {
    var name = req.body.name;
    var message = JSON.stringify(req.body.messages);
    var uuids = req.body.uuids;
    console.log(message)
    var action = new Action({
      name: name,
      action: {message:message, target_uuids:uuids}
    });

    action.save(function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("actions");
            // And forward to success page
            res.redirect("actions");
        }
    });
};

sky.on('message', function(channel, message){
  console.log('message received', channel, message);
});

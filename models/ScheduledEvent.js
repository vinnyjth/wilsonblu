var mongoose = require('mongoose');

var scheduledEventSchema = new mongoose.Schema({
  name: String,
  time: Date,
  interval: {
    minutes: Number,
    hours: Number,
    days: Number
  },
  action: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Action' }]
});

module.exports = mongoose.model('ScheduledEvent', scheduledEventSchema);

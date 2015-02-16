var mongoose = require('mongoose');

var actionSchema = new mongoose.Schema({
  name: String,
  description: String,
  action: {
    target_uuids: Array,
    message: String,
  }
});

actionSchema.methods.getAction = function(){
  return {
    target_uuids: this.action.target_uuids,
    message: JSON.parse(this.action.message)
  };
};

actionSchema.methods.sendMessage = function(){
  sky.message({
    "devices": this.action.target_uuids,
    "payload": JSON.parse(this.action.message),
    "qos": 0
  });
};

module.exports = mongoose.model('Action', actionSchema);

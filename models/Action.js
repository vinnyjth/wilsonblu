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

module.exports = mongoose.model('Action', actionSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./models");

for(var m in models){
  mongoose.model(m,new Schema(models[m]),m);
}
module.exports = {
  getModel: function(modelname){
    return _getModel(modelname);
  }
};
var _getModel = function(modelname){
  return mongoose.model(modelname);
};


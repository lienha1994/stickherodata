'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema(
{
	id: {
	type: String
  },
  name: {
    type: String,
    required: 'Kindly enter the your name1'
  },
  scoreluague1: 
  {
	  type :Number
  },
  scoreluague2: 
  {
	  type :Number
  },
  scoreluague3: 
  {
	  type :Number
  },scoreluague4: 
  {
	  type :Number
  },scoreluague5: 
  {
	  type :Number
  }
});

module.exports = mongoose.model('leaderboard', TaskSchema);
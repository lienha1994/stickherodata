'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('leaderboard');

exports.list_all_leaderboards = function(req, res) {
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
  
};

exports.list_top_luage1 = function(req, res) {
	
  var query = Task.find({}).sort({ scoreluague1: -1 } ).limit(2);
  query.exec(function(err,data){
	if (err)
      res.send(err);
    res.json(data);
   //console.log(data)
  });
  
};




exports.create_one_leaderboard = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_leaderboard = function(req, res) {
  Task.findById(req.params.id, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_leaderboard = function(req, res) {
  Task.findOneAndUpdate({id: req.params.id}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_leaderboard = function(req, res) {


  Task.remove({
    id: req.params.id
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};

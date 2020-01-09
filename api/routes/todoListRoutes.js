'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoListController');

  // todoList Routes
  app.route('/leaderboard')
    .get(todoList.list_all_leaderboards)
    .post(todoList.create_one_leaderboard);
	
	app.route('/leaderboard/top10')
	.get(todoList.list_top_luage1);


  app.route('/leaderboard/:id')
    .get(todoList.read_a_leaderboard)
    .put(todoList.update_a_leaderboard)
    .delete(todoList.delete_a_leaderboard);
};
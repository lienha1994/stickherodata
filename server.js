var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose');
  mongoose.Promise = global.Promise;
 // Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  port = process.env.PORT || 3000,
  users = {};
  server.listen(port);
 // io.set('transports', ['websocket']);

  var db = mongoose.connection;
  
  mongoose.connect('mongodb://127.0.0.1:27017/local')
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function (callback) {
      console.log('Connected to Databse');
      //require('./gameserver.js')(io, db, mongoose, log)
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.listen(port);

console.log('todo list RESTful API server started on: ' + port);

/****/
io.on('connection', function(socket){
  console.log('Client connected');
  //socket.emit('getScoreLuague');
  // Receive event insertdata
   socket.on('insertdata', function(data) 
          {
            if(data !== ""){
              //var _array = data.toString().split(",");
              console.log("name: " + data.name);
            }
          //---- check data đã có hay chưa .
             db.collection('leaderboard').findOne({name: data.name}, (err, item) => {
                   if(item == null) 
                   {
                    console.log("khong co data nao co ten nhu the dau");
                     db.collection('leaderboard').insertOne(data, function (err,res) {
                       //neu xay ra loi
                       if (err) throw err;
                       //neu khong co loi
                        console.log('Them thanh cong');
                      });        
                   }
                   else 
                   {
                      var _myquery = { name: data.name };
                      var _newfield = { $set: {scoreLeague1: data.scoreLeague1} };
                      // query update document
                      db.collection('leaderboard').updateOne(_myquery,_newfield, function(err, res) {
                          if (err) throw err;
                          console.log("1 document updated");
                          //db.close();
                         });
                    // console.log("co data r . m co muon update du lieu hay k");
                   }
                })
          });
   //----------------------------------------------
    /// get top leagues
   //----------------------------------------------
   socket.on("getleauge1",function(data) 
   {    
    //socket.emit('getScoreLuague',{"name": "acc"});
      var query =   db.collection('leaderboard').find({}).sort({ scoreLeague1: -1} ).limit(10);
      //console.log(query);
      query.forEach(row => {
        console.log(row);
         socket.emit('getScoreLuague',row);
        });
      // query.toArray(function(err,data)
      // {
      //   if(err) throw err;     
      //   console.log(data);
      //    // socket.emit('getScoreLuague', data);        
      // });
   });
})
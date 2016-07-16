var express = require('express');
var app = require('../app');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'NullSpeak',
    mainTopic: mainTopic
  });
});
// var sql = require('mysql');
// var connection = sql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'discussion'
// });

console.log(app.test);
// app.connection.connect();
//
// app.connection.query("SELECT TOPIC FROM main_topic WHERE QUEUE_NUM='0'", function(err, rows, fields){
//   //if(err);
//
//   mainTopic = rows[0].TOPIC;
// });
// app.connection.end();


module.exports = router;

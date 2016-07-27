var express = require('express');
var router = express.Router();
var session = require('express-session');
var sessionOptions = {
  secret: 'N020dyL12t3n2',
  resave: true,
  saveUninitialized: false
};
var connection = require('./connection');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(!req.session.test){
    req.session.test = "TESTING SESSIONS - Init";
  }else{
    req.session.test = "TESTING SESSIONS - Remain";
  }
  res.render('index', {
    title: 'NullSpeak - Main',
    mainTopic: mainTopic,
    test: req.session.test
  });
});

connection.connect.connect();

connection.connect.query(
    "SELECT TOPIC FROM main_topic WHERE QUEUE_NUM='0'",
    function(err, rows, fields){
  //if(err);

  mainTopic = rows[0].TOPIC;
  module.exports.mainTopic = mainTopic;
});
connection.connect.end();

module.exports = router;
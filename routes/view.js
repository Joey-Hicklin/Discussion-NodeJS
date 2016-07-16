var express = require('express');
var router = express.Router();
var connection = require('./connection');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'NullSpeak - View',
        mainTopic: mainTopic
    });
});

connection.connect.connect();

connection.connect.query("SELECT TOPIC FROM main_topic WHERE QUEUE_NUM='0'", function(err, rows, fields){
    //if(err);

    mainTopic = rows[0].TOPIC;
});
connection.connect.end();


module.exports = router;
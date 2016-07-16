var express = require('express');
var router = express.Router();
var index = require('./index');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('view', {
        title: 'NullSpeak - View',
        mainTopic: index.mainTopic
    });
});

module.exports = router;
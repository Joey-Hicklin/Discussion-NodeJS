var express = require('express');
var router = express.Router();
var index = require('./index');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.session.test){
        req.session.test = "TESTING SESSIONS - Init";
    }else{
        req.session.test = "TESTING SESSIONS - Remain";
    }
    res.render('view', {
        title: 'NullSpeak - View',
        mainTopic: index.mainTopic,
        test: req.session.test
    });
});

module.exports = router;
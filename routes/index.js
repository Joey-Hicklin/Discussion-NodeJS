require('../views/js/script');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  // create loggedIn cookie
  if(!req.cookies.loggedIn){
    res.cookie("loggedIn" , 0, {expire : new Date() + (86400*30)});
  }

  res.render('index', {
    title: 'NullSpeak - Main',
    mainTopic: mainTopic,
    test: req.cookies.loggedIn
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
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : "instance-api.cdclb4jct1js.us-east-1.rds.amazonaws.com",
  user     : "admin",
  password : "admin973",
  port     : 3306,
  database : "testAPI"
});

var list_matieres;
connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database.');
  connection.query("SELECT * from matieres", function(err, result, fields){
    connection.on('error', function(err) {
      console.log("[mysql error]",err);
    });
  list_matieres = result;
  });
});
  
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/rds', function(req, res, next) {
  res.send(JSON.stringify(list_matieres));
});

router.get('/s3', function(req, res, next) {
  res.send('respond of s3');
});

module.exports = router;

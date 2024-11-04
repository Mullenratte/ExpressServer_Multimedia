var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('entropy', { title: "Aufgabe 2: Häufigkeitsverteilung"});
});

module.exports = router;

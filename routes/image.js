var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('image', { title: 'Bild 2: Canvas', showResult: false });
});
module.exports = router;

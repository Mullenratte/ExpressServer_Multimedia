var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('entropy', { title: "Aufgabe 2: Häufigkeitsverteilung", calculateResult: false});
});

router.post('/', function(req, res){
  var text = req.body.inputText;
  var originalText = text;
  var totalCharacters = text.length;

  var alphabet = new Map();
  for (let i = 97; i < 123; i ++){
    alphabet.set(i, 0);
  }

  for (let char of text){
    char = char.toLowerCase();
    if (/[a-z]/.test(char)){
      alphabet.set(char.charCodeAt(0), alphabet.get(char.charCodeAt(0)) + 1);
    }
  }

  var absolute = new Array(26);
  for (let i = 0; i < absolute.length; i++){
    absolute[i] = alphabet.get(i + 97);
  }

  var relative = new Array(26);
  for (let i = 0; i < relative.length; i++){
    relative[i] = alphabet.get(i + 97) / totalCharacters;
  }

  var informationContent = new Array(26);
  for (let i = 0; i < informationContent.length; i++){
    informationContent[i] = relative[i] > 0 ? Math.log2(1/relative[i]) : "-";
  }

  res.render('entropy', { title: "Aufgabe 2: Häufigkeitsverteilung", calculateResult: true, originalText: originalText, absolute: absolute, relative: relative, informationContent: informationContent})
});

module.exports = router;

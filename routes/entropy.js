var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('entropy', { title: "Aufgabe 2: Häufigkeitsverteilung", calculateResult: false});
});

router.post('/', function(req, res){
  var text = req.body.inputText;
  var originalText = text;
  var textCharacters = text.toLowerCase().match(/[a-zäöü]+/g).join('');
  var totalChars = textCharacters.length;

  var absolute = new Array(29).fill(0);
  for (let i = 0; i < textCharacters.length; i++){
    let charCode = textCharacters.charCodeAt(i);

    switch (charCode) {
      case 228:
        absolute[26]++;
        break;
      case 246:
        absolute[27]++;
        break;
      case 252:
        absolute[28]++;
        break;
      default:
        absolute[charCode - 97] += 1;
        break;
    }
  }

  var relative = [...absolute];
  for (let i = 0; i < relative.length; i++){
    relative[i] /= totalChars;
  }

  var informationContent = new Array(29);
  for (let i = 0; i < informationContent.length; i++){
    informationContent[i] = relative[i] > 0 ? Math.log2(1/relative[i]) : 0;
  }

  res.render('entropy', { title: "Aufgabe 2: Häufigkeitsverteilung", calculateResult: true, originalText: originalText, absolute: absolute, relative: relative, informationContent: informationContent})
});

module.exports = router;

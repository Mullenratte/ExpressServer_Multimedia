var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('entropy', { title: "Aufgabe 2: Häufigkeitsverteilung", calculateResult: false});
});

router.post('/', function(req, res){
  var text = req.body.inputText.toLowerCase();
  var originalText = text;
  var textCharacters = text.match(/[a-zäöü]+/g).join('');
  var totalCharacters = textCharacters.length;

  var absolute = new Array(29).fill(0);
  for (let i = 0; i < textCharacters.length; i++){
    let charCode = textCharacters.charCodeAt(i);
    console.log(charCode);

    switch (charCode) {
      case 252:
        console.log("found a ü")
        absolute[28] += 1;
        break;
      case 228:
        console.log("found a ä")

        absolute[26] += 1;
        break;
      case 246:
        absolute[27] += 1;
        console.log("found a ö")
        break;
      default:
        absolute[charCode - 97] += 1;
        break;
    }
  }

  var relative = new Array(29);
  for (let i = 0; i < relative.length; i++){
    relative[i] = absolute[i] / totalCharacters;
  }

  var informationContent = new Array(29);
  for (let i = 0; i < informationContent.length; i++){
    informationContent[i] = relative[i] > 0 ? Math.log2(1/relative[i]) : 0;
  }

  res.render('entropy', { title: "Aufgabe 2: Häufigkeitsverteilung", calculateResult: true, originalText: originalText, absolute: absolute, relative: relative, informationContent: informationContent})
});

module.exports = router;

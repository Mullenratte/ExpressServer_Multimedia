var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('caesar', { title: 'Aufgabe 3: Caesar-Cipher', showResult: false });
});

router.post('/', (req, res) => {
  var text = req.body.inputText;
  const originalText = text;
  console.log(req.body)
  var shift = parseInt(req.body.shift);
  if (req.body.bruteForce != undefined){
    shift = getBruteForceKey(text);
    console.log("BRUTE FORCE KEY IS: " + shift);
  }
  
  var shiftedText = applyKeyToText(text, shift); 

  var altShift = shift < 0 ? shift + 26 : shift -26;
  res.render('caesar', { title: 'Aufgabe 3: Caesar-Cipher', showResult: true, originalText: originalText, shiftedText: shiftedText, shift: shift, altShift: altShift })
});

function getBruteForceKey(text){
  var textCharacters = text.match(/[A-Za-z]+/g).join('');
  var absolute = new Array(52).fill(0);

  // fülle erste Hälfte des Arrays mit Anzahl Großbuchstaben, zweite Hälfte mit Anzahl Kleinbuchstaben
  for (let i = 0; i < textCharacters.length; i++){
    let charCode = textCharacters.charCodeAt(i);
    let isSmallLetter = charCode >= 97;
    if (isSmallLetter){
      absolute[charCode - 71] += 1;
    } else{
      absolute[charCode - 65] += 1;
    }
  }
  
  let indexOfMostCommon = absolute.indexOf(Math.max(...absolute));
  let diff;
  // wenn in erster Hälfte -> Berechne Entfernung zu 'E'; wenn in zweiter Hälfte -> Berechne Entfernung zu 'e'
  if (indexOfMostCommon <= 25){
    diff = 69 - (indexOfMostCommon + 65);
  } else{
    diff = 101 - (indexOfMostCommon + 71);
  }

  return diff;
}

function applyKeyToText(text, shift) {
  if (shift < 0){
    shift += 26;
  }
  var shiftedText = "";
  for(let i = 0; i < text.length; i++){
    if (text[i].match(/[A-Za-z]+/g) == null){
      shiftedText += text[i];
      continue;
    }
    let charCode = text.charCodeAt(i);

    let shiftedCode;
    // Großbuchstaben
    if (charCode <= 90){
      shiftedCode = (charCode + shift) <= 90 ? (charCode + shift) : 65 + ((charCode + shift) % 90 - 1);
    }
    // Kleinbuchstaben 
    else{
      shiftedCode = (charCode + shift) <= 122 ? (charCode + shift) : 97 + ((charCode + shift) % 122 - 1);
    }
    
    
    shiftedText += String.fromCharCode(shiftedCode);
  }
  return shiftedText;
}

module.exports = router;

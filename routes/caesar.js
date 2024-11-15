var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('caesar', { title: 'Aufgabe 3: Caesar-Cipher', showResult: false });
});

router.post('/', (req, res) => {
  var text = req.body.inputText;
  const originalText = text;
  
  var shift = parseInt(req.body.shift);
  if (req.body.bruteForce != undefined){
    shift = getBruteForceKey(text);
  }
  
  var shiftedText = applyKeyToText(text, shift); 
  res.render('caesar', { title: 'Aufgabe 3: Caesar-Cipher', showResult: true, originalText: originalText, shiftedText: shiftedText, shift: shift})
});

function getBruteForceKey(text){
  var extractedText = text.match(/[A-Za-z]+/g).join('');
  var absolute = new Array(52).fill(0);

  // fill first half with capital letters, seconds half with small letters
  for (let i = 0; i < extractedText.length; i++){
    let charCode = extractedText.charCodeAt(i);
    if (charCode >= 97){
      absolute[charCode - 71] += 1;
    } else{
      absolute[charCode - 65] += 1;
    }
  }
  
  let indexOfMostCommon = absolute.indexOf(Math.max(...absolute));

  // if most common letter is in first half -> calc dist to 'E' (69), else calc dist to 'e' (101)
  if (indexOfMostCommon < absolute.length / 2){
    return (69 - (indexOfMostCommon + 65));
  } else{
    return (101 - (indexOfMostCommon + 71));
  }
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

    let shiftedCode = (charCode + shift);
    // Großbuchstaben
    if (charCode <= 90 && shiftedCode > 90){
      shiftedCode = 64 + shiftedCode % 90;
    }
    // Kleinbuchstaben 
    else if (shiftedCode > 122){
      shiftedCode = 96 + shiftedCode % 122
    }
    
    
    shiftedText += String.fromCharCode(shiftedCode);
  }
  return shiftedText;
}

module.exports = router;

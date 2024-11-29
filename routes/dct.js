var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dct', { title: 'Bild 1: Discrete Cosine Transformation', showResult: false });
});

router.post('/', (req, res) => {
  const values = [...Object.values(req.body)];
  let results = new Array(values.length);
  for (let u = 0; u < 8; u++){
    for (let v = 0; v < 8; v++){
       results[u*8+v] = calcCoefficient(values, u, v);
    }
  }
  res.render('dct', { title: 'Bild 1: Discrete Cosine Transformation', showResult: true, results: results, originalMatrix: values});
});

function calcCoefficient(inputMatrix, u, v){
  const cU = u == 0 ? (1/Math.sqrt(2)) : 1;
  const cV = v == 0 ? (1/Math.sqrt(2)) : 1;
  const prefactor = (1/4) * cU * cV;

  let sum = 0;
  for (let j = 0; j < 8; j++){
    for (let k = 0; k < 8; k++){
      const inputValue = inputMatrix[j * 8 + k];
      sum += inputValue * Math.cos(((2 * j + 1) * u * Math.PI)/16) * Math.cos(((2 * k + 1) * v * Math.PI)/16);
    }
  }
 
  return (Math.round(prefactor * sum));
}

module.exports = router;

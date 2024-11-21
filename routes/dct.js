var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('dct', { title: 'Bild 1: Discrete Cosine Transformation', showResult: false });
});

router.post('/', (req, res) => {
  let inputMatrix;

  let bodyObj = JSON.parse(JSON.stringify(req.body));

  let values = [...Object.values(bodyObj)];
  let results = new Array(values.length);

  for (let j = 0; j < 8; j++){
    for (let k = 0; k < 8; k++){
       results[j*8+k] = calcCoefficient(values, j, k);
    }
  }

  console.log(results);

  res.render('dct', { title: 'Bild 1: Discrete Cosine Transformation', showResult: true, results: results, originalMatrix: values});
});

function calcCoefficient(inputMatrix, u, v){
  let cU = u == 0 ? (1/Math.sqrt(2)) : 1;
  let cV = v == 0 ? (1/Math.sqrt(2)) : 1;
  const prefactor = (1/4) * cU * cV;

  let sum = 0;
  for (let j = 0; j < 8; j++){
    for (let k = 0; k < 8; k++){
      sum += inputMatrix[j * 8 + k] * Math.cos(((2 * j + 1) * u * Math.PI)/16) * Math.cos(((2 * k + 1) * v * Math.PI)/16);
    }
  }

 
  return (Math.round(prefactor * sum));

  // z.B. für f = [3, 1]    wäre F(0, 0) = 1/2 * 1/2 * 1/2 * ((3 * 1/2 * 1/2) + (4 * 1/2 * 1/2) + (1 * 1/2 * 1/2) + (2 * 1/2 * 1/2)) = 5/16 = 0,3125
  //              [4, 2] 

}

module.exports = router;

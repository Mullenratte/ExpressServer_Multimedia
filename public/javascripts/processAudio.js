let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = document.getElementById('audio');
let analyser = audioCtx.createAnalyser();
let track = audioCtx.createMediaElementSource(audioElement);
let panSlider = document.getElementById('panSlider');
let panning = panSlider.value;
let stereoPanner = audioCtx.createStereoPanner(); 

track = track.connect(stereoPanner).connect(analyser).connect(audioCtx.destination);

let dataArray = new Uint8Array(analyser.frequencyBinCount);

document.getElementById('analyse').addEventListener('click', ()=>{
    analyser.getByteFrequencyData(dataArray);
    AnimateData(dataArray);
    console.log(dataArray);
});

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

document.getElementById('debug').addEventListener('click', () =>{
    console.log(stereoPanner.pan.value);
});

function UpdatePanning(){
    stereoPanner.pan.value = document.getElementById('panSlider').value;
}

function AnimateData(dataArray){
    for (let i = 0; i < analyser.frequencyBinCount; i++){
        ctx.fillRect(i * 10, canvas.height - 25, 1, canvas.height - dataArray[i]);
    }
    req = requestAnimationFrame(AnimateData);
}



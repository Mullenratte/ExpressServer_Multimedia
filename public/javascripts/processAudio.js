let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = document.getElementById('audio');
//let analyser = audioCtx.createAnalyser();
let track = audioCtx.createMediaElementSource(audioElement);
let panSlider = document.getElementById('panSlider');
let panning = panSlider.value;
let stereoPanner = new StereoPannerNode(audioCtx, {pan : 0}); 

track = track.connect(stereoPanner).connect(audioCtx.destination);

document.getElementById('panSlider').addEventListener('change', () =>{
    stereoPanner.pan.value = document.getElementById('panSlider').value;
    console.log(stereoPanner.pan.value)
})

document.getElementById('debug').addEventListener('click', () =>{
    console.log(stereoPanner.pan.value);
})

// function UpdatePanning(){
//     panning = document.getElementById('panSlider').value;
//     stereoPanner.pan.value = panning;
// }



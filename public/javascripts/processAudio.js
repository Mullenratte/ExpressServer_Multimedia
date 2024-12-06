let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = document.getElementById('audio');
let analyser = audioCtx.createAnalyser();
let track = audioCtx.createMediaElementSource(audioElement);
let stereoPanner = audioCtx.createStereoPanner(); 

track = track.connect(stereoPanner).connect(analyser).connect(audioCtx.destination);

HandleEventListeners(audioCtx);

// animation parameters
const colWidth = 2;
const canvasHeight = 510;
const canvasWidth = analyser.frequencyBinCount * colWidth;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.height = canvasHeight;
canvas.width = canvasWidth; 
const animColor_g = 33;
const animColor_b = 100;
const dataArray = new Uint8Array(analyser.frequencyBinCount);

function HandleEventListeners(audioCtx){
    document.getElementById('panSlider').addEventListener('click', UpdatePanning);

    document.getElementById('analyse').addEventListener('click', ()=>{
        AnimateData();
    });
    
    let toggleButton = document.getElementById('toggle');
    toggleButton.addEventListener('click', () =>{
        if (toggleButton.dataset.playing == "true"){
            audioCtx.suspend();
            audioElement.pause();
            toggleButton.dataset.playing = "false";
            toggleButton.value = "PLAY";
        } else{
            audioCtx.resume();
            audioElement.play();
            toggleButton.dataset.playing = "true";
            toggleButton.value = "PAUSE";
        }
    })
}

function UpdatePanning(){
    stereoPanner.pan.value = document.getElementById('panSlider').value;
}

function AnimateData(){
    ctx.fillStyle = 'rgba(99, 99, 99, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    analyser.getByteFrequencyData(dataArray);

    for (let i = 0; i < dataArray.length; i++){
        animColor_r = dataArray[i];
        ctx.fillStyle = 'rgba(' + animColor_r + ', ' + animColor_g + ', ' + animColor_b + ', 1)';

        ctx.fillRect(i * colWidth, canvas.height, colWidth, -dataArray[i]/255 * canvas.height);
    }

    requestAnimationFrame(AnimateData);    
}



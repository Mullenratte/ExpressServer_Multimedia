let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = document.getElementById('audio');
let analyser = audioCtx.createAnalyser();
let track = audioCtx.createMediaElementSource(audioElement);
let stereoPanner = audioCtx.createStereoPanner(); 

track = track.connect(stereoPanner).connect(analyser).connect(audioCtx.destination);

HandleEventListeners(audioCtx);

const colWidth = 2;
const canvasHeight = 510;
const canvasWidth = analyser.frequencyBinCount * colWidth;

function HandleEventListeners(audioCtx){
    document.getElementById('panSlider').addEventListener('click', UpdatePanning);
    document.getElementById('resetPan').addEventListener('click', ResetPanning);

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

function ResetPanning(){
    stereoPanner.pan.value = 0;
    document.getElementById('panSlider').value = 0;
}

function AnimateData(){
    const canvas = document.getElementById('canvas');
    canvas.height = canvasHeight;
    canvas.width = canvasWidth; 
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.66)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);


    for (let i = 0; i < dataArray.length; i++){
        const r = Math.max(dataArray[i], 80);
        const b = 100;
        ctx.fillStyle = 'rgba(' + r + ', 33, ' + b + ', 1)';

        ctx.fillRect(i * colWidth, canvas.height, colWidth, -dataArray[i]/255 * canvas.height);
    }

    requestAnimationFrame(AnimateData);    
}



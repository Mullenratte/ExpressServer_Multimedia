let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioElement = document.getElementById('audio');
let analyser = audioCtx.createAnalyser();
let track = audioCtx.createMediaElementSource(audioElement);
let panSlider = document.getElementById('panSlider');
let panning = panSlider.value;
let stereoPanner = audioCtx.createStereoPanner(); 

track = track.connect(stereoPanner).connect(analyser).connect(audioCtx.destination);


document.getElementById('analyse').addEventListener('click', ()=>{
    AnimateData();
});

document.getElementById('toggle').addEventListener('click', () =>{
    if (audioCtx.state == 'running'){
        audioCtx.suspend();
    } else if (audioCtx.state == 'suspended'){
        audioCtx.resume();
    }
})

document.getElementById('debug').addEventListener('click', () =>{
    console.log(stereoPanner.pan.value);
});

function UpdatePanning(){
    stereoPanner.pan.value = document.getElementById('panSlider').value;
}

function AnimateData(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const colWidth = 3;
    const spaceBetweenCol = 5;


    let dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    canvas.width = dataArray.length * colWidth + spaceBetweenCol; 
    console.log(canvas.width)

    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(254, 0, 0, 1)';

    for (let i = 0; i < dataArray.length; i++){
        ctx.fillRect(i * colWidth + spaceBetweenCol, canvas.height, colWidth, (-dataArray[i]/255) * canvas.height);
    }

    requestAnimationFrame(AnimateData);
    
}



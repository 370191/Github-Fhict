const {
    ExponentialSmoother
} = require('skqw-utils');

const {
    createCanvas,
    getSample,
    getDimensions
} = require('skqw-core');

let ctx;
let ctxBuffer;
let params = {
    hue: {
        value: 120,
        type: 'range',
        label: '🌈 kleur ',
        min: 0,
        max: 360
    },
    blur: {
        value: 0,
        type: 'range',
        label: '🌀 Effect lengte',
        min: 0,
        max: 20
    },
    ctxbuffermovex: {
        value: 0,
        type: 'range',
        label: '➡ Spoor richting',
        min: -10,
        max: 10,
        step: 1
    },
    ctxbufferx: {
        value: 1,
        type: 'range',
        label: '↔️ Spoor verspreiding',
        min: 1,
        max: 1.05,
        step: 0.001
    },
    ctxbuffermovey: {
        value: 0,
        type: 'range',
        label: '⬆ Spoor richting',
        min: -10,
        max: 10,
        step: 1
    },
    ctxbuffery: {
        value: 1,
        type: 'range',
        label: '↕️ Spoor verspreiding',
        min: 1,
        max: 1.05,
        step: 0.001
    },
    waveHeight: {
        value: 5,
        type: 'range',
        label: '〽 golf hoogte',
        min: 1,
        max: 10
    },
    wavesmoothness: {
        value: 0.3,
        type: 'range',
        label: '🐇💨 golf vloeiheid',
        min: 0.1,
        max: 1,
        step: 0.1
    },
    vollinewidth: {
        value: 8,
        type: 'range',
        label: '🎵 lijn dikte (reageert op volume)',
        min: 1,
        max: 20,
        step: 0.1
    },
};

let smoothness = new ExponentialSmoother(params.wavesmoothness.value);

const smoothmax = new ExponentialSmoother(0.1);
const smoothmid = new ExponentialSmoother(0.3);
const smoothlow = new ExponentialSmoother(0.8);
const smoothlowest = new ExponentialSmoother(1);

// █↓█↓█↓█↓█↓█↓█↓█↓█ Posenet spul █↓█↓█↓█↓█↓█↓█↓█↓█

var video = document.getElementById('video');
var canvas = document.getElementById('canvas');

// De gedetecteerde posities bevinden zich in een array
let poses = [];

// Maak een webcamopname
// if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//     navigator.mediaDevices.getUserMedia({
//         video: true
//     }).then(function (stream) {

//         //   MOET hieronder 'outcommenten' omdat error
//         //   video.srcObject=stream;
//         //   video.play();

//     });
// }

// Een functie is om de video en poses in het canvas te tekenen.
// Deze functie is onafhankelijk van het resultaat van posenet
// Op deze manier lijkt de video niet langzaam als poseNet
// geen posities detecteert.
function drawCameraIntoCanvas() {

    // Teken het video-element in het canvas
    // █ error █
    //ctx.drawImage(video, 0, 0, 640, 480);
    // █ error █

    // We kunnen beide functies aanroepen om alle sleutelpunten 
    // en de skeletten te tekenen
    drawKeypoints();
    drawSkeleton();
    window.requestAnimationFrame(drawCameraIntoCanvas);
}

// Lus over de functie drawCameraIntoCanvas
// drawCameraIntoCanvas();

// Maak een nieuwe poseNet-methode met een enkele detectie.
// █ error █
// const poseNet = ml5.poseNet(video, modelReady);
// poseNet.on('pose', gotPoses);
// █ error █

// Een functie die wordt aangeroepen telkens 
// wanneer er een update van het model is.
function gotPoses(results) {
    poses = results;
}

function modelReady() {
    console.log("model ready")
    poseNet.multiPose(video)
}

// Een functie om circels over de 
// gedetecteerde sleutelpunten te tekenen.

function drawKeypoints() {
    // Doorloop alle gedetecteerde poses
    for (let i = 0; i < poses.length; i++) {
        // Loop voor elke gedetecteerde pose door alle sleutelpunten
        for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
            let keypoint = poses[i].pose.keypoints[j];

            // Alleen een circel tekenen is de waarschijnlijkheid 
            // van de pose groter dan 0.2.
            if (keypoint.score > 0.2) {
                ctx.beginPath();
                ctx.arc(keypoint.position.x, keypoint.position.y, 10, 0, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }
}

// Een functie om de skeletten te tekenen
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {

// Loop door alle gedetecteerde skeletten
      for (let j = 0; j < poses[i].skeleton.length; j++) {
        let partA = poses[i].skeleton[j][0];
        let partB = poses[i].skeleton[j][1];
        ctx.beginPath();
        ctx.moveTo(partA.position.x, partA.position.y);
        ctx.lineTo(partB.position.x, partB.position.y);
        ctx.stroke();
      }
    }
  }

// █↑█↑█↑█↑█↑█↑█↑█↑█↑█ Posenet spul █↑█↑█↑█↑█↑█↑█↑█↑█↑█

function init() {
    ctx = createCanvas().getContext('2d');
    ctxBuffer = document.createElement('canvas').getContext('2d');
    resize();
}

function tick(skqw) {
    const {
        width,
        height
    } = getDimensions();
    const {
        ft,
        ts
    } = getSample();

    ctxBuffer.save();

    ctxBuffer.clearRect(-width / 2, -height / 2, width, height);
    ctxBuffer.globalAlpha = 0.75 + params.blur.value / 100;
    ctxBuffer.scale(params.ctxbufferx.value, params.ctxbuffery.value);

    //Spoor Richting
    ctxBuffer.drawImage(ctx.canvas, -width / 2 + params.ctxbuffermovex.value , -height / 2 + params.ctxbuffermovey.value);

    ctx.clearRect(-width / 2, -height / 2, width, height);
    ctx.drawImage(ctxBuffer.canvas, -width / 2, -height / 2);

    ctxBuffer.restore();

    drawWave(width, height, ts, ft);
}

function resize() {
    if (ctx) {
        let {
            width,
            height
        } = getDimensions();

        //ctx.lineCap = "butt" || "round" || "square";
        ctx.lineCap = 'butt';

        ctxBuffer.canvas.width = width;
        ctxBuffer.canvas.height = height;
        ctxBuffer.translate(width / 2, height / 2);

        ctx.translate(width / 2, height / 2);
        minDimension = Math.min(width, height);
    }
}

function drawWave(breedte, hoogte, ts, ft) {
    let vol = smoothness.sumAndProcess(ft);

    let punt1;
    let punt2;
    let middelpunt;
    let bins = smoothness.process(ts);

    // const length = ts.length;
    const interval = breedte / 250;

    //ctx.lineCap = "butt" || "round" || "square";
    ctx.lineCap = 'butt';

    ctx.strokeStyle = `hsla(${params.hue.value + 40}, 100%, 60%, 1)`;
    
    // Lijndikte krijgt de waarde van de volume gedeelt door 8
    // omdat het anders te dik is.
    ctx.lineWidth = vol / params.vollinewidth.value;

    // Hieronder wordt de HTML canvas quadraticCurveTo() Methode uitgevroerd 
    // https://www.w3schools.com/tags/canvas_quadraticcurveto.asp
    for (let i = 0; i < bins.length; i++) {
        const val = bins[i] * params.waveHeight.value * hoogte / 800;
        punt1 = linePoint(i, interval, val, hoogte, breedte);
        punt2 = linePoint(i + 1, interval, val, hoogte, breedte);
        if (i === 0) {
            ctx.beginPath();
            ctx.moveTo(punt1.x, punt1.y);
        } else {
            middelpunt = midPoint(punt1, punt2);
            ctx.quadraticCurveTo(punt1.x, punt1.y, middelpunt.x, middelpunt.y);
        }
    }
    ctx.stroke();
}

function linePoint(i, interval, val, height, width) {
    return {
        x: i * interval - width / 2,
        y: + val * 100
    };
}

function midPoint(punt1, punt2) {
    return {
        x: punt1.x + (punt2.x - punt1.x) / 2,
        y: punt1.y + (punt2.y - punt1.y) / 2
    };
}

module.exports = {
    name: 'Amplitude',
    init,
    tick,
    params
};
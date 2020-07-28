const {
    ExponentialSmoother
} = require('skqw-utils');
const {
    createCanvas,
    getSample,
    getDimensions
} = require('skqw-core');

/**
 * A pretty simple visualization.
 *
 * Author: Michael Bromley
 * Version: 1
 */
let ctx;
let ctxBuffer;
let params = {
    hue: {
        value: 120,
        type: 'range',
        label: 'hue',
        min: 0,
        max: 360
    },
    blur: {
        value: 19,
        type: 'range',
        label: 'Blur',
        min: 0,
        max: 20
    },
    waveHeight: {
        value: 3,
        type: 'range',
        label: 'Wave Height',
        min: 1,
        max: 10
    },
};

const smoothmax = new ExponentialSmoother(0.1);
const smoothmid = new ExponentialSmoother(0.3);
const smoothlow = new ExponentialSmoother(0.8);
const smoothlowest = new ExponentialSmoother(1);

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

    // buffer.unshift(ts);
    // if (DELAY * 2 + 2 < buffer.length) {
    //     buffer.pop();
    // }


    ctxBuffer.save();

    ctxBuffer.clearRect(-width / 2, -height / 2, width, height);
    ctxBuffer.globalAlpha = 0.79 + params.blur.value / 100;
    ctxBuffer.scale(1.005, 1.02);
    ctxBuffer.drawImage(ctx.canvas, -width / 2, -height / 2 + 5);
    
    ctx.clearRect(-width / 2, -height / 2, width, height);
    ctx.drawImage(ctxBuffer.canvas, -width / 2, -height / 2 + 1);

    ctxBuffer.restore();

    // ctx.globalCompositeOperation = 'source-over';
    // drawBg(width, height, ft);
    



    // ctx.globalCompositeOperation = 'screen';
    // //drawBars(width, height, ft);
    // ctx.globalCompositeOperation = 'source-over';
    drawWave(width, height, ts, ft);
}

function resize() {
    if (ctx) {
        let {
            width,
            height
        } = getDimensions();

        //ctx.lineCap = "butt" || "round" || "square";
        ctx.lineCap = 'round';

        ctxBuffer.canvas.width = width;
        ctxBuffer.canvas.height = height;
        ctxBuffer.translate(width / 2, height / 2);
        // ctx.lineWidth = width / 600;
        ctx.translate(width / 2, height / 2);
        minDimension = Math.min(width, height);
    }
}

function drawBg(breedte, hoogte, ft) {
    // const smoothmax = new ExponentialSmoother(0.1);
    // const smoothmid = new ExponentialSmoother(0.3);
    // const smoothlow = new ExponentialSmoother(0.8);
    // const smoothlowest = new ExponentialSmoother(1);
    let vol = smoothmid.sumAndProcess(ft);

    const gradient = ctx.createLinearGradient(0, 0, 0, hoogte);
    gradient.addColorStop(0, `hsla(${params.hue.value + 50}, 50%, 5%, 0.3)`);
    gradient.addColorStop(1, `hsla(${params.hue.value + 50}, 100%, ${Math.log10(vol / 2 + 2) * 10}%, 0.8)`);
    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, breedte, hoogte)
}

function drawWave(breedte, hoogte, ts, ft) {
    let vol = smoothmid.sumAndProcess(ft);

    let punt1;
    let punt2;
    let middelpunt;
    let bins = smoothmid.process(ts);

    // const length = ts.length;
    const interval = breedte / 250;

    //ctx.lineCap = "butt" || "round" || "square";
    ctx.lineCap = 'butt';

    ctx.strokeStyle = `hsla(${params.hue.value + 40}, 100%, 60%, 1)`;
    ctx.lineWidth = vol / 8;

    
    // console.log(vol);
    // const smoothmax = new ExponentialSmoother(0.1);
    // const smoothmid = new ExponentialSmoother(0.3);
    // const smoothlow = new ExponentialSmoother(0.8);
    // const smoothlowest = new ExponentialSmoother(1);

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

    // ctx.fillStyle = 'rgba(255,255,255,1)';
    // ctx.fillRect(50,50,75,50);
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
    //resize
};
//bron: Average Color Movie playback - p5.js | https://editor.p5js.org/hafiyyandi/sketches/SkaH7JrJG
//bron: Video Capture - https://p5js.org/examples/dom-video-capture.html

let capture;

let lastTimeCheck = 0;
let sampelsnelheid = 1000; // how fast the sketch
                       // samples the video's color
let tekenIndex = 0;
let lineWeight = 10;

let blackBar = 0; //fill this number if the video has black bars

function setup() {
  createCanvas(640, 360);
  capture = createCapture(VIDEO);
  capture.size(640, 360);
}

function draw() {
  let redTotal = 0;
  let blueTotal = 0;
  let greenTotal = 0;

  noStroke();
  //background(0);

  capture.loadPixels();
  for (let cx = 0; cx < capture.width; cx ++) {
    for (let cy = 0; cy < capture.height; cy ++) {

      if (cy > blackBar && cy < capture.height - blackBar) {
        let offset = int(((cy * capture.width) + cx) * 4);
        let redc = capture.pixels[offset];
        let greenc = capture.pixels[offset + 1];
        let bluec = capture.pixels[offset + 2];

        redTotal += redc;
        //console.log(redTotal);
        greenTotal += greenc;
        blueTotal += bluec;

        fill(redc, greenc, bluec);

      }
    }
  }

  let redAvg = int(redTotal / (capture.width * capture.height));
  let greenAvg = int(greenTotal / (capture.width * capture.height));
  let blueAvg = int(blueTotal / (capture.width * capture.height));

  if (millis() - lastTimeCheck > sampelsnelheid) {
    console.log(redAvg + "," + greenAvg + "," + blueAvg);
    fill(redAvg, greenAvg, blueAvg);
    noStroke();
    rect(tekenIndex * lineWeight, 0, lineWeight, height);
    tekenIndex++;
    lastTimeCheck = millis();
  }
}
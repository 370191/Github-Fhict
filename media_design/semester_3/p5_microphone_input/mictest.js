// let betekent een constante variabel
let mic;
var volhistory = [];

function preload() {}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);

  mic = new p5.AudioIn(); //Nieuwe object van p5 AudioIn genaamd mic
  mic.stop();
  mic.start();
}



function draw() {

  //Kleur van achtergrond
  background(0);

  var vol = mic.getLevel();
  volhistory.push(vol);

  var upscale = vol * 200;

  strokeWeight(2);


  //strokeWeight(1 + upscale);


  stroke(255);
  noFill();

  translate(window.innerWidth / 2, window.innerHeight / 2);



  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 450, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 420, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 390, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 360, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 330, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 300, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 270, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 240, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 210, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 180, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 150, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 120, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 90, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();
  beginShape();
  for (var i = 0; i <= 360; i++) {
    var r = map(volhistory[i], 0, 1, 60, 500);
    var x = r * cos(i);
    var y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
}


function scaleValue(value, from, to) {
  var scale = (to[1] - to[0]) / (from[1] - from[0]);
  var capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
  return ~~(capped * scale + to[0]);
}
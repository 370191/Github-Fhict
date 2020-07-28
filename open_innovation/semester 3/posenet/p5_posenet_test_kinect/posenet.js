let video;
let poseNet;
let poses = [];
var capture;
var options;

let afstand;

//gezicht keypoints variables 
let neusx = 0;
let neusy = 0;
let linkeroogx;
let linkeroogy;
let rechteroogx;
let rechteroogy;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);



  ////////////////////////////// Apparatenlijst in console
  
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    console.log("enumerateDevices() not supported.");
    return;
  }

  navigator.mediaDevices.enumerateDevices()
    .then(function (devices) {
      devices.forEach(function (device) {
        console.log(device.kind + ": " + device.label +
          " id = " + device.deviceId);
      });
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });

  ////////////////////////////// Apparatenlijst in console



  kinect = {
    video: {
      devicelebel: "Kinect V2 Video Sensor (045e:02c4)"    
    }
  }

  video = createCapture(kinect);
  video.size(width, height);

  // Hide the video element, and just show the canvas
  video.hide();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
}

// function getfaces(poses) {
//   // console.log(poses);
//   if (poses.length > 0) {
//     neusx = poses[0].pose.keypoints[0].position.x;
//     neusy = poses[0].pose.keypoints[0].position.y;

//     linkeroogx = poses[0].pose.keypoints[1].position.x;
//     linkeroogy = poses[0].pose.keypoints[1].position.y;

//     rechteroogx = poses[0].pose.keypoints[2].position.x;
//     rechteroogy = poses[0].pose.keypoints[2].position.y;
//   }
// }

function drawfaces() {

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {

    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    // A keypoint is an object describing a body part (like rightArm or leftShoulder)
    neusx = pose.keypoints[0].position.x;
    neusy = pose.keypoints[0].position.y;

    linkeroogx = pose.keypoints[1].position.x;
    linkeroogy = pose.keypoints[1].position.y;

    rechteroogx = pose.keypoints[2].position.x;
    rechteroogy = pose.keypoints[2].position.y;

    let afstand = dist(neusx, neusy, linkeroogx, linkeroogy);

    draweye(linkeroogx, linkeroogy, afstand, 0);
    draweye(rechteroogx, rechteroogy, afstand, 0);

    fill(255, 0, 0); //kleur rodeneus
    ellipse(neusx, neusy, afstand);
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
  background(0, 220);

  // We can call both functions to draw all keypoints and the skeletons
  //drawKeypoints();
  drawSkeleton();
  drawfaces();
}

function draweye(x, y, size, n) {
  let angle = frameCount * 0.2;

  fill(255); //oogwit kleur
  noStroke();
  ellipse(x, y, size, size); //oogvorm

  fill(0); //pupil kleur
  noStroke();
  ellipse(x, y, size / 2, size / 2); // pupil vorm
  fill(255); //oogwit kleur
  noStroke();
  ellipse(x + cos(angle * n) * size / 5, y + sin(angle * n) * size / 5, size / 4, size / 4);
}


// A function to draw ellipses over the detected keypoints
function drawKeypoints() {

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {

    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {

      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];

      //Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.9) {
        fill(255, 255, 255);
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {

  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;

    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 255, 255);
      strokeWeight(10)
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}



// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */


// Keypoints
// All keypoints are indexed by part id. The parts and their ids are:

// Id	Part
// 0	nose
// 1	leftEye
// 2	rightEye
// 3	leftEar
// 4	rightEar
// 5	leftShoulder
// 6	rightShoulder
// 7	leftElbow
// 8	rightElbow
// 9	leftWrist
// 10	rightWrist
// 11	leftHip
// 12	rightHip
// 13	leftKnee
// 14	rightKnee
// 15	leftAnkle
// 16	rightAnkle
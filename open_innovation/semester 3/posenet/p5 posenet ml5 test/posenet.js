let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eye1X, eye1Y, eye2X, eye2Y;

// audioinput: Standaard - Microfoonmatrix (Xbox NUI Sensor) (045e:02c4) id = default
// input.js:23 audioinput: Communicatie - Microfoonmatrix (Xbox NUI Sensor) (045e:02c4) id = communications
// input.js:23 audioinput: Microfoonmatrix (Xbox NUI Sensor) (045e:02c4) id = 05b07ddb9c0660dd7fee9e09c74640ea62e244276d2fab6515198e10e4507ba5
// input.js:23 audioinput: Stereo-mix (Realtek High Definition Audio) id = f5a00f7e9b467f503b25dd367f8bf2664c2478dcbb701089a90980f8131e270d
// input.js:23 audioinput: Line 2 (Virtual Audio Cable) id = 96d4a5758eed7bbb56f044f512a2dd90285d108a4a54ce462693671b6941d471
// input.js:23 audioinput: CABLE Output (VB-Audio Virtual Cable) id = 88bc25f9021ae55b5e1418090790ea35b4d1325c07d7a6daa755a1fc8b2cc620
// input.js:23 audioinput: Microfoonmatrix (Realtek High Definition Audio) id = b58834e37d68ad10e26b63b05ab1d2b7b846c4327b2ab80c2232439f9175f0f7
// input.js:23 audioinput: Line 1 (Virtual Audio Cable) id = 903d5ae28ffd6e302b64a7132d257afba2e0fcf77f70b502ed80e9b9d312fa5d
// input.js:23 videoinput: HP Wide Vision HD Camera (05c8:03ab) id = b4821a7520c54112ab9c32b2766b1c581a5be520271fdb9aeca65e28c2b61fb8
// input.js:23 videoinput: Kinect V2 Video Sensor (045e:02c4) id = 4ff9b4bac2f706cde6e278fc3f31320aa8e52c58faf8b33a98f78848a2e8384a
// input.js:23 audiooutput: Standaard - luidspreker/Hoofdtelefoon (Realtek High Definition Audio) id = default
// input.js:23 audiooutput: Communicatie - Line 2 (Virtual Audio Cable) id = communications
// input.js:23 audiooutput: CABLE Input (VB-Audio Virtual Cable) id = bef13c32bd46aaadd38144b09471825f6224f4bc5a1df09aac8e428573d840a6
// input.js:23 audiooutput: PHL 258B6QU (NVIDIA High Definition Audio) id = 1a1ba00d4c50d74cc03dad3a910a4f83bf719cb9a2e8eef42f7f2b5ce38d93c1
// input.js:23 audiooutput: luidspreker/Hoofdtelefoon (Realtek High Definition Audio) id = 8a5228ddc41029f57c30454b51a9e199bbe01ae287e860350e4fcfc35916de1f
// input.js:23 audiooutput: Line 1 (Virtual Audio Cable) id = 62c0b3c78464bea3b48e91b68fcf5f0c631ed8d39697facef22489829c637321
// input.js:23 audiooutput: Line 2 (Virtual Audio Cable) id = 7d31a17f36b7eba2f4718a72ee92c7b43bc58ee888a7e98c540017f7740c356f

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose', gotPoses);
}


//call the list of cameras 
function gotDevices(deviceInfos) {
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind == "videoinput") {
            console.log(deviceInfo);
        }
    }
}


function gotPoses(poses) {
    // console.log(poses);
    if (poses.length > 0) {
        noseX = poses[0].pose.keypoints[0].position.x;
        noseY = poses[0].pose.keypoints[0].position.y;

        eye1X = poses[0].pose.keypoints[1].position.x;
        eye1Y = poses[0].pose.keypoints[1].position.y;

        eye2X = poses[0].pose.keypoints[2].position.x;
        eye2Y = poses[0].pose.keypoints[2].position.y;
    }
}

function modelReady() {
    console.log('model ready');
}

function draw() {
    image(video, 0, 0);

    let afstand = dist(noseX, noseY, eye1X, eye1Y);


    fill(255, 0, 0);
    ellipse(noseX, noseY, afstand);

    eye(eye1X, eye1Y, afstand, 0);
    eye(eye2X, eye2Y, afstand, 0);
}

function eye(x, y, size, n) {
    let angle = frameCount * 0.2;

    fill(255);
    noStroke();
    ellipse(x, y, size, size);

    fill(0);
    noStroke();
    ellipse(x + cos(angle * n) * size / 5, y + sin(angle * n) * size / 5, size / 2, size / 2);
}

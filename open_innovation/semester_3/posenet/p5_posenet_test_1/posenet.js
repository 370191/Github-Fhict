let video;
let poseNet;
let noseX = 0;
let noseY = 0;
let eye1X, eye1Y, eye2X, eye2Y;

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
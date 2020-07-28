let video1;
let video2;
let constraints1;
let constraints2;

//call the list of cameras 
function gotDevices(deviceInfos) {
    for (let i = 0; i !== deviceInfos.length; ++i) {
        const deviceInfo = deviceInfos[i];
        if (deviceInfo.kind == "videoinput") {
            console.log(deviceInfo);
        }
    }
}

function streamCameras() {
    for (var i = 0; i < 2; i++) {
        console.log(videolist[i]);
    }
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);

function setup() {
    createCanvas(innerWidth, innerHeight);
    //copy the device info from console to create constraints for the webcams
    constraints1 = {
        video: {
            deviceId: "as per console log",
            groupId: "as per console log",
            kind: "videoinput",
            label: "as per console log"
        }
    }
    constraints2 = {
        video: {
            deviceId: "a4073eb21213e86d1cb4eccb34f21eafde66e40f9b792df01bad95b34b97eea0",
            groupId: "as per console log",
            kind: "videoinput",
            label: "as per console log"
        }
    }

    video1 = createCapture(constraints1);
    video2 = createCapture(constraints2);
    video1.size(640, 510);
    video2.size(1280, 720);
}

function draw() {
    background(255);
    image(video1, 0, 0);
    image(video2, video1.width, 0);
}
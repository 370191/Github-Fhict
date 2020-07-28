import Stream from './Stream.js';
import Confetti from './confetti.js';
// import Confetti from './confetti.js';
import Rain from './rain.js';

const faceapimodule = (function () {

  const video = document.getElementById("video");
  const isScreenSmall = window.matchMedia("(max-width: 700px)");


  let predictedAges = [];


  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models"),
    faceapi.nets.ageGenderNet.loadFromUri("./models")
  ]).then(startVideo);

  function startVideo() {
    Stream.init(stream => (video.srcObject = stream));
  }

  function screenResize(isScreenSmall) {
    if (isScreenSmall.matches) {
      // If media query matches
      video.style.width = "320px";
    } else {
      video.style.width = "1920px";
    }
  }

  screenResize(isScreenSmall); // Call listener function at run time
  isScreenSmall.addListener(screenResize);

  video.addEventListener("playing", () => {
    console.log("playing called");
    const canvas = faceapi.createCanvasFromMedia(video);
    let container = document.querySelector(".container");
    container.append(canvas);

    const displaySize = {
      width: video.width,
      height: video.height
    };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      // console.log(resizedDetections);

      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

      // faceapi.draw.drawDetections(canvas, resizedDetections);

      // Check overlay
      function is_checked() {
        let landmarks = document.getElementById('btn-landmarks').checked;
        // If checkbox = checked => draw the layer on the canvas over the webcam video
        if (landmarks == true) {
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
        }
        let detections = document.getElementById('btn-detections').checked;
        if (detections == true) {
          faceapi.draw.drawDetections(canvas, resizedDetections)
        }
        let expressions = document.getElementById('btn-expressions').checked;
        if (expressions == true) {
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections)
        }
      }

      if (resizedDetections && Object.keys(resizedDetections).length > 0) {
        const age = resizedDetections.age;
        const interpolatedAge = interpolateAgePredictions(age);
        const gender = resizedDetections.gender;
        const expressions = resizedDetections.expressions;
        const maxValue = Math.max(...Object.values(expressions));
        const emotion = Object.keys(expressions).filter(
          item => expressions[item] === maxValue
        );

        document.getElementById("age").innerText = `Leeftijd - ${interpolatedAge}`;
        document.getElementById("gender").innerText = `Geslacht - ${gender}`;
        document.getElementById("emotion").innerText = `Emotie - ${emotion[0]}`;

        let emotie = document.getElementById("emotion").innerText = `Emotie - ${emotion[0]}`;

        if (emotie == 'Emotie - blij') {
          console.log("JE BENT BLIJ!");
          Confetti('startConfetti');
        }
        // if (emotie == 'Emotie - droevig') {
        //   console.log("JE BENT droevig!");
        //   Rain('draw');
        // }
        // if (emotie == 'Emotie - neutraal') {
        //   console.log("JE BENT neutraal!");
        //   Rain('draw');
        // }
      }
      is_checked();

    }, 10);
  });

  function interpolateAgePredictions(age) {
    predictedAges = [age].concat(predictedAges).slice(0, 30);
    const avgPredictedAge =
      predictedAges.reduce((total, a) => total + a) / predictedAges.length;
    var n = avgPredictedAge.toFixed(2);

    return n;
  }

})()

export default faceapimodule;
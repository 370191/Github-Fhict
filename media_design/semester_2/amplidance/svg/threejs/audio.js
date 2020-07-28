var scene, camera, renderer, line;
var geometry, material, mesh, array;

function init() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 1000;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

}

function NewLine() {

    scene.remove(line);

    var material = new THREE.LineBasicMaterial({
        color: 0x00ff00
    });

    var geometry = new THREE.Geometry();

    array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array)

    var Ypoints = array;
    var xPoint = -2048;
    for (var i = 0; i < Ypoints.length; i++) {
        geometry.vertices.push(new THREE.Vector3(xPoint, Ypoints[i], 0));
        xPoint = xPoint + 4;
    }

    line = new THREE.Line(geometry, material);
    scene.add(line);
}

function animate() {

    requestAnimationFrame(animate);
    NewLine();
    renderer.render(scene, camera);

}

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();

function Play(buffer) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);

    analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);

    source.start(0);

    init();
    animate();
}

function Load(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {
            Play(buffer)

        }, onError);
    }
    request.send();

    function onError() {
        console.log("error")
    }
}
Load("bluegrass banjo - country banjo.mp3");
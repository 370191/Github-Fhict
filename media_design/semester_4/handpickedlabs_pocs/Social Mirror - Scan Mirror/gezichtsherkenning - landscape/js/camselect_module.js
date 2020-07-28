const camselect = (function () {

    const cameraOptions = document.querySelector('.video-options>select');
    const video = document.querySelector('video');
    const canvas = document.querySelector('canvas');
    
    let streamStarted = true;

    console.log(navigator.mediaDevices.getUserMedia);

    const constraints = {
        video: {
            width: {
                min: 1280,
                ideal: 1920,
                max: 2560,
            },
            height: {
                min: 720,
                ideal: 1080,
                max: 1440
            },
        }
    };

    cameraOptions.onchange = () => {
        const updatedConstraints = {
            ...constraints,
            video: {
                deviceId: {
                    exact: cameraOptions.value
                }
            }
        };
        startStream(updatedConstraints);
    };


    const startStream = async (constraints) => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleStream(stream);
    };

    const handleStream = (stream) => {
        video.srcObject = stream;
        streamStarted = true;
    };


    const getCameraSelection = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const options = videoDevices.map(videoDevice => {
            return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
        });
        cameraOptions.innerHTML = options.join('');
    };

    getCameraSelection();
})();

export default camselect;
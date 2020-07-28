const Stream = (function () {

    let theStream;

    const getUserMedia = function (options, successCallback, failureCallback) {
        let api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (api) {
            return api.bind(navigator)(options, successCallback, failureCallback);
        }

    };

    const getStream = function (callback) {
        if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
            !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
            alert('User Media API not supported.');
            return;
        };

        let constraints = {
            video: true
        };

        getUserMedia(constraints, function (stream) {
            let mediaControl = document.querySelector('video');
            if ('srcObject' in mediaControl) {
                mediaControl.srcObject = stream;
            } else if (navigator.mozGetUserMedia) {
                mediaControl.mozSrcObject = stream;
            } else {
                mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            }
            theStream = stream;
            if(typeof callback == "function"){
                callback(theStream);
            }
        }, function (err) {
            console.log('Error: ' + err);
        });
    };



    const init = function (callback) {
        getStream(callback);
    };

    return {
        init,
        theStream
    };
})();

export default Stream;
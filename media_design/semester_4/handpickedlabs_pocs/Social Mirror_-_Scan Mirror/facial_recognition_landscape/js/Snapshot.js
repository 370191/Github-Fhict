const Snapshot = (function () { 
    
    const takePhoto = function (stream) {
        if (!('ImageCapture' in window)) {
            alert('ImageCapture is not available');
            return;
          }
          
          let theImageCapturer = new ImageCapture(stream.getVideoTracks()[0]);
        
          theImageCapturer.takePhoto()
            .then(blob => {
              const c = document.getElementById("canvas");
              let ctx = c.getContext("2d");
              
              let theImageTag = document.getElementById("imageTag");
              theImageTag.src = URL.createObjectURL(blob);

              theImageTag.addEventListener('load', e => {
                  ctx.drawImage(theImageTag, 0, 0, 640, 480);
              });
            })
            .catch(err => alert('Error: ' + err));
    };

    const privateSave = function () {
        let canvas = document.getElementById("canvas");
        let img    = canvas.toDataURL("image/png");
        document.getElementById("downloadbtn").href = img;
    };

    const publicSnapshot = function (stream){
        takePhoto(stream);
    };

    const SaveSnapshot = function (){
        privateSave();
    };

    const publicTimer = function () {
        getclock();
    };

    return {
        publicSnapshot,
        SaveSnapshot,
        publicTimer
    };

})();

export default Snapshot;
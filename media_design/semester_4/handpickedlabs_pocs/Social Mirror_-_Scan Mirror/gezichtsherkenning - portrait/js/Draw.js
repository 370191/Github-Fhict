const Draw = (function () {

    const toDraw = function () {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(currX, currY);
        ctx.strokeStyle = x;
        ctx.lineWidth = y;
        ctx.stroke();
        ctx.closePath();
    };

    const eraseDraw = function () {
        let m = confirm("Opnieuw een foto maken?");
        if (m) {
            ctx.clearRect(0, 0, w, h);
            document.getElementById("canvasimg").style.display = "none";
        }
    };


    const color = function () {
        chooseColor();
    }

    const drawing = function () {
        toDraw();
    }

    const erasing = function () {
        eraseDraw();
    }

    return {
        color,
        drawing,
        erasing
    }


})();

export default Draw;
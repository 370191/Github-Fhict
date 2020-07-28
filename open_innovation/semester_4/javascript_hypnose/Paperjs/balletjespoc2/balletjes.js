var balletjes = [];
var snelheid = 2;

// voor duizend keer wordt er een punt ergens op het scherm gezet.

// Het object 'Point' vertegenwoordigt een punt in de tweedimensionale ruimte van het Paper.js-project. 
// Het wordt ook gebruikt om tweedimensionale vectorobjecten weer te geven.

for (var i = 0; i <= 1000; i++) {

    // Point(x, y)
    // Creates a Point object with the given x and y coordinates.
    //
    // Parameters:
    // x: Number — the x coordinate
    // y: Number — the y coordinate
    var bal = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), Math.random() * 10)
    //view.size.width


    //Random kleur picker
    var rood = Math.floor(Math.random() * 256);
    var groen = Math.floor(Math.random() * 256);
    var blauw = Math.floor(Math.random() * 256);
    var randomkleur = "rgb(" + rood + "," + groen + "," + blauw + ")";
    bal.fillColor = randomkleur

    balletjes.push(bal)
}


for (var i = 0; i < balletjes.length; i++) {
    givespeed(i)
}

function givespeed(index) {
    var assignedRate = Math.random() * snelheid
    balletjes[index].rate = assignedRate;
}

function onFrame(event) {
    for (var i = 0; i < balletjes.length; i++) {
        balletjes[i].translate(balletjes[i].rate, 0)
        if (balletjes[i].position.x > view.size.width) {
            balletjes[i].position.x = 0;
        }
    }
}


view.onMouseMove = function (event) {
    var bal = new Path.Circle(new Point(view.size.width, view.size.height) * Point.random(), Math.random() * 10)

    var rood = Math.floor(Math.random() * 256);
    var groen = Math.floor(Math.random() * 256);
    var blauw = Math.floor(Math.random() * 256);
    var randomkleur = "rgb(" + rood + "," + groen + "," + blauw + ")";
    bal.fillColor = randomkleur

    balletjes.push(bal)

    var index = balletjes.length - 1
    givespeed(index)
}

view.onMouseDown = function (event) {
    console.log(balletjes);
}

// 
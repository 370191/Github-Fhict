var app = require('express')(); //express server
var http = require('http').Server(app);
var io = require('socket.io')(http); //realtime lezer
var jf = require('jsonfile'); //json bestand module anders geen json ondersteuning
var fs = require('fs'); //benodigd bestandsysteem
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});



io.sockets.on('connection', function (socket) {
    fs.watchFile("../Assets/Scenes/triggers.json", {interval: 100},function (event, fileName) { 

        jf.readFile('../Assets/Scenes/triggers.json', function (err, data) { //als er iets verandert in triggers.json 

            var data = data; //opslaan in variabel
            console.log('sent') //voor debuggen
            socket.emit('notification', data); //stuur naar alle clients
        });

    });

});

http.listen(3000, function () { //listen to 3000
    console.log('listening on *:3000');
});
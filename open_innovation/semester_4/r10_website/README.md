# R10 Website

De R10 website is een Express server samen met Socket.io en JSON. Samen met Victor had ik dit gedeelte van de R10 Unity Simulatie aan de praat gekregen. Deze website is te zien live op het projectiescherm in de Unity Simulatie. Met deze website konden we rechtstreekse input van Unity met een website testen. 

```
var app = require('express')(); 			//express server
var http = require('http').Server(app);
var io = require('socket.io')(http); 		//realtime lezer
var jf = require('jsonfile'); 				//json bestand module anders geen json ondersteuning
var fs = require('fs'); 					//benodigd bestandsysteem
```


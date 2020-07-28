var mousePoint = view.center;
var amount = 250;

//var colors = ['black', 'white', 'black', 'white'];
var colors = ['black', 'white', 'black', 'white'];

var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
	'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
	'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
	'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
	'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
	'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
	'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
	'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
	'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
	'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];

//random kleur gedeelte
var rood = Math.floor(Math.random() * 256);
var groen = Math.floor(Math.random() * 256);
var blauw = Math.floor(Math.random() * 256);
var randomkleur = "rgb(" + rood + "," + groen + "," + blauw + ")";

for (var i = 0; i < amount; i++) {
	var rect = new Rectangle([0, 0], [25, 25]);
	rect.center = mousePoint;
	var path = new Path.Rectangle(rect, 0);
	path.fillColor = colorArray[i % 50];
	var scale = (1 - i / amount) * 100;
	path.scale(scale);

	//colors.push(Math.floor(Math.random() * 255));
}

function onMouseMove(event) {
	mousePoint = event.point;
}

var children = project.activeLayer.children;

function onFrame(event) {
	for (var i = 0, l = children.length; i < l; i++) {
		var item = children[i];

		// var delta = (mousePoint - item.position) / (i + 5);
		item.rotate(Math.sin((event.count + i) / 100) * 20);
		// if (delta.length > 0.5)
		// 	item.position += delta;

	}
}

function onResize(event) {
	// Whenever the window is resized, recenter the path:
	path.position = view.center;
}
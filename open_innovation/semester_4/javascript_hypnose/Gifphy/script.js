// Bron: https://codepen.io/ChynoDeluxe/pen/WGQzWW

$(document).ready(function () {
	//Start gifLoop voor het ingestelde interval
	var refresh;
	// Tijdsduur in seconden
	const duration = 790;
	// Giphy API 
	const giphy = {
		baseURL: "https://api.giphy.com/v1/gifs/",
		apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
		tag: "funny",
		type: "random",
		rating: "pg-13",
		size: "32381"
	};
	// Target gif-wrap container
	const $gif_wrap = $("#gif-wrap");
	// Giphy API URL
	let giphyURL = encodeURI(
		giphy.baseURL +
		giphy.type +
		"?api_key=" +
		giphy.apiKey +
		"&tag=" +
		giphy.tag +
		"&rating=" +
		giphy.rating
	);

	// Roep Giphy API en render data
	var start = () => $.getJSON(giphyURL, json => renderGif(json.data));

	// Display Gif in gif wrap container
	var renderGif = _giphy => {
		console.log(_giphy);
		// Stel gif in als achtergrond afbeelding
		$gif_wrap.css({
			"background-image": 'url("' + _giphy.image_original_url + '")'
		});

		// Start duration countdown
		refreshRate();
	};

	// Roep nieuwe gif op na aangegeven tijd
	var refreshRate = () => {
		// Stel ingestelde intervallen opnieuw in
		clearInterval(refresh);
		refresh = setInterval(function () {
			// Roep Giphy API voor nieuwe gif
			start();
		}, duration);
	};

	// Roep Giphy API voor nieuwe gif
	// start();


	const startknop = $('#startknop');
	startknop.click(start)
});
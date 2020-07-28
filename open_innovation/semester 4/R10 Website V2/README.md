# R10 Website versie 2

Deze website had ik even snel in elkaar gezet om de pijltjes input te testen in Unity. Deze website gebruikt reveal.js waarmee je met de pijltjes toetsen van pagina's kan verwisselen en informatie kunt zien zoals het weer en treintijden.

![reveal.js](https://camo.githubusercontent.com/5de93cfd79a2b504fc2b055dd45de545be0495cb/68747470733a2f2f68616b696d2d7374617469632e73332e616d617a6f6e6177732e636f6d2f72657665616c2d6a732f6c6f676f2f76312f72657665616c2d626c61636b2d746578742e737667)

```
	<script src="./js/reveal.js"></script>
```

reveal.js is een open source HTML-presentatie API. Hiermee kan iedereen met een webbrowser gratis volledig functionele en mooie presentaties maken maar in dit geval wordt de API gebruikt om door webpagina's heen te gaan.



## Setup

Sommige functies van reveal.js, zoals externe Markdown, vereisen dat presentaties worden uitgevoerd vanaf een lokale webserver.

1. installeer [Node.js](https://nodejs.org/) (10.0.0 of later)

2. Clone de reveal.js repository

   ```shell
   $ git clone https://github.com/hakimel/reveal.js.git
   ```

3. Ga naar de map reve.js en installeer afhankelijkheden

   ```shell
   $ cd reveal.js && npm install
   ```

4. Geef de presentatie en controleer de bronbestanden op wijzigingen

   ```shell
   $ npm start
   ```

5. Open [http://localhost:8000](http://localhost:8000/) om je presentatie te bekijken
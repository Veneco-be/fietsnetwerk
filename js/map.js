const map = L.map('map').setView([51.1018, 3.6351], 10);

L.tileLayer(
	'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
	{
		maxZoom: 18,
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
	}
).addTo(map);

let filename = 'toer_recr_netwerk';

fetch(`/data/${filename}.geojson`)
	.then((res) => res.json())
	.then((json) => L.geoJSON(json).addTo(map));
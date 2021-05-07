(async () => {
	const tiles = L.tileLayer(
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
	);

	const map = L.map('map', {
		center: [51.1018, 3.6351],
		zoom: 10,
		layers: [tiles],
	});

	const filenames = [
		'BFF',
		'LFF',
		'fietspotentieel_volledig',
		'Fietssnelweg',
		'toer_recr_netwerk',
	];

	const controlLayers = L.control
		.layers({}, {}, { collapsed: false })
		.addTo(map);
		
	const getData = async () => {
		filenames.forEach(async (filename) => {
			const res = await fetch(`/data/${filename}.geojson`);
			controlLayers.addOverlay(L.geoJSON(await res.json()), filename);
		});
	};
	await getData();
})();

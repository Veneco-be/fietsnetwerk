(async () => {
	const tilesOptions = {
		maxZoom: 18,
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
	};

	const light = L.tileLayer(
		'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
		{ ...tilesOptions, id: 'mapbox/light-v10' }
	);

	const dark = L.tileLayer(
		'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
		{ ...tilesOptions, id: 'mapbox/dark-v10' }
	);

	const map = L.map('map', {
		center: [51.1018, 3.6351],
		zoom: 10,
		layers: [light],
	});

	const files = [
		{ filename: 'BFF', color: '#3eb1c8', title: 'BFF' },
		{ filename: 'LFF', color: '#a4c8e1', title: 'LFF' },
		{
			filename: 'fietspotentieel_volledig',
			color: '#eca154',
			title: 'Fietspotentieel',
		},
		{ filename: 'Fietssnelweg', color: '#a4c8e1', title: 'Fietssnelweg' },
		{
			filename: 'toer_recr_netwerk',
			color: '#a9c47f',
			title: 'Toeristisch netwerk',
		},
	];

	const controlLayers = L.control
		.layers(
			{ 'Lichte achtergrond': light, 'Donkere achtergrond': dark },
			{},
			{ collapsed: false }
		)
		.addTo(map);

	const getData = async () => {
		files.forEach(async (file) => {
			const res = await fetch(`data/${file.filename}.geojson`);
			controlLayers.addOverlay(
				L.geoJSON(await res.json(), { style: { color: file.color } }),
				file.title
			);
		});
	};
	await getData();
})();

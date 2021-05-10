(async () => {
	const maxPotential = 5190;
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
		{ filename: 'LFF', color: '#a1d6ca', title: 'LFF' },
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

	function onEachFeatureWrapper(title) {
		return function onEachFeature(feature, layer) {
			layer.bindPopup(getPopupContent(feature, title));
		};
	}

	const controlLayers = L.control
		.layers(
			{ 'Lichte achtergrond': light, 'Donkere achtergrond': dark },
			{},
			{ collapsed: false, sortLayers: true }
		)
		.addTo(map);

	const getData = async () => {
		files.forEach(async (file) => {
			const res = await fetch(`data/${file.filename}.geojson`);

			const options = {
				style:
					file.filename === 'fietspotentieel_volledig'
						? (feature) => ({
								color:
									feature.properties.FIETSPOT > 500
										? '#e78523'
										: feature.properties.FIETSPOT > 250
										? '#eca154'
										: '#f3c291',
								weight: 3 + (feature.properties.FIETSPOT / maxPotential) * 10,
						  })
						: { color: file.color },
				onEachFeature: onEachFeatureWrapper(file.title),
			};

			controlLayers.addOverlay(
				L.geoJSON(await res.json(), options),
				file.title
			);
		});
	};
	await getData();
})();

function getPopupContent(feature, title) {
	const props = feature.properties;
	let content = '';

	switch (title) {
		case 'BFF':
			content = `<p>${props?.fietsroute || 'geen fietsroute'}</p>`;
			break;
		case 'LFF':
			content = `<p>Datum deputatie: ${
				props?.DEPUTATIE
					? new Date(props.DEPUTATIE).toLocaleDateString('nl-BE')
					: 'onbekend'
			}</p>`;
			break;
		case 'Fietspotentieel':
			content = `<p>Potentieel: ${props.FIETSPOT}</p>
            <p>Lengte: ${props.LENGTH}</p>`;
			break;
		case 'Fietssnelweg':
			content = `<p>${props.FSW_NUMMER} ${props.FSW_NAAM}</p>`;
			break;
		case 'Toeristisch netwerk':
			content = `<p>${props.naam}</p>`;
	}

	return `<h2>${title}</h2>${content}`;
}

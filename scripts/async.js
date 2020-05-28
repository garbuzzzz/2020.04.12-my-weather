const key = 'BFhVp19GNMuiWSxt6WRKbKgdkPPLXMe7';

const getCity = async (city) => {
	const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
	const query = `?apikey=${key}&q=${city}`;
	const responce = await fetch(base + query);
	const cityInfo = await responce.json();
	if(cityInfo.length) {
		return cityInfo[0];
	} else {
		throw new Error('Данные города не подгрузились');
	}
}

const getForecast = async(cityKey) => {
	const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
	const query = `?apikey=${key}`;
	const responce = await fetch(base + cityKey + query);
	const forecastInfo = await responce.json();
	if(forecastInfo.length) {
		return forecastInfo;
	} else {
		throw new Error('Данные погоды по этому городу не подгрузились');
	}
}




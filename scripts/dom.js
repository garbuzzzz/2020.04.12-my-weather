const form = document.querySelector('.change-location');
const picture = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('.time');
const iconDiv = document.querySelector('.iconDiv');
const icon = iconDiv.querySelector('img');
const doNoFound = () => {
	let newImgSrc = 'img/noFound.png';
	time.setAttribute('src', newImgSrc);
	icon.classList.add('d-none');
	details.innerHTML = `
	 	<h5 class="my-3">Не найдено такого города...</h5>`;
}
const updateCity = async (city) => {
	const cityData = await getCity(city);
	let forecastData = (await getForecast(cityData.Key))[0];
	return {cityData, forecastData};
}
const updatePage = (data) => {
	const {cityData, forecastData} = data;
	let newImgSrc = forecastData.IsDayTime ? 'img/day.svg' : 'img/night.svg';
	time.setAttribute('src', newImgSrc);
	icon.classList.remove('d-none');
	const iconSrc = `img/icons/${forecastData.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);
	details.innerHTML = `
	 	<h5 class="my-3">${cityData.EnglishName}</h5>
		<div class="my-3">${forecastData.WeatherText}</div>
		<div class="display-4 my-4">
			<span>${forecastData.Temperature.Metric.Value}</span>
			<span>&deg;C</span>
		</div>`;	
}
form.addEventListener('submit', e => {
	e.preventDefault();
	picture.classList.remove('d-none');
	const newCity = form.city.value.trim();

	updateCity(newCity)
		.then((data) => { updatePage(data); })
		.catch((err) => {
			doNoFound();
		});
	form.reset();
	localStorage.setItem('city', newCity);
});

if(localStorage.getItem('city')) {
	picture.classList.remove('d-none');
	const newCity = localStorage.getItem('city');
	updateCity(newCity)
		.then((data) => { updatePage(data); })
		.catch((err) => {
			localStorage.clear();
			doNoFound();
		});
	form.reset();
}


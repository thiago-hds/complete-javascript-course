'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
	const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
        <h3 class="country__name">${data.name}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
			+data.population / 1000000
		).toFixed(1)}M people</p>
        <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
        <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
    </article>
  `;
	countriesContainer.insertAdjacentHTML('beforeend', html);
	countriesContainer.style.opacity = 1;
};

const renderError = function (error) {
	countriesContainer.textContent = `Something went wrong: ${error}`;
	countriesContainer.style.opacity = 1;
};

const getJson = function (url) {
	return fetch(url).then(res => {
		console.log(res);
		if (res.status === 403)
			throw new Error('Too many request. Wait a few seconds');
		if (!res.ok) throw new Error('Request error');
		return res.json();
	});
};

const getCountry = function (country) {
	const url = `https://restcountries.eu/rest/v2/name/${country}`;
	getJson(url)
		.then(([data]) => renderCountry(data))
		.catch(err => renderError(err.message));
};

const whereAmI = function (lat, lng) {
	const url = `https://geocode.xyz/${lat},${lng}?geoit=json`;
	getJson(url)
		.then(data => {
			console.log(data);
			const { city, country } = data;
			console.log(`You're in ${city}, ${country}`);
			getCountry(data.country);
		})
		.catch(err => renderError(err.message));
};

whereAmI('52.508', '13.381');
// whereAmI('19.037', '72.873');
// whereAmI('-33.933', '18.474');

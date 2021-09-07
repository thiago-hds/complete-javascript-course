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
};

const renderError = function (error) {
  countriesContainer.insertAdjacentText(
    'beforeend',
    `Something went wrong: ${error}`
  );
};

///////////////////////////////////////

// ASYNC CODE WITH AJAX
// const getNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/alpha/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const data = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data, 'neighbour');
//   });
// };

// const getCountry = function (country, getNeighbours = false) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     renderCountry(data);

//     if (getNeighbours) {
//       data.borders.slice(0, 2).forEach(neighbour => getNeighbour(neighbour));
//       // getCountry(data.borders[0]);
//     }
//   });
// };

// getCountry('usa', true);
// // getCountryData('canada');

// ASYNC CODE WITH PROMISES
// const handleResponse = function (response) {
//   if (!response.ok) throw new Error('Country not found');
//   return response.json();
// };

// const getCountry = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(res => handleResponse(res))
//     .then(([data]) => {
//       renderCountry(data);
//       const { borders } = data;
//       return borders.length
//         ? fetch(`https://restcountries.eu/rest/v2/alpha/${borders[0]}`)
//         : null;
//     })
//     .then(res => handleResponse(res))
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => renderError(err.message))
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// const whereAmI = function (lat, lng) {
//   const url = `https://geocode.xyz/${lat},${lng}?geoit=json`;
//   fetch(url)
//     .then(res => handleResponse(res))
//     .then(data => {
//       console.log(data);
//       const { city, country } = data;
//       console.log(`You're in ${city}, ${country}`);
//       getCountry(data.country);
//     })
//     .catch(err => renderError(err.message));
// };

// btn.addEventListener('click', function () {
//   getCurrentPosition()
//     .then(res => {
//       const { latitude, longitude } = res.coords;
//       whereAmI(latitude, longitude);
//     })
//     .catch(err => console.log(err));
// });

// ASYNC CODE WITH ASYNC/AWAIT

const getCurrentPosition = async function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getJson = async function (url) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error('Request Error');
    return res.json();
  });
};

const whereAmI = async function () {
  try {
    const position = await getCurrentPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    const locationData = await getJson(
      `https://geocode.xyz/${lat},${lng}?geoit=json`
    );
    const { city, country } = locationData;

    const [countryData] = await getJson(
      `https://restcountries.eu/rest/v2/name/${country}`
    );
    console.log(countryData);
    renderCountry(countryData);
    return `You're in ${city}, ${country}`;
  } catch (err) {
    renderError(err.message);
  } finally {
    countriesContainer.style.opacity = 1;
  }
};

(async function () {
  const location = await whereAmI();
  console.log(location);
})();

// whereAmI();
// btn.addEventListener('click', whereAmI);

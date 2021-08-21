'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;
navigator?.geolocation.getCurrentPosition(
  position => {
    console.log(position);
    const { latitude, longitude } = position.coords;

    map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on('click', function (event) {
      mapEvent = event;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  },
  () => {
    alert('no location');
  }
);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const popup = L.popup({
    maxWidth: 250,
    minWidth: 100,
    autoClose: false,
    closeOnClick: false,
    className: 'running-popup',
  });

  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(popup)
    .setPopupContent('Workout')
    .openPopup();

  inputType.value =
    inputDistance.value =
    inputDuration.value =
    inputCadence.value =
      '';
});

inputType.addEventListener('change', function (e) {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});

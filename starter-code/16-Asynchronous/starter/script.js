'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
// const getCurrentPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// getCurrentPosition()
//   .then(res => console.log(res))
//   .catch(err => console.log(err));

// RUNNING PROMISES IN PARALLEL

const getJson = async function (url) {
  return fetch(url).then(res => {
    if (!res.ok) throw new Error('Request Error');
    return res.json();
  });
};

// rodando promises em paralelo com Promise.all()
// se uma das promises for rejeitada, a promise retornada por Promise.all() é
// rejeitada automaticamente
// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const promise1 = getJson(`https://restcountries.eu/rest/v2/name/${c1}`);
//     const promise2 = getJson(`https://restcountries.eu/rest/v2/name/${c2}`);
//     const promise3 = getJson(`https://restcountries.eu/rest/v2/name/${c3}`);

//     const [[res1], [res2], [res3]] = await Promise.all([
//       promise1,
//       promise2,
//       promise3,
//     ]);

//     console.log([res1.capital, res2.capital, res3.capital]);
//   } catch (err) {
//     console.log(err);
//   }
// };
// get3Countries('brasil', 'portugal', 'spain');

// com Promise.race(), a primeira promise a passar para settled vence a corrida
// e apenas seu resultado é passado para o then.
// se uma das promises for rejected, a promise de resultado também é

// (async function () {
//   const promise1 = getJson(`https://restcountries.eu/rest/v2/name/italy2`);
//   const promise2 = getJson(`https://restcountries.eu/rest/v2/name/egypt`);
//   const promise3 = getJson(`https://restcountries.eu/rest/v2/name/canada`);

//   const res = await Promise.race([promise1, promise2, promise3]);
//   console.log(res[0]);
// })();

// promise.race() é útil para criar um timeout

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error('Request took too long'));
//     }, s * 1000);
//   });
// };
// (async function () {
//   const promise1 = getJson(`https://restcountries.eu/rest/v2/name/ireland`);
//   const res = await Promise.race([promise1, timeout(1)]);
//   console.log(res);
// })();

// Promise.allSettled() resolve para um array com os resultados de todas as promises,
// mesmo as que passaram para rejected
// Promise.allSettled([
//   Promise.resolve('success'),
//   Promise.reject('error'),
//   Promise.resolve('another success'),
// ]).then(res => console.log(res));

// Promise.any() retorna apenas a primeira promise que passou para settled
// a diferença para promise.race() é que promises rejected são ignoradas
Promise.any([
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success'),
]).then(res => console.log(res));

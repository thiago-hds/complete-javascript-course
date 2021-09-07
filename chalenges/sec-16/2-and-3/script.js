'use strict';

// ---- CHALLENGE 2 ----

const imagesContainer = document.querySelector('.images');

const createImage = function (imgPath, className = '') {
	return new Promise(function (resolve, reject) {
		const img = document.createElement('img');
		img.src = imgPath;
		img.classList.add(className);
		img.addEventListener('load', function () {
			imagesContainer.insertAdjacentElement('beforeend', img);
			resolve(img);
		});
		img.addEventListener('error', function () {
			reject(new Error('Could not load image'));
		});
	});
};

const wait = function (seconds) {
	return new Promise(function (resolve) {
		setTimeout(resolve, seconds * 1000);
	});
};
// let image = null;
// createImage('./img/img-1.jpg')
// 	.then(img => {
// 		image = img;
// 		return wait(2);
// 	})
// 	.then(() => {
// 		image.style.display = 'none';
// 		return createImage('./img/img-2.jpg');
// 	})
// 	.then(img => {
// 		image = img;
// 		return wait(2);
// 	})
// 	.then(() => {
// 		image.style.display = 'none';
// 	})
// 	.catch(err => console.log(err));

// ---- CHALLENGE 3 ----
const loadNPause = async function () {
	try {
		let image = await createImage('./img/img-1.jpg');
		await wait(2);
		image.style.display = 'none';

		image = await createImage('./img/img-2.jpg');
		await wait(2);
		image.style.display = 'none';
	} catch (err) {
		console.log(err);
	}
};
// loadNPause();

const loadAll = async function (imgArr) {
	const imgs = imgArr.map(url => createImage(url, 'parallel'));
	console.log(imgs);
	const res = await Promise.all(imgs);
	console.log('finished loading!', res);
};
loadAll(['./img/img-1.jpg', './img/img-2.jpg', './img/img-3.jpg']);

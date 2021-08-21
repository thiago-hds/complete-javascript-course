'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.close-modal');
const showModalButtons = document.querySelectorAll('.show-modal');

const showModal = function () {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
};

const closeModal = function () {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
};

const isModalVisible = function () {
  return !modal.classList.contains('hidden');
};

for (let button of showModalButtons) {
  button.addEventListener('click', showModal);
}
closeModalButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && isModalVisible()) {
    closeModal();
  }
});

'use strict';

// if (module.hot) {
// 	module.hot.accept();
// }
// console.log('Hello World');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.nav__links');

// Open Navbar
const menuClick = function () {
	console.log('click');
	nav.classList.toggle('active-menu');
};

hamburger.addEventListener('click', menuClick);

const openModal = function (e) {
	e.preventDefault();
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault();

	// Matching strategy -- ignore clicks
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	}
});

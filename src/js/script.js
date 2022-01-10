'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const hamburger = document.querySelector('.hamburger-menu');
const nav = document.querySelector('.nav__links');
const currentYear = document.querySelector('#year');
const btnSubscribe = document.querySelector('.btn--subscribe');
const inputSubscribe = document.querySelector('.input--subscribe');
const modalSubscribe = document.querySelector('.modal-subscribe');
const formSubscribe = document.querySelector('.subscribe__form');
const imgTargets = document.querySelectorAll('img[data-src]');
const btnExplore = document.querySelector('.btn--explore');
const btnCloseSubscribe = document.querySelector('.btn--close-subscribe');
const btnWatch = document.querySelector('.btn--watch');
const btnLearnMore = document.querySelectorAll('.btn--text');

// Navbar Functionality
const menuClick = function () {
	console.log('click');
	nav.classList.toggle('active-menu');
};

hamburger.addEventListener('click', menuClick);

// MODALS
// Show Contact Form -- Contact Us/Get Started buttons
const openModal = function (e) {
	e.preventDefault();
	modal.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeModal = function () {
	modal.classList.add('hidden');
	overlay.classList.add('hidden');
};

// Subscribe Button Functionality
const openThankYouModal = function (e) {
	e.preventDefault();
	const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	if (inputSubscribe.value === '' || reg.test(inputSubscribe.value) === false)
		return;

	modalSubscribe.classList.remove('hidden');
	overlay.classList.remove('hidden');
};

const closeThankYouModal = function () {
	modalSubscribe.classList.add('hidden');
	overlay.classList.add('hidden');
	inputSubscribe.value = '';
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
btnSubscribe.addEventListener('click', openThankYouModal);
btnCloseSubscribe.addEventListener('click', closeThankYouModal);

overlay.addEventListener('click', function () {
	closeModal();
	closeThankYouModal();
});

// Smooth Scroll
document.querySelector('.nav__links').addEventListener('click', function (e) {
	e.preventDefault();

	// Matching strategy -- ignore clicks
	if (e.target.classList.contains('nav__link')) {
		const id = e.target.getAttribute('href');
		document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
	}
});

// Reveal Sections
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
	const [entry] = entries;

	if (!entry.isIntersecting) return;
	entry.target.classList.remove('section--hidden');

	observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15,
});

allSections.forEach(function (section) {
	sectionObserver.observe(section);
	section.classList.add('section--hidden');
});

// Watch Button Redirect
btnWatch.addEventListener('click', function () {
	const url = 'https://www.youtube.com/c/TraversyMedia';
	window.open(url, '_blank').focus();
});

// Learn More Button Redirect
const learnMore = () => {
	const url = 'https://www.udemy.com/';
	window.open(url, '_blank').focus();
};

btnLearnMore.forEach((btn) => {
	btn.addEventListener('click', learnMore);
});

// Explore Button Redirect
btnExplore.addEventListener('click', function () {
	const url = 'https://dribbble.com/';
	window.open(url, '_blank').focus();
});

// Lazy Loading for Portfolio Images
const loadImg = function (entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) return;

	// Replace src with data-src
	entry.target.src = entry.target.dataset.src;

	// Remove class once the image has been fully loaded
	entry.target.addEventListener('load', function () {
		entry.target.classList.remove('lazy-img');
	});

	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: '200px',
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Testimonial Slider Functionality Using SllickJS
$('.slider').slick({
	infinite: true,
	slidesToShow: 2,
	slidesToScroll: 1,
	prevArrow: $('.slider__btn-left'),
	nextArrow: $('.slider__btn-right'),
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
	],
});

// Render year
currentYear.innerHTML = new Date().getFullYear();

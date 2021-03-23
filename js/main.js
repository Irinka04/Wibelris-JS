const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});
// card
const buttonCard = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
// Получаем для закрытия модального окна крестик
const modalСlose = document.querySelector('.modal-close');
// переменная которая открывает опен модал
const openModal = function () {
	modalCart.classList.add('show');
};
// переменная которая закрывает close модал
const closeModal = function () {
	modalCart.classList.remove('show');
};
// навешаем слушатель событий
buttonCard.addEventListener('click', openModal);

modalCart.addEventListener('click', (event) => {
	const target = event.target;
	if (target.classList.contains('modal-close') || target === modalCart) {
		closeModal();
	}
});
// scrol link 
// получаю ссылки 
{
	const scrollLinks = document.querySelectorAll('a.scroll-link');
	for (let i = 0; i < scrollLinks.length; i++) {
		scrollLinks[i].addEventListener('click', function (event) {
			event.preventDefault();
			const id = scrollLinks[i].getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',

			});
		});
	}
}

const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});
const escapeHendler = event => {
	if (event.code === 'Escape') {
		closeModal();
	}
}
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
// modalСlose.addEventListener('click', closeModal);
// при нажатии вне модалки закрывает окно 
modalCart.addEventListener('click', (event) => {
	const target = event.target;
	if (target.classList.contains('modal-close') || target === modalCart) {
		closeModal();
	}
});
// Srroll ScrolL ScrolL ScrolL ScrolL
// scrol link 
// получаю ссылки 
{
	const scrollLinks = document.querySelectorAll('a.scroll-link');
	for (const scrollLink of scrollLinks) {
		scrollLink.addEventListener('click', function (event) {
			event.preventDefault();
			const id = scrollLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',

			});
		});
	}
}
// goods
const more = document.querySelector('.more');
const navigationLink = document.querySelectorAll('.navigation-link');
const longGoodsList = document.querySelector('.long-goods-list');
// ф- получения данных с сервера с файла
const getGoods = async function () {
	const result = await fetch('db/db.json');
	if (!result.ok) {
		throw 'ошибочка вышла: ' + result.status;
	}
	return await result.json();
}
// создаем сарточки для вывода на экран

// getGoods().then(function (data) {
// 	console.log('data: ', data);
// });
// // или так
// fetch('db/db.json')
// 	.then(function (response) {
// 		return response.json()
// 	})
// 	.then(function (data) {
// 		console.log(data);
// 	});
// создаем сарточки для вывода на экран
const createCard = function (objCard) {
	const card = document.createElement('div');
	// добовляем классы с помощью className
	card.className = 'col-lg-3 col-sm-6'
	// добовляем верстку с помощью innerHTML
	card.innerHTML = `
	<div class="goods-card">
	${objCard.label ?
	`<span class= "label"> ${objCard.label} </span>`
		: ``}
		
		<img src="db/${objCard.img}"
		alt="${objCard.name}"
		class = "goods-image"> <h3 class= "goods-title">${objCard.name} </h3>
		  <p class = "goods-description" > ${objCard.description} </p> 
			<button class="button goods-card-btn add-to-cart"	data-id="${objCard.id}">
		<span class="button-price"> $ ${objCard.price}</span>
		 </button> </div>`;
	//  возвращает
	return card;
}
// ф-я которая показывает карточки на странице
const renderCards = function (data) {
	// 1-е очищаем блок при помощи textContent
	longGoodsList.textContent = '';
	// переменая для карточек /через метод map перебирает масив дата и каждый обьект отдавать
	const cards = data.map(createCard);
	// выводим на страницу
	// простой способ перебирает и ничего не возвращает в отличии от map он возвращает массив

	longGoodsList.append(...cards);

	// добовляем для боди класс show-goods показать товары (класс описан в css)
	document.body.classList.add('show-goods');
};
more.addEventListener('click', function (event) {
	event.preventDefault();
	getGoods().then(renderCards);
});
// функция перебора масива 
const filterCards = function (field, value) {
	getGoods()
		.then(function (data) {
			const filtereGoods = data.filter(function (good) {
				return good[field] === value;
			});
			return filtereGoods;
		})
		.then(renderCards);
};
navigationLink.forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value);
	})
})
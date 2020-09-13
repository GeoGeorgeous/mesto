/*
---------- 1. Глобальные переменные ----------
*/

// 1.1 Объект с дефолтными карточками:
const initialCards = [
  {
      name: 'Покровка',
      link: './images/card__Pokrovka.jpg'
  },
  {
      name: 'ЦУМ',
      link: './images/card__TeatralnyjProezd.jpg'
  },
  {
      name: 'Москва-сити',
      link: './images/card__MoscowCity.jpg'
  },
  {
      name: 'Мясницкая',
      link: './images/card__Myasnickaya.jpg'
  },
  {
      name: 'Чертаново',
      link: './images/card__Chertanovo.jpg'
  },
  {
      name: 'метро Добрынинская',
      link: './images/card__Dobryninskaya.jpg'
  }
];

// 1.2 Аккаунт — Модальное окно
const accountPopUp = document.querySelector('.popup[data-type="account"]'); // [Аккаунт] Модальное окно
const accountEditButton = document.querySelector('.profile__edit-button'); // [Аккаунт] Кнопка редактирования профиля
const accountSaveButton = accountPopUp.querySelector('.popup__container'); // [Аккаунт] Кнопка субмита
// 1.3 Аккаунт — Форма
const accountForm = document.forms.account;
const accountInputName = accountForm.elements.username;
const accountInputDesc = accountForm.elements.description;

// 1.4 Место — Модальное окно
const placePopUp = document.querySelector('.popup[data-type="place"]'); // [Место] Модальное окно
const placeAddButton = document.querySelector('.profile__add-button'); // [Место] Кнопка добавления нового места
const placeSaveButton = placePopUp.querySelector('.popup__container'); // [Место] Кнопка субмита
// 1.5 Место — Форма
const placeForm = document.forms.place; // Форма Место
const placeInputTitle = placeForm.elements.title; // Инпут - название места
const placeInputLink = placeForm.elements.link; // Инпут - ссылка на изображение

// 1.6 Имя и Описание профиля
const accountName = document.querySelector('.profile__name'); // Имя профиля
const accountDescription = document.querySelector('.profile__description'); // Описание Профиля

// 1.7 LightBox
const lightbox = document.querySelector('.popup[data-type="lightbox"]'); // lightbox

accountInputName.value = accountName
accountInputDesc.value = accountDescription


/*
----------  2. Функциональность модальных окон ----------
*/

/*
// 2.1 Коллбэки для слушателей:

crossOverlayExit и ESCExit — оба работают с попапами и лайтбоксами, определяя, содержит ли
event.target класс открытого попапа или лайтбокса и в зависимости от этого определяют,
что закрывать.
*/

function crossOverlayExit(evt) {
  // 2.1.1 Коллбэк, если нажали на оверлей или на крестик: находит открытый попап и подбираем ему нужный модификатор закрытия
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
    const currentPopUp = document.querySelector('.popup_opened');
    closePopUp(currentPopUp);
  }
};

function ESCExit(evt) {
  // 2.1.2 Коллбэк, если нажали ESC: находит открытый попап и закрывает его
  if ( (evt.key === 'Escape') ) {
    const currentPopUp = document.querySelector('.popup_opened');
    closePopUp(currentPopUp);
  }
}



/*
// 2.2 Открытие и закрытие модальных окон:
*/

const showPopUp = (popup) => {
  // 2.2.1 Получает модальное окно как параметр, навешивает слушатели и открывает его
  if (popup === accountPopUp) {
    accountInputName.value = accountName.textContent;
    accountInputDesc.value = accountDescription.textContent;
  }


  popup.classList.add('popup_opened');
  popup.addEventListener('click', crossOverlayExit);
  document.addEventListener('keyup', ESCExit);
}


const closePopUp = (popup) => {
  // 2.2.2 Закрывает модальное окно и снимает все слушатели
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', crossOverlayExit);
  document.removeEventListener('keyup', ESCExit);
}





/*
----------  3. Модальное окно [Аккаунт] ----------
*/

// 3.1 Обработчик сабмита формы Аккаунт
function accountFormSubmitHandler (evt) {
  evt.preventDefault(); // Избавляемся от стандартного поведения
  // Добавляем на сайт новые значения имени и описания
  accountName.textContent = accountInputName.value;
  accountDescription.textContent = accountInputDesc.value;
  closePopUp(accountPopUp); // Закрываем форму
}

accountEditButton.addEventListener('click', () => {
  showPopUp(accountPopUp);
}); // 3.2
accountSaveButton.addEventListener('submit', accountFormSubmitHandler); // 3.3





/*
----------  4. Модальное окно [Место] ----------
*/


// 4.1 Обработчик сабмита формы Место
function placeFormSubmitHandler (evt) {
  evt.preventDefault(); // Избавляемся от стандартного поведения
  const newCard = {}; // Новая карточка Место
  newCard.name = placeInputTitle.value;
  newCard.link = placeInputLink.value;
  const card = new Card(newCard, '#card')
  renderCard(card.generateCard());
  closePopUp(placePopUp); // Закрываем форму
  placeForm.reset(); // Чистим Форму
}

placeAddButton.addEventListener('click', () => {
  showPopUp(placePopUp);
}); // 4.2

placeSaveButton.addEventListener('submit', placeFormSubmitHandler); // 4.3


/*
----------  5. Функциональность Карточек ----------
*/

import Card from './Card.js'

function renderCard(card, method = 'prepend') {
  // Добавляем карточки в DOM
  const cardsContainer = document.querySelector('.cards__items'); // Получаем контейнер ul для всех карточек
  if (method === 'prepend') {
    cardsContainer.prepend(card);
  } else {
    cardsContainer.append(card);
  }
}

initialCards.forEach((element) => {
  // Создадим и добавим в DOM "карточки из коробки"
  // карточки берем из объекта initialCards
  const card = new Card(element, '#card');
  renderCard(card.generateCard());
});

/*
----------  6. Валидатция Форм ----------
*/

import {config, FormValidator} from './FormValidator.js'

// Получаем список всех форм в документе и включаем валидацию для всех них:
const formList = Array.from(document.querySelectorAll('.popup__container'));
formList.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
  });


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
  renderCard(createCard(newCard));
  closePopUp(placePopUp); // Закрываем форму
  placeForm.reset(); // Чистим Форму
}

placeAddButton.addEventListener('click', () => {
  showPopUp(placePopUp);
}); // 4.2

placeSaveButton.addEventListener('submit', placeFormSubmitHandler); // 4.3





/*
----------  5. Функциональность LightBox ----------
*/

// 5.1 Функция принимает 3 параметра: название места, ссылку на изображение с местом и элемент картинки
// и навешивает EventListener -> открытие лайтбокса при клике на картинку
// -> вставляет нужное изображение, название и аттрибуты в лайтбокс.
function addLightbox(title, link, cardImage) {
  cardImage.addEventListener('click', (evt) => {
    const lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    lightboxCaption.textContent = title;
    lightboxImage.src = link;
    lightboxImage.alt = title;
    showPopUp(lightbox);
  })
}




/*
----------  6. Функциональность Карточек ----------
*/

function createCard(newCard) {
  // 6.1 Функция создает новую карточку из Template
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.cloneNode(true);
  let cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardLikeBtn = card.querySelector('.card__like-button');
  cardTitle.textContent = newCard.name;
  cardImage.src = newCard.link;
  cardImage.alt = newCard.name;
  cardLikeBtn.addEventListener('click', function (event) {
    event.target.classList.toggle('card__like-button_active');
  })
  card.querySelector('.card__delete-button').addEventListener('click', function (event) {
    event.target.parentElement.remove();
  })
  // Добавляем функциональность лайтбокса этой карточке
  addLightbox(newCard.name, newCard.link, cardImage);
  return card;
}

function renderCard(card, method = 'prepend') {
  // 6.2 Добавляем карточки в DOM
  const cardsContainer = document.querySelector('.cards__items'); // get container for all cards (ul)
  if (method === 'prepend') {
    cardsContainer.prepend(card);
  } else {
    cardsContainer.append(card);
  }
}

initialCards.forEach(function(element) {
  // 6.3 Создадим и добавим в DOM "карточки из коробки"
  // карточки берем из объекта initialCards
  renderCard(createCard(element), 'append');
});


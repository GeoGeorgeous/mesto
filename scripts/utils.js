/*
// Объект с дефолтными карточками:
*/
export const initialCards = [
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

/*
// Конфигурация для валидтора:
*/
export const config = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  // inputErrorClass: 'popup__form-item_error',
  errorClass: 'popup__form-item_error'
}

// Аккаунт — Модальное окно
export const accountPopUp = document.querySelector('.popup[data-type="account"]'); // [Аккаунт] Модальное окно
export const accountEditButton = document.querySelector('.profile__edit-button'); // [Аккаунт] Кнопка редактирования профиля
export const accountSaveButton = accountPopUp.querySelector('.popup__container'); // [Аккаунт] Кнопка субмита
// Аккаунт — Форма
export const accountForm = document.forms.account;
export const accountInputName = accountForm.elements.username;
export const accountInputDesc = accountForm.elements.description;

// Место — Модальное окно
export const placePopUp = document.querySelector('.popup[data-type="place"]'); // [Место] Модальное окно
export const placeAddButton = document.querySelector('.profile__add-button'); // [Место] Кнопка добавления нового места
export const placeSaveButton = placePopUp.querySelector('.popup__container'); // [Место] Кнопка субмита
// Место — Форма
export const placeForm = document.forms.place; // Форма Место
export const placeInputTitle = placeForm.elements.title; // Инпут - название места
export const placeInputLink = placeForm.elements.link; // Инпут - ссылка на изображение

// Имя и Описание профиля
export const accountName = document.querySelector('.profile__name'); // Имя профиля
export const accountDescription = document.querySelector('.profile__description'); // Описание Профиля


/*
---------- Функциональность модальных окон ----------
*/
/*
// Открытие и закрытие модальных окон:
*/

export const showPopUp = (popup) => {
  // Получает модальное окно как параметр, навешивает слушатели и открывает его
  if (popup === accountPopUp) {
    accountInputName.value = accountName.textContent;
    accountInputDesc.value = accountDescription.textContent;
  }


  popup.classList.add('popup_opened');
  popup.addEventListener('click', crossOverlayExit);
  document.addEventListener('keyup', ESCExit);
}


export const closePopUp = (popup) => {
  // Закрывает модальное окно и снимает все слушатели
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', crossOverlayExit);
  document.removeEventListener('keyup', ESCExit);
}


/*
// Коллбэки для слушателей:

crossOverlayExit и ESCExit — оба работают с попапами и лайтбоксами, определяя, содержит ли
event.target класс открытого попапа или лайтбокса и в зависимости от этого определяют,
что закрывать.
*/

function crossOverlayExit(evt) {
  // Коллбэк, если нажали на оверлей или на крестик: находит открытый попап и подбираем ему нужный модификатор закрытия
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')){
    const currentPopUp = document.querySelector('.popup_opened');
    closePopUp(currentPopUp);
  }
};

function ESCExit(evt) {
  // Коллбэк, если нажали ESC: находит открытый попап и закрывает его
  if ( (evt.key === 'Escape') ) {
    const currentPopUp = document.querySelector('.popup_opened');
    closePopUp(currentPopUp);
  }
}

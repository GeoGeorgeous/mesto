/* ---------- Дефолтные карточоки ---------- */
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

/* ---------- Дефолтный юзер ---------- */
export const initialUser = {
  username: 'Васко да Гама',
  description: 'Мореплаватель эпохи Великих географических открытий'
}

/* ---------- Конфигурация для FormValidator.js и PopupWithForm.js ---------- */
export const config = {
  formSelector: '.popup__container',
  fieldsetSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  errorClass: 'popup__form-item_error'
}

// Аккаунт — Модальное окно
export const accountPopUp = document.querySelector('.popup[data-type="account"]'); // [Аккаунт] Модальное окно
export const accountEditButton = document.querySelector('.profile__edit-button'); // [Аккаунт] Кнопка редактирования профиля
// Аккаунт — Форма
export const accountForm = document.forms.account;
export const accountInputName = accountForm.elements.username;
export const accountInputDesc = accountForm.elements.description;

// Место — Модальное окно
export const placePopUp = document.querySelector('.popup[data-type="place"]'); // [Место] Модальное окно
export const placeAddButton = document.querySelector('.profile__add-button'); // [Место] Кнопка добавления нового места
// Место — Форма
export const placeForm = document.forms.place; // Форма Место
export const placeInputTitle = placeForm.elements.title; // Инпут - название места
export const placeInputLink = placeForm.elements.link; // Инпут - ссылка на изображение

// Имя и Описание профиля
export const userSelectors = {
  username: document.querySelector('.profile__name'), // Имя профиля
  description: document.querySelector('.profile__description') // Описание Профиля
}

// Lightbox
export const lightbox = document.querySelector('.popup[data-type="lightbox"]');

// Получаем контейнер ul для всех карточек
export const cardsContainer = document.querySelector('.cards__items');

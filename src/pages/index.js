/* ---------- Импорты ---------- */
import '../pages/index.css';

import {
  initialCards,
  initialUser,
  config,
  userElements,
  accountInputName,
  accountInputDesc,
  accountEditButton,
  placeAddButton,
  placePopUp,
  accountPopUp,
  accountForm,
  placeForm,
  cardsContainer,
  lightbox}
from '../utils/utils.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

/* ---------- Модальное окно: Аккаунт (PopupWithForm.js + UserInfo.js) ---------- */

const popupProfileForm = new PopupWithForm(
  accountPopUp, // I параметр — форма
  (data) => { // II параметр - коллбэк субмита
    userInfo.setUserInfo({username: data.username, description: data.description}); // ставим новые данные
    popupProfileForm.close() // Закрываем форму
  },
  () => {
    accountFormValidator.removeErrors();
  } // III параметр — коллбэк закрытия
);

popupProfileForm.setEventListeners();

accountEditButton.addEventListener('click', () => {
  const { username, description } = userInfo.getUserInfo();
  accountInputName.value = username; // вставляем данные в инпуты
  accountInputDesc.value = description; // вставляем данные в инпуты
  popupProfileForm.open(); // открываем сам попап
});


/* ---------- Модальное окно: LightBox (PopupWithImage.js) ---------- */

const popupLightBox = new PopupWithImage(lightbox);
popupLightBox.setEventListeners();


/* ---------- Модальное окно: Место (PopupWithForm.js + Card.js + PopupWithImage.js) ---------- */

const popupCardForm = new PopupWithForm(
  placePopUp, // I параметр — форма
  (data) => { // II параметр - коллбэк субмита
    const newCard = {title, link}; // новая карточка Место
    newCard.title = data.title;
    newCard.link = data.link;
    const card = new Card(
      // создаем новый экземпляр Card
      newCard, // I параметр — объект с данными карточки
      '#card', // II параметр — селектор карточки
      () => { // III параметр — handleCardClick
        popupLightBox.open(newCard);
      })
    const cardElement = card.generateCard() // создаем карточку
    popupCardForm.close() // закрываем форму
    cardSection.addItem(cardElement); // добавляем карточку в cardSection, созданный при инициализации
  },
  () => {
    placeFormValidator.removeErrors();
  } // III параметр — коллбэк закрытия
);

popupCardForm.setEventListeners();

placeAddButton.addEventListener('click', () => {
  popupCardForm.open(); // открываем сам попап
});

// ---------- Дефолтный аккаунт (UserInfo.js) ----------

const userInfo = new UserInfo(userElements);
userInfo.setUserInfo(initialUser);


// ---------- Дефолтные карточки (Section.js) ----------

const cardSection = new Section({
  // Создаем класс Section
  // и рендерим дефолт. карточки
  items: initialCards,
  renderer: (data) => {
    const card = new Card(
      data,
      '#card',
      () => {
        popupLightBox.open(data);
      });
    cardsContainer.append(card.generateCard())
  }},
  cardsContainer
)

cardSection.render();


/* ---------- Валидация Форм (FormValidator.js) ---------- */

const accountFormValidator = new FormValidator(config, accountForm);
accountFormValidator.enableValidation(); // ВКЛ валидацию для Account

const placeFormValidator = new FormValidator(config, placeForm);
placeFormValidator.enableValidation(); // ВКЛ валидацию для Place


fetch('https://mesto.nomoreparties.co/v1/cohort-16/cards', {
  headers: {
    authorization: '25068d5b-79ef-423f-8b22-b9922c31ad6c'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

fetch('https://mesto.nomoreparties.co/v1/cohort-16/users/me', {
  headers: {
    authorization: '25068d5b-79ef-423f-8b22-b9922c31ad6c'
  }
})
  .then(res => res.json())
  .then((result) => {
    console.log(result);
  });

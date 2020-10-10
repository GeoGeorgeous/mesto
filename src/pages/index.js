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


/* ---------- Модальное окно: Место (PopupWithForm.js + Card.js + PopupWithImage.js) ---------- */

const popupCardForm = new PopupWithForm(
  placePopUp, // I параметр — форма
  (evt) => { // II параметр - коллбэк субмита
    evt.preventDefault(); // избавляемся от стандартного поведения
    const inputValues = popupCardForm._getInputValues() // получаем данные инпутов (название и ссылка)
    const newCard = {}; // новая карточка Место
    newCard.title = inputValues.title;
    newCard.link = inputValues.link;
    const card = new Card(
      // создаем новый экземпляр Card
      newCard, // I параметр — объект с данными карточки
      '#card', // II параметр — селектор карточки
      () => { // III параметр — handleCardClick
        const lightBoxView = new PopupWithImage(lightbox);
        lightBoxView.open(newCard);
        // в данном случае: открой lightbox при клике на карточку
      });
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
  renderer: () => {
    initialCards.forEach((element) => {
    const card = new Card(
      element,
      '#card',
      () => {
        const lightBoxView = new PopupWithImage(lightbox);
        lightBoxView.open(element);
      });
    const cardElement = card.generateCard()
    cardsContainer.append(cardElement);
    });
  }},
cardsContainer)


/* ---------- Валидация Форм (FormValidator.js) ---------- */

const accountFormValidator = new FormValidator(config, accountForm);
accountFormValidator.enableValidation(); // ВКЛ валидацию для Account

const placeFormValidator = new FormValidator(config, placeForm);
placeFormValidator.enableValidation(); // ВКЛ валидацию для Place

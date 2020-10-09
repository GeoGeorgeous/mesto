/* ---------- Импорты ---------- */

import {
  initialCards,
  initialUser,
  config,
  userSelectors,
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
from './utils.js'
import FormValidator from './FormValidator.js'
import Card from './Card.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import PopupWithImage from './PopupWithImage.js'
import UserInfo from './UserInfo.js'

/* ---------- Модальное окно: Аккаунт (PopupWithForm.js + UserInfo.js) ---------- */

accountEditButton.addEventListener('click', () => {
  // при нажатии на кнопку редактирования профиля:
  // создается новый экземпляр PopupWithForm
  // с параметрами accountPopUp, сабмит-коллбэком и экземпляром Валидатора
  const currentPopUp = new PopupWithForm(
    accountPopUp, // I параметр — форма
    (evt) => { // II параметр - коллбэк субмита
      evt.preventDefault(); // избавляемся от стандартного поведения
      const inputValues = currentPopUp._getInputValues(); // получаем данные инпутов (юзернейм и дескрипшн)
      currentUserInfo.setUserInfo({username: inputValues.username, description: inputValues.description}); // ставим новые данные
      currentPopUp.close() // Закрываем форму
    },
    accountFormValidator // III параметр — Валидатор
  );
  // создаем новый экземлпяр UserInfo чтобы получить объект с именем и описанием пользователя
  const currentUserInfo = new UserInfo({userSelectors})
  accountInputName.value = currentUserInfo.getUserInfo().username; // вставляем данные в инпуты
  accountInputDesc.value = currentUserInfo.getUserInfo().description; // вставляем данные в инпуты
  currentPopUp.open(); // открываем сам попап
});


/* ---------- Модальное окно: Место (PopupWithForm.js + Card.js + PopupWithImage.js) ---------- */

placeAddButton.addEventListener('click', () => {
  // при нажатии на кнопку добавления места:
  // создается новый экземпляр PopupWithForm
  // с параметрами placePopUp, сабмит-коллбэком и экземпляром Валидатора
  const currentPopUp = new PopupWithForm(
    placePopUp, // I параметр — форма
    (evt) => { // II параметр - коллбэк субмита
      evt.preventDefault(); // избавляемся от стандартного поведения
      const inputValues = currentPopUp._getInputValues() // получаем данные инпутов (название и ссылка)
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
      currentPopUp.close() // закрываем форму
      cardSection.addItem(cardElement); // добавляем карточку в cardSection, созданный при инициализации
    },
    placeFormValidator // III параметр — Валидатор
  );
  currentPopUp.open(); // открываем сам попап
});

// ---------- Дефолтный аккаунт (UserInfo.js) ----------

const loadedUser = new UserInfo({userSelectors});
loadedUser.setUserInfo(initialUser);


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

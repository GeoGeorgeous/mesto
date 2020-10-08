/* ---------- Импорты ---------- */

import {
  initialCards,
  initialUser,
  config,
  userInfo,
  accountInputName,
  accountInputDesc,
  accountEditButton,
  placeAddButton,
  placePopUp,
  accountPopUp,
  placeInputTitle,
  placeInputLink,
  accountForm,
  placeForm,
  cardsContainer}
from './utils.js'
import FormValidator from './FormValidator.js'
import Card from './Card.js'
import Section from './Section.js'
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js'

/* ---------- Модальное окно: Аккаунт (PopupWithForm.js + UserInfo.js) ---------- */

accountEditButton.addEventListener('click', () => {
  // при нажатии на кнопку редактирования профиля:
  // создается новый экземпляр PopupWithForm
  // с параметрами accountPopUp, сабмит-коллбэком и экземпляром Валидатора
  const currentPopUp = new PopupWithForm(
    accountPopUp,
    (evt) => {
      evt.preventDefault(); // Избавляемся от стандартного поведения
      // Добавляем на сайт новые значения имени и описания
      currentUserInfo.setUserInfo( {
        name: accountInputName.value,
        desc: accountInputDesc.value}
      )
      currentPopUp.close() // Закрываем форму
    },
    accountFormValidator
  );
  // создаем новый экземлпяр UserInfo чтобы получить объект с именем и описанием пользователя
  const currentUserInfo = new UserInfo({userInfo})
  accountInputName.value = currentUserInfo.getUserInfo().userName; // вставляем инпуты
  accountInputDesc.value = currentUserInfo.getUserInfo().userDescription; // вставляем инпуты
  currentPopUp.open(); // открываем сам попап
});


/* ---------- Модальное окно: Место (PopupWithForm.js + UserInfo.js) ---------- */

placeAddButton.addEventListener('click', () => {
  // при нажатии на кнопку добавления места:
  // создается новый экземпляр PopupWithForm
  // с параметрами placePopUp, сабмит-коллбэком и экземпляром Валидатора
  const currentPopUp = new PopupWithForm(
    placePopUp,
    (evt) => {
      evt.preventDefault(); // Избавляемся от стандартного поведения
      const newCard = {}; // Новая карточка Место
      newCard.name = placeInputTitle.value;
      newCard.link = placeInputLink.value;
      const card = new Card(newCard, '#card')
      const cardElement = card.generateCard()
      cardSection.addItem(cardElement);
      currentPopUp.close() // Закрываем форму
    },
    placeFormValidator
  );
  currentPopUp.open(); // открываем сам попап
});

// ---------- Дефолтный аккаунт (UserInfo.js) ----------

const loadedUser = new UserInfo({userInfo});
loadedUser.setUserInfo(initialUser);


// ---------- Дефолтные карточки (Section.js) ----------

const cardSection = new Section({
  // Создаем класс Section
  // и рендерим дефолт. карточки
  items: initialCards,
  renderer: () => {
    initialCards.forEach((element) => {
    const card = new Card(element, '#card');
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

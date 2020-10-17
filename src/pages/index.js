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
  confirmPopUp,
  placeForm,
  cardsContainer,
  lightbox}
from '../utils/utils.js'
import Api from '../components/Api.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import PopupWithSubmit from '../components/PopupWithSubmit.js'


/* ---------- Section (Section.js) ---------- */
const section = new Section(
  (cardElement) => {
    const card = new Card(
      data,
      '#card',
      () => {
        popupLightBox.open(data);
      },
      () => {
        popupDeleteConfirm.open();
      })
    cardsContainer.append(card.generateCard())
  },
  cardsContainer
)

/* ---------- Работа с сервером (Api.js) ---------- */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '25068d5b-79ef-423f-8b22-b9922c31ad6c',
    'Content-Type': 'application/json'
  }
});



/* ---------- Модальное окно: ConfirmDelete () ---------- */

const popupDeleteConfirm = new PopupWithSubmit(confirmPopUp);
popupDeleteConfirm.setEventListeners();

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
    const newCard = {name, link}; // новая карточка Место
    newCard.name = data.title;
    newCard.link = data.link;
    api.uploadCard(newCard) // Добаляем карточку на сервер
    .then(res => res.json())
    .then(cardObject => {
      const card = new Card(
        // создаем новый экземпляр Card
        cardObject, // I параметр — объект с данными карточки
        '#card', // II параметр — селектор карточки
        () => { // III параметр — handleCardClick
          popupLightBox.open(cardObject);
        },
        () => {
          popupDeleteConfirm.open();
          this._removeCard(); // IV параметр — коллбэк удаления
        }, `7f651893ffa284663c078177`)
        const cardElement = card.generateCard() // создаем карточку
        popupCardForm.close() // закрываем форму
        section.addItem(cardElement); // добавляем карточку в cardSection
        })
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

api.getUser()
.then(res => res.json())
.then(data => {
  const userInfo = new UserInfo(userElements);
  userInfo.setUserInfo(data);
  console.log(data);
})

// const userInfo = new UserInfo(userElements);
// userInfo.setUserInfo(initialUser);


// ---------- Дефолтные карточки (Section.js) ----------

api.getCards()
.then(res => { return res.json() })
.then(data => {
  const serverCards = data.reverse();
  console.log(serverCards);
  serverCards.forEach(card => {
    const cardInstance = new Card(
      // создаем новый экземпляр Card
      card, // I параметр — объект с данными карточки
      '#card', // II параметр — селектор карточки
      () => { // III параметр — handleCardClick
        popupLightBox.open(card);
      },
      () => {
        popupDeleteConfirm.open();
        this._removeCard(); // IV параметр — коллбэк удаления
    },`7f651893ffa284663c078177`)
    const cardElement = cardInstance.generateCard() // создаем карточку
    section.addItem(cardElement); // добавляем карточку в section
  })
})




// api.getCards()
// .then(res => { return res.json() })
// .then(data => {
//   const userCardsArr = data;
//   const cardSection = new Section({
//     // Создаем класс Section
//     // и рендерим дефолт. карточки
//     items: userCardsArr,
//     renderer: (data) => {
//       const card = new Card(
//         data,
//         '#card',
//         () => {
//           popupLightBox.open(data);
//         },
//         () => {
//           popupDeleteConfirm.open();
//         });
//       cardsContainer.append(card.generateCard())
//     }},
//     cardsContainer
//   )
//   cardSection.render(data);

// })


/* ---------- Валидация Форм (FormValidator.js) ---------- */

const accountFormValidator = new FormValidator(config, accountForm);
accountFormValidator.enableValidation(); // ВКЛ валидацию для Account

const placeFormValidator = new FormValidator(config, placeForm);
placeFormValidator.enableValidation(); // ВКЛ валидацию для Place



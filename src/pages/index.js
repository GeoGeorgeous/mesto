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
  avatarPopUp,
  avatarForm,
  avatarElement,
  changeAvatarBtn,
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
// const section = new Section(
//   (cardElement) => {
//     const card = new Card(
//       data,
//       '#card',
//       () => {
//         popupLightBox.open(data);
//       },
//       () => {
//         popupDeleteConfirm.open();
//       })
//     cardsContainer.append(card.generateCard())
//   },
//   cardsContainer
// )

const section = new Section(()=>{}, cardsContainer)

/* ---------- Работа с сервером (Api.js) ---------- */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '25068d5b-79ef-423f-8b22-b9922c31ad6c',
    'Content-Type': 'application/json'
  }
});



/* ---------- Модальное окно: ConfirmDelete () ---------- */

const popupDeleteConfirm = new PopupWithSubmit(
  confirmPopUp,
  {submitCallback: (data) => {
    console.log(data);
    confirmPopUp.close();
    },
  closeCallback: (data) => {
    console.log(data);
  }
})
popupDeleteConfirm.setEventListeners();

/* ---------- Смена аватара ---------- */

const popupChangeAvatar = new PopupWithForm (
  avatarPopUp,
  (data) => {
    api.setAvatar(data.link)
    .then(res => res.json())
    .then( (res) => {userElements.avatar.src = res.avatar})
    .then(popupChangeAvatar.close())
    .catch( (err) => console.log(err) )
  },
  () => {
    avatarFormValidator.removeErrors();}
)

popupChangeAvatar.setEventListeners();

changeAvatarBtn.addEventListener('click', () => {
    popupChangeAvatar.open();
  }
)

/* ---------- Редактирование профиля ---------- */

const userInfo = new UserInfo(userElements);

const popupProfileForm = new PopupWithForm(
  accountPopUp, // I параметр — форма
  (data) => { // II параметр - коллбэк субмита
    api.setUser(data)
    .then(res => res.json())
    .then(res => {
      userInfo.setUserInfo({name: res.name, about: res.about, avatar: res.avatar}); // ставим новые данные
    })
    popupProfileForm.close() // Закрываем форму
  },
  () => {
    accountFormValidator.removeErrors();
  } // III параметр — коллбэк закрытия
);

popupProfileForm.setEventListeners();

accountEditButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo();
  accountInputName.value = name; // вставляем данные в инпуты
  accountInputDesc.value = about; // вставляем данные в инпуты
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
        (cardObject) => {
          popupDeleteConfirm.open(cardObject);

          // this._removeCard(); // IV параметр — коллбэк удаления
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
  userInfo.setUserInfo(data);
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
        popupDeleteConfirm.open(cardInstance);
        // this._removeCard(); // IV параметр — коллбэк удаления
    },`7f651893ffa284663c078177`)
    const cardElement = cardInstance.generateCard() // создаем карточку
    section.addItem(cardElement); // добавляем карточку в section
  })
})


/* ---------- Валидация Форм (FormValidator.js) ---------- */

const accountFormValidator = new FormValidator(config, accountForm);
accountFormValidator.enableValidation(); // ВКЛ валидацию для Account

const placeFormValidator = new FormValidator(config, placeForm);
placeFormValidator.enableValidation(); // ВКЛ валидацию для Place

const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation(); // ВКЛ валидацию для Avatar

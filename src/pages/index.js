/* ---------- Импорты ---------- */
import '../pages/index.css';

import {
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

/* ---------- Работа с сервером (Api.js) ---------- */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '25068d5b-79ef-423f-8b22-b9922c31ad6c',
    'Content-Type': 'application/json'
  }
});


/* ---------- Создание класса секции с карточками (Section.js) ---------- */
const section = new Section({
  renderer: (element) => {
    const cardElement =
    createCardInstance(element)
    .generateCard();
    section.addItem(cardElement);
  },
  containerElement : cardsContainer
})


/* ---------- Функция, меняющая текст на кнопках в моменты загрузки. ---------- */

function setBtnText(evt, text) { // принимает evt субмита для нахождения кнопки
  const button = evt.target.querySelector('.popup__save-button');
  button.textContent = text;
}


/* ---------- Функция, создающая новые экземпляры карточек. ---------- */

// Функция принимает параметр объекта карточки и возращает новый экземпляр Card

function createCardInstance(card) {
  const cardInstance = new Card (
    { // I параметр — объект с данными и логикой:
      data: card, // Объект карточки
      handleCardClick: (lightCard) => { popupLightBox.open(lightCard); },  // Коллбэк клика по карточке
      handleLikeClick: () => { // Коллбэк клика по кнопке лайк:
        // Проверим, лайкали ли мы ее уже?
        cardInstance._youLiked()
        // Если да, то лайк надо убрать:
        ? api.removeLike(card)
        .then(res => {
          cardInstance.cardLikes = res.likes;
          cardInstance.renderAmountOfLikes(res.likes.length)
        })
        .then(cardInstance.toggleLikeBtnState())
        .catch(error => console.log(`Ошибка при удалении лайка: ${error}`))
        // Если нет, то лайк надо поставить:
        : api.setLike(card)
        .then(res => {
          cardInstance.cardLikes = res.likes;
          cardInstance.renderAmountOfLikes(res.likes.length)
        })
        .then(cardInstance.toggleLikeBtnState())
        .catch(error => console.log(`Ошибка при добавлении лайка: ${error}`))
       },
      handleDeleteIconClick: () => { // Коллбэк клика по корзине
        popupDeleteConfirm.open(cardInstance, card)
       },
      myId: `7f651893ffa284663c078177`
    },
    '#card'); // II параметр — селектор карточки)
    return cardInstance;
}


/* ---------- Модальное окно подтверждения удаления ---------- */

const popupDeleteConfirm = new PopupWithSubmit(
  confirmPopUp,
  // коллбэк сабмита (удаления карточки)
  (cardElement, cardObj, evt) => {
    setBtnText(evt, 'Удаление...')
    api.deleteCard(cardObj)
    .then(cardElement.removeCard())
    .then(() => {
      popupDeleteConfirm.close() // закрываем попап
      setBtnText(evt, 'Да')
    })
    .catch(error => console.log(`Ошибка при удалении карточки: ${error}`))
  })
popupDeleteConfirm.setEventListeners();

/* ---------- Модальное окно смены аватара ---------- */

const popupChangeAvatar = new PopupWithForm (
  avatarPopUp,
  (data, evt) => {
    setBtnText(evt, 'Сохранение...')
    api.setAvatar(data.link)
    .then( (res) => {userInfo.setUserAvatar(res.avatar)})
    .then( () => {
      popupChangeAvatar.close()
      setBtnText(evt, 'Сохранить')
    })
    .catch(error => console.log(`Ошибка при изменении аватара: ${error}`))
  },
  () => {
    avatarFormValidator.removeErrors();}
)

popupChangeAvatar.setEventListeners();

changeAvatarBtn.addEventListener('click', () => {
    popupChangeAvatar.open();
  }
)

/* ---------- Модальное окно редактирования профиля и создание класса UserInfo ---------- */

const userInfo = new UserInfo(userElements);

const popupProfileForm = new PopupWithForm(
  accountPopUp, // I параметр — форма
  (data, evt) => { // II параметр - коллбэк субмита
    setBtnText(evt, 'Сохранение...')
    api.setUser(data)
    .then(res => {
      userInfo.setUserInfo({name: res.name, about: res.about, avatar: res.avatar}); // ставим новые данные
    })
    .then( () => {
      popupProfileForm.close()
      setBtnText(evt, 'Сохранить') // Закрываем форму
    })
    .catch(error => console.log(`Ошибка при изменении данных профиля: ${error}`))
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


/* ---------- Модальное окно LightBox ---------- */

const popupLightBox = new PopupWithImage(lightbox);
popupLightBox.setEventListeners();


/* ---------- Модальное окно добавления новой карточки) ---------- */

const popupCardForm = new PopupWithForm(
  placePopUp, // I параметр — форма
  (data, evt) => { // II параметр - коллбэк субмита
    setBtnText(evt, 'Добавление...');
    const newCard = {name, link}; // новая карточка Место
    newCard.name = data.title;
    newCard.link = data.link;
    api.uploadCard(newCard) // Добаляем карточку на сервер
      .then(cardObject => {
        const cardElement =
        createCardInstance(cardObject)
        .generateCard();
        popupCardForm.close() // закрываем форму
        section.addItem(cardElement); // добавляем карточку в section
        })
    .then(() => {setBtnText(evt, 'Сохранить');})
    .catch((error) => console.log(`Ошибка при добавлении карточки: ${error}`))
  },
  () => {
    placeFormValidator.removeErrors();
  } // III параметр — коллбэк закрытия
);

popupCardForm.setEventListeners();

placeAddButton.addEventListener('click', () => {
  popupCardForm.open(); // открываем сам попап
});


// ---------- API: Загрузка данных пользователя и карточек с сервера: ----------


Promise.all([
  api.getUser(),
  api.getCards()
])
  .then(values => {console.log('Подключено к серверу и работает!'); return {user: values[0], cards: values[1]}; console.log(values) })
  .then(data => {userInfo.setUserInfo(data.user); return data})
  .then(data => {return data.cards.reverse()}) // Переворачиваем массив карточек
  .then(resReversed => {section.render(resReversed)})
  .catch((error) => console.log(`Ошибка при попытке загрузить данные пользователя и карточки: ${error}`))



/* ---------- Валидация Форм (FormValidator.js) ---------- */

const accountFormValidator = new FormValidator(config, accountForm);
accountFormValidator.enableValidation(); // ВКЛ валидацию для Account

const placeFormValidator = new FormValidator(config, placeForm);
placeFormValidator.enableValidation(); // ВКЛ валидацию для Place

const avatarFormValidator = new FormValidator(config, avatarForm);
avatarFormValidator.enableValidation(); // ВКЛ валидацию для Avatar

// Импорты
import {
  initialCards,
  showPopUp,
  accountInputName,
  accountName,
  accountInputDesc,
  accountDescription,
  accountEditButton,
  accountSaveButton,
  placeAddButton,
  placeSaveButton,
  placePopUp,
  accountPopUp,
  placeInputTitle,
  placeInputLink,
  closePopUp,
  accountForm,
  placeForm,
  cardsContainer}
from './utils.js'

import
  Card
from './Card.js'

import {
  config,
  FormValidator}
from './FormValidator.js'

import Section from './Section.js'

/*
---------- Модальное окно [Аккаунт] ----------
*/

// Обработчик сабмита формы Аккаунт
function accountFormSubmitHandler (evt) {
  evt.preventDefault(); // Избавляемся от стандартного поведения
  // Добавляем на сайт новые значения имени и описания
  accountName.textContent = accountInputName.value;
  accountDescription.textContent = accountInputDesc.value;
  closePopUp(accountPopUp); // Закрываем форму
}

accountEditButton.addEventListener('click', () => {
  accountInputName.value = accountName.textContent;
  accountInputDesc.value = accountDescription.textContent;
  showPopUp(accountPopUp);
});

accountSaveButton.addEventListener('submit', accountFormSubmitHandler);

/*
----------  Модальное окно [Место] ----------
*/


// Обработчик сабмита формы Место
function placeFormSubmitHandler (evt) {
  evt.preventDefault(); // Избавляемся от стандартного поведения
  const newCard = {}; // Новая карточка Место
  newCard.name = placeInputTitle.value;
  newCard.link = placeInputLink.value;
  const card = new Card(newCard, '#card')
  const cardElement = card.generateCard()
  cardSection.addItem(cardElement);
  closePopUp(placePopUp); // Закрываем форму
  placeForm.reset(); // Чистим Форму
}

placeAddButton.addEventListener('click', () => {
  placeForm.reset(); // Чистим Форму
  placeFormValidator.removeErrors();
  showPopUp(placePopUp);
});

placeSaveButton.addEventListener('submit', placeFormSubmitHandler);



// ----------  Section.js  ----------

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

/*
---------- Валидация Форм ----------
*/

const accountFormValidator = new FormValidator(config, accountForm);
accountFormValidator.enableValidation(); // ВКЛ валидацию для Account

const placeFormValidator = new FormValidator(config, placeForm);
placeFormValidator.enableValidation(); // ВКЛ валидацию для Place

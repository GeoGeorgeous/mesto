/*
---------- Импорты ----------
*/

import {initialCards, showPopUp, accountInputName, accountName, accountInputDesc, accountDescription,
  accountEditButton, accountSaveButton, placeAddButton, placeSaveButton, placePopUp, accountPopUp, 
  placeInputTitle, placeInputLink, closePopUp, placeForm}
from './utils.js'

import Card from './Card.js'

import {config, FormValidator} from './FormValidator.js'

/*
---------- Значение импутов равны дефоту при загрузке страницы ----------
*/

accountInputName.value = accountName
accountInputDesc.value = accountDescription


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
  renderCard(card.generateCard());
  closePopUp(placePopUp); // Закрываем форму
  placeForm.reset(); // Чистим Форму
}

placeAddButton.addEventListener('click', () => {
  showPopUp(placePopUp);
}); 

placeSaveButton.addEventListener('submit', placeFormSubmitHandler); // 4.3


/*
----------  Функциональность Карточек ----------
*/

function renderCard(card, method = 'prepend') {
  // Добавляем карточки в DOM
  const cardsContainer = document.querySelector('.cards__items'); // Получаем контейнер ul для всех карточек
  if (method === 'prepend') {
    cardsContainer.prepend(card);
  } else {
    cardsContainer.append(card);
  }
}

initialCards.forEach((element) => {
  // Создадим и добавим в DOM "карточки из коробки"
  // карточки берем из объекта initialCards
  const card = new Card(element, '#card');
  renderCard(card.generateCard());
});

/*
---------- Валидатция Форм ----------
*/

// Получаем список всех форм в документе и включаем валидацию для всех них:
const formList = Array.from(document.querySelectorAll('.popup__container'));
formList.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.enableValidation();
});
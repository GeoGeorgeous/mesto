// Initial Cards — Data
const initialCards = [
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

// Pop Up — Account
const accountPopUp = document.querySelector('.popup[data-type="account"]'); // Edit Account popUp
const accountEditButton = document.querySelector('.profile__edit-button'); // Edit Account button
const accountCloseButton = accountPopUp.querySelector('.popup__close-button'); // Close Account popUp button
const accountSaveButton = accountPopUp.querySelector('.popup__container'); // Save Account popUp button
// Form – Account
const accountForm = document.forms.account;
const accountInputName = accountForm.elements.name;
const accountInputDesc = accountForm.elements.description;

// Pop Up — Place
const placePopUp = document.querySelector('.popup[data-type="place"]'); // Add Place popUp
const placeAddButton = document.querySelector('.profile__add-button'); // Add Place button
const placeCloseButton = placePopUp.querySelector('.popup__close-button'); // Close Add Place popUp button
const placeSaveButton = placePopUp.querySelector('.popup__container'); // Save Add Place popUp button
// Form —  Place
const placeForm = document.forms.place;
const placeInputTitle = placeForm.elements.title;
const placeInputLink = placeForm.elements.link;

// Elements — Profile Info
const accountName = document.querySelector('.profile__name'); // Account name
const accountDescription = document.querySelector('.profile__description'); // Account Description

// PopUp functionality

function addPopUpOutOfTargetCloser(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup){
      closePopUp(popup);
    }
  })
}

function addPopUpEscapeCloser(popup){
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){
      closePopUp(popup);
    }
  })
}

const closePopUp = (popup) => {
  popup.classList.remove('popup_opened');
}

const showPopUp = (popup) => {
  popup.classList.add('popup_opened');
}

const popUpToggle = (popup) => {
  popup.classList.toggle('popup_opened');
}

// Account PopUp

function showAccountPopUp() {
  // get current account name and description and put them into input
  accountInputName.value = accountName.textContent;
  accountInputDesc.value = accountDescription.textContent;
  // toggle save button
  toggleButtonState(Array.from(accountForm.querySelectorAll('.popup__form-item')), accountForm.querySelector('.popup__save-button'));
  // Additional Closers
  addPopUpOutOfTargetCloser(accountPopUp);
  addPopUpEscapeCloser(accountPopUp);
  // toggle (show) popup
  popUpToggle(accountPopUp);
}

function closeAccountPopUp() {
  popUpToggle(accountPopUp);
}

function accountFormSubmitHandler (evt) {
  evt.preventDefault();
  accountName.textContent = accountInputName.value;
  accountDescription.textContent = accountInputDesc.value;
  popUpToggle(accountPopUp);
}

accountEditButton.addEventListener('click', showAccountPopUp);
accountCloseButton.addEventListener('click', closeAccountPopUp);
accountSaveButton.addEventListener('submit', accountFormSubmitHandler);


// Place PopUp

function showPlacePopUp() {
// Additional Closers
  addPopUpOutOfTargetCloser(placePopUp);
  addPopUpEscapeCloser(placePopUp);
  popUpToggle(placePopUp);
}

function closePlacePopUp() {
  popUpToggle(placePopUp);
}

function placeFormSubmitHandler (evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = placeInputTitle.value;
  newCard.link = placeInputLink.value;
  console.log(createCard(newCard))
  renderCard(createCard(newCard)); // add new card (watch cards.js)
  popUpToggle(placePopUp);

}

placeAddButton.addEventListener('click', showPlacePopUp);
placeCloseButton.addEventListener('click', closePlacePopUp);
placeSaveButton.addEventListener('submit', placeFormSubmitHandler);

// Lightbox functionality

const lightbox = document.querySelector('.lightbox');
const lightboxCloseBtn = document.querySelector('.lightbox__close-button');

function addLightbox(card) {
  const cardImage = card.querySelector('.card__image');
  cardImage.addEventListener('click',function (event) {
    const caption = event.target.parentElement.querySelector('.card__title').textContent // find the right caprion
    const imgSrc = event.target.src // find the right image source
    let lightboxCaption = lightbox.querySelector('.lightbox__caption');
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    lightboxCaption.textContent = caption;
    lightboxImage.src = imgSrc;
    lightboxImage.alt = caption;
    toggleFullScreen()
  })}


function toggleFullScreen() {
  lightbox.classList.toggle('lightbox_opened');
}

lightboxCloseBtn.addEventListener('click',toggleFullScreen);

// Cards functionality

const cardsContainer = document.querySelector('.cards__items'); // get container for all cards (ul)
const cardTemplate = document.querySelector('#card').content; // get the card template (li)

function createCard(array) {
  // function gets an array and return a new card (HTML) with
  // title, image source, alt, likes actions, delete actions and lightbox
  //
  // array should contain array.name and array.link
  //
  // it does not add new card into DOM
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.card__title').textContent = array.name;
  card.querySelector('.card__image').src = array.link;
  card.querySelector('.card__image').alt = array.name;
  card.querySelector('.card__like-button').addEventListener('click', function (event) {
    event.target.classList.toggle('card__like-button_active');
  })
  card.querySelector('.card__delete-button').addEventListener('click', function (event) {
    event.target.parentElement.remove();
  })
  addLightbox(card);
  return card;
}

function renderCard(card, method = 'prepend') {
  // add card into DOM
  if (method === 'prepend') {
    cardsContainer.prepend(card);
  } else {
    cardsContainer.append(card);
  }
}

initialCards.forEach(function(element) {
  // create and render default cards ("from the box") into the page
  // cards are taken from initialCards.js
  renderCard(createCard(element), 'append');
});
